import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Added for navigation
import Navbar from "../components/homecomponents/Navbar";
import Footer from "../components/homecomponents/Footer";
import {
  Phone,
  Mail,
  User,
  BookOpen,
  ShieldCheck,
  GraduationCap,
  ChevronRight,
  MapPin,
} from "lucide-react";

// --- Swiper Modules ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Community = () => {
  const [data, setData] = useState({ courses: [], tutors: [], admins: [] });
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [courseRes, tutorRes, adminRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/admin/public/courses`),
          axios.get(`${BASE_URL}/api/admin/public/tutors`),
          axios.get(`${BASE_URL}/api/admin/public/admins`),
        ]);
        setData({
          courses: courseRes.data,
          tutors: tutorRes.data,
          admins: adminRes.data,
        });
      } catch (err) {
        console.error("Failed to load community data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white font-black uppercase text-gray-300 animate-pulse">
        Syncing University Network...
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] font-[Century Gothic] overflow-x-hidden">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <div className="bg-white border-b border-gray-100 py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-gray-900 leading-none">
            Community <span className="text-[#72333B]">&</span> Staff
          </h1>
          <p className="mt-6 text-gray-400 font-bold uppercase tracking-widest text-sm max-w-xl mx-auto leading-relaxed">
            Connect with the academic leaders and explore the programs shaping
            the future of Studingham.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-20">
        {/* ================= 1. ACADEMIC TUTORS (CAROUSEL) ================= */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-[#407008] p-4 rounded-3xl text-white shadow-lg rotate-3">
              <BookOpen size={30} />
            </div>
            <div>
              <h3 className="font-black text-4xl uppercase tracking-tighter text-gray-800 leading-none">
                Academic Tutors
              </h3>
              <p className="text-[#407008] font-black uppercase text-[10px] tracking-[0.3em] mt-2">
                Faculty & Module Leaders
              </p>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-16 px-2"
          >
            {data.tutors.map((tutor) => (
              <SwiperSlide key={tutor.id}>
                <div className="rounded-[50px] overflow-hidden bg-white shadow-sm border border-gray-100 group transition-all hover:shadow-2xl hover:translate-y-[-10px] h-full flex flex-col">
                  <div className="relative h-[320px] overflow-hidden">
                    {tutor.picture ? (
                      <img
                        src={`${BASE_URL}${tutor.picture}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={tutor.name}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-200">
                        <User size={100} />
                      </div>
                    )}
                    <div className="absolute top-6 left-6 bg-[#407008] text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
                      Staff
                    </div>
                  </div>

                  <div className="p-8 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-black uppercase text-gray-800 tracking-tight text-xl mb-1">
                        {tutor.name}
                      </h4>
                      <p className="text-[#407008] text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                        {tutor.role}
                      </p>
                    </div>

                    {/* CONTACT WITH TOOLTIPS */}
                    <div className="flex justify-center gap-6 pt-8 mt-6 border-t border-gray-50">
                      {/* Email Tooltip */}
                      <div className="relative group/email">
                        <a
                          href={`mailto:${tutor.email}`}
                          className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-white hover:bg-[#72333B] transition-all shadow-sm"
                        >
                          <Mail size={22} />
                        </a>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 bg-gray-900 text-white text-[9px] font-black rounded-xl opacity-0 group-hover/email:opacity-100 translate-y-2 group-hover/email:translate-y-0 transition-all pointer-events-none z-50 shadow-2xl tracking-widest whitespace-nowrap">
                          {tutor.email}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
                        </div>
                      </div>

                      {/* Phone Tooltip */}
                      <div className="relative group/phone">
                        <a
                          href={`tel:${tutor.phone}`}
                          className="p-4 bg-gray-50 rounded-2xl text-gray-400 hover:text-white hover:bg-[#407008] transition-all shadow-sm"
                        >
                          <Phone size={22} />
                        </a>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 bg-gray-900 text-white text-[9px] font-black rounded-xl opacity-0 group-hover/phone:opacity-100 translate-y-2 group-hover/phone:translate-y-0 transition-all pointer-events-none z-50 shadow-2xl tracking-widest whitespace-nowrap">
                          {tutor.phone}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= 2. UNIVERSITY PROGRAMS (CLICKABLE) ================= */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-[#1B4F72] p-4 rounded-3xl text-white shadow-lg -rotate-3">
              <GraduationCap size={30} />
            </div>
            <div>
              <h3 className="font-black text-4xl uppercase tracking-tighter text-gray-800 leading-none">
                Our Programs
              </h3>
              <p className="text-[#1B4F72] font-black uppercase text-[10px] tracking-[0.3em] mt-2">
                Undergraduate & Masters
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.courses.map((course) => (
              <Link
                to={`/course/${course._id}`} // Navigates to details page
                key={course._id}
                className="bg-white p-10 rounded-[45px] shadow-sm border-b-[15px] border-[#1B4F72] hover:translate-y-[-10px] transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black text-white bg-[#1B4F72] px-3 py-1 rounded-full uppercase tracking-widest">
                    {course.code}
                  </span>
                  <ChevronRight className="text-gray-200 group-hover:text-[#1B4F72] group-hover:translate-x-2 transition-all" />
                </div>
                <h4 className="font-black text-2xl text-gray-800 uppercase leading-tight mb-4 group-hover:text-[#1B4F72] transition-colors">
                  {course.name}
                </h4>
                <p className="text-gray-400 text-xs font-bold leading-relaxed line-clamp-3 italic opacity-80 group-hover:opacity-100 transition-opacity">
                  {course.aboutTheCourse}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* ================= 3. LEADERSHIP TEAM ================= */}
        <div className="pb-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-[#72333B] p-4 rounded-3xl text-white shadow-lg">
              <ShieldCheck size={30} />
            </div>
            <div>
              <h3 className="font-black text-4xl uppercase tracking-tighter text-gray-800 leading-none">
                Leadership
              </h3>
              <p className="text-[#72333B] font-black uppercase text-[10px] tracking-[0.3em] mt-2">
                University Administration
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {data.admins.map((admin) => (
              <div
                key={admin.id}
                className="rounded-[60px] bg-[#72333B] p-12 flex flex-col items-center text-center shadow-2xl group border-2 border-white/5 transition-all hover:border-white/20"
              >
                <div className="w-28 h-28 rounded-full bg-white/5 flex items-center justify-center mb-8 overflow-hidden border-4 border-white/10 group-hover:scale-105 transition-all">
                  {admin.picture ? (
                    <img
                      src={`${BASE_URL}${admin.picture}`}
                      className="w-full h-full object-cover"
                      alt={admin.name}
                    />
                  ) : (
                    <User size={60} className="text-white/10" />
                  )}
                </div>
                <h4 className="font-black text-white uppercase tracking-tight text-2xl mb-1">
                  {admin.name}
                </h4>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                  {admin.role}
                </p>

                <div className="flex gap-4">
                  {/* Admin Tooltip Email */}
                  <div className="relative group/admEmail">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg">
                      <Mail size={22} />
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 bg-white text-[#72333B] text-[9px] font-black rounded-xl opacity-0 group-hover/admEmail:opacity-100 translate-y-2 group-hover/admEmail:translate-y-0 transition-all pointer-events-none z-50 shadow-2xl tracking-widest whitespace-nowrap">
                      {admin.email}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                    </div>
                  </div>

                  {/* Admin Tooltip Map */}
                  <div className="relative group/admMap">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer shadow-lg">
                      <MapPin size={22} />
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 bg-white text-[#72333B] text-[9px] font-black rounded-xl opacity-0 group-hover/admMap:opacity-100 translate-y-2 group-hover/admMap:translate-y-0 transition-all pointer-events-none z-50 shadow-2xl tracking-widest whitespace-nowrap">
                      Studingham Campus
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= FOOTER BANNER ================= */}
      <div className="bg-gray-950 py-24 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h5 className="text-[#407008] font-black uppercase tracking-[0.6em] text-xs mb-6">
            Support Network
          </h5>
          <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tighter max-w-3xl mx-auto leading-tight">
            Our staff are here to support your academic and professional
            journey.
          </h2>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;
