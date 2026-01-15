import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  CheckCircle,
  Clock,
  Calendar,
  ChevronRight,
  UserMinus,
  AlertCircle,
  Search,
  CheckCircle2,
  RefreshCcw,
  XCircle,
} from "lucide-react";

const Moduleattendance = () => {
  // --- CORE DATA STATE ---
  const [modules, setModules] = useState([]); // All modules assigned to this tutor
  const [selectedModule, setSelectedModule] = useState(null);
  const [lectures, setLectures] = useState([]); // Sessions strictly for the selected module
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [students, setStudents] = useState([]); // Approved students for this specific course/year

  // --- UI & SYNC STATE ---
  const [attendanceRecord, setAttendanceRecord] = useState({}); // { studentId: status }
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchingRegister, setFetchingRegister] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const BASE_URL = "http://localhost:5000/api";
  const token = localStorage.getItem("accessToken");

  // 1. Initial Load: Fetch all modules assigned to the logged-in Tutor
  useEffect(() => {
    const fetchTutorModules = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tutors/my-modules`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModules(res.data.modules || []);
      } catch (err) {
        console.error("Auth initialization failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorModules();
  }, [token]);

  // 2. Selection Trigger: Pick Module -> Reset UI -> Fetch specific sessions & students
  const handleModuleSelect = async (module) => {
    // RESET all dependent states immediately for isolation
    setSelectedModule(module);
    setSelectedLecture(null);
    setLectures([]);
    setStudents([]);
    setAttendanceRecord({});
    setSearchTerm("");

    try {
      // FETCH A: Get lectures filtered by this Module ID
      const lecRes = await axios.get(
        `${BASE_URL}/timetable/tutor?moduleId=${module._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLectures(lecRes.data.lectures || []);

      // FETCH B: Get students registered for this Module's Course and Year
      const rosterRes = await axios.get(
        `${BASE_URL}/attendance/roster/${module.courseId}/${module.year}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudents(rosterRes.data);
    } catch (err) {
      console.error("Module synchronization error", err);
    }
  };

  // 3. Session Sync: Pick Session -> Load saved marks from Cloud
  useEffect(() => {
    if (!selectedLecture) return;

    const syncWithCloud = async () => {
      setFetchingRegister(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/attendance/existing/${selectedLecture._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const cloudMap = {};
        res.data.forEach((rec) => {
          // Normalize ID to string to ensure matching works
          const id =
            typeof rec.studentId === "object"
              ? rec.studentId._id
              : rec.studentId;
          cloudMap[id] = rec.status;
        });

        setAttendanceRecord(cloudMap); // Re-fills the radio buttons
      } catch (err) {
        console.error("Cloud synchronization failed");
      } finally {
        setFetchingRegister(false);
      }
    };

    syncWithCloud();
  }, [selectedLecture, token]);

  // 4. Marking Handler
  const handleStatusChange = (studentId, status) => {
    setAttendanceRecord((prev) => ({ ...prev, [studentId]: status }));
  };

  // 5. Final Submission (Upsert Logic)
  const handleFinalSubmit = async () => {
    if (!selectedLecture) return alert("Select a session date first.");

    setIsSaving(true);
    const payload = Object.entries(attendanceRecord).map(
      ([studentId, status]) => ({
        studentId,
        lectureId: selectedLecture._id,
        status,
      })
    );

    try {
      await axios.post(
        `${BASE_URL}/attendance/bulk`,
        { records: payload },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Academic Register successfully updated in the database.");
    } catch (err) {
      alert("Error: Record lock detected or connection lost.");
    } finally {
      setIsSaving(false);
    }
  };

  // Filter roster by search term
  const filteredStudents = students.filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="h-[60vh] flex items-center justify-center font-black uppercase text-gray-300 animate-pulse tracking-widest">
        Initialising Faculty Sync...
      </div>
    );

  return (
    <div className="font-[Century Gothic] pb-10">
      {/* 1. SELECTION CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Module Picker */}
        <div className="bg-white p-8 rounded-[35px] shadow-sm border border-gray-100">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-4 ml-2">
            Assigned Modules
          </label>
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
            {modules.map((m) => (
              <button
                key={m._id}
                onClick={() => handleModuleSelect(m)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-bold text-sm uppercase flex justify-between items-center ${
                  selectedModule?._id === m._id
                    ? "bg-[#4C86A8] border-[#4C86A8] text-white shadow-lg"
                    : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                }`}
              >
                {m.name} <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Session Picker */}
        <div
          className={`bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 transition-all ${
            !selectedModule ? "opacity-30" : "opacity-100"
          }`}
        >
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-4 ml-2">
            Available Sessions
          </label>
          <div className="grid grid-cols-1 gap-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
            {lectures.map((l) => (
              <button
                key={l._id}
                onClick={() => setSelectedLecture(l)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-bold text-xs uppercase ${
                  selectedLecture?._id === l._id
                    ? "bg-[#72333B] border-[#72333B] text-white shadow-lg"
                    : "bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Calendar size={14} className="inline mr-3" />{" "}
                {new Date(l.date).toLocaleDateString()} — {l.startTime}
              </button>
            ))}
            {selectedModule && lectures.length === 0 && (
              <p className="text-gray-300 text-[10px] font-black uppercase py-10 text-center">
                No sessions found in timetable
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. REGISTER INTERFACE */}
      {!selectedLecture ? (
        <div className="mt-10 p-24 bg-white rounded-[60px] text-center border-4 border-dashed border-gray-100 flex flex-col items-center">
          <Clock size={60} className="text-gray-100 mb-6" />
          <h3 className="text-gray-300 font-black uppercase text-xl tracking-tighter">
            Please select a session to open the register
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[3.2fr_1fr] gap-8 mt-10 animate-in fade-in duration-500">
          <div className="space-y-6">
            <div className="bg-white p-10 rounded-[50px] shadow-sm border border-gray-100">
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b pb-10 border-gray-50">
                <div className="relative w-full md:w-[450px]">
                  <Search
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Filter student list..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-4 py-5 bg-gray-50 rounded-[25px] outline-none font-bold text-sm shadow-inner focus:bg-white border-2 border-transparent focus:border-[#4C86A8] transition-all"
                  />
                </div>
                <button
                  onClick={handleFinalSubmit}
                  disabled={isSaving || fetchingRegister}
                  className="w-full md:w-auto bg-[#407008] text-white px-14 py-5 rounded-[25px] font-black uppercase text-xs tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {isSaving ? (
                    "Saving..."
                  ) : (
                    <>
                      <CheckCircle2 size={18} /> Sync with Cloud
                    </>
                  )}
                </button>
              </div>

              {fetchingRegister ? (
                <div className="py-20 text-center animate-pulse">
                  <RefreshCcw
                    className="animate-spin mx-auto text-gray-200 mb-4"
                    size={40}
                  />
                  <p className="text-gray-300 font-black uppercase text-xs tracking-widest">
                    Rehydrating Data...
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-6 px-10 mb-8 text-[9px] font-black text-gray-300 uppercase tracking-[0.3em]">
                    <span className="col-span-3">Official Roster</span>
                    <span className="text-center text-[#407008]">Present</span>
                    <span className="text-center text-[#72333B]">Absent</span>
                    <span className="text-center text-[#1B4F72]">Leave</span>
                  </div>
                  {filteredStudents.map((stu) => (
                    <div
                      key={stu._id}
                      className="grid grid-cols-6 p-6 bg-gray-50/50 rounded-[35px] items-center hover:bg-white hover:shadow-xl hover:translate-x-1 transition-all border border-transparent hover:border-gray-100 group"
                    >
                      <div className="col-span-3 flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center font-black text-gray-300 group-hover:text-[#4C86A8] transition-colors uppercase">
                          {stu.name?.[0]}
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-black text-gray-800 uppercase text-sm truncate">
                            {stu.name}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter opacity-60">
                            ID: #{stu._id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>

                      {/* STATUS RADIOS (Synced with Cloud Map) */}
                      {["present", "absent", "leave"].map((type) => (
                        <div key={type} className="flex justify-center">
                          <input
                            type="radio"
                            name={`st-at-${stu._id}`}
                            checked={attendanceRecord[stu._id] === type}
                            onChange={() => handleStatusChange(stu._id, type)}
                            className={`w-8 h-8 cursor-pointer accent-[#407008] transition-transform hover:scale-110`}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. SIDE ANALYTICS (Real-time DB Sync) */}
          <div className="grid grid-cols-1 gap-4 h-fit">
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                color="#1B4F72"
                icon={<Users size={20} />}
                count={students.length}
                label="Enrolled"
              />
              <StatCard
                color="#407008"
                icon={<CheckCircle size={20} />}
                count={
                  Object.values(attendanceRecord).filter((v) => v === "present")
                    .length
                }
                label="Present"
              />
              <StatCard
                color="#72333B"
                icon={<UserMinus size={20} />}
                count={
                  Object.values(attendanceRecord).filter((v) => v === "absent")
                    .length
                }
                label="Absent"
              />
              <StatCard
                color="#0E527B"
                icon={<XCircle size={20} />}
                count={
                  Object.values(attendanceRecord).filter((v) => v === "leave")
                    .length
                }
                label="Leave"
              />
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 mt-2">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-amber-500" size={18} />
                <h4 className="font-black uppercase text-gray-800 text-[10px] tracking-widest">
                  Faculty Notice
                </h4>
              </div>
              <p className="text-[9px] text-gray-400 font-bold uppercase leading-relaxed tracking-widest italic">
                * Analytics reflect real-time entries currently saved in the
                university archive.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ color, icon, count, label }) => (
  <div
    style={{ backgroundColor: color }}
    className="p-6 rounded-[30px] text-white shadow-lg flex flex-col justify-between transition-all hover:translate-y-[-2px] border-b-4 border-black/10"
  >
    <div className="bg-white/10 w-fit p-3 rounded-xl mb-6">{icon}</div>
    <div>
      <h3 className="text-3xl font-black leading-none mb-1">{count}</h3>
      <p className="text-[8px] font-black uppercase opacity-60 tracking-widest">
        {label}
      </p>
    </div>
  </div>
);

export default Moduleattendance;
