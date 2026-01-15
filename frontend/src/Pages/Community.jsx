import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
      <div className="h-screen flex items-center justify-center bg-white font-black uppercase text-gray-300 animate-pulse tracking-widest text-xs">
        Syncing University Network...
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] font-[Century Gothic] overflow-x-hidden">
      <Navbar />

      {/* ================= HERO SECTION (TIGHTENED) ================= */}
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-none">
            Community <span className="text-[#72333B]">&</span> Staff
          </h1>
          <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-[10px] max-w-lg mx-auto leading-relaxed">
            Connect with academic leaders and explore the programs shaping the
            future of Studingham.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        {/* ================= 1. ACADEMIC TUTORS (COMPACT CAROUSEL) ================= */}
        <div className="mb-20 relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#407008] p-3 rounded-2xl text-white shadow-lg rotate-3">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-black text-3xl uppercase tracking-tighter text-gray-800">
                Academic Tutors
              </h3>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-12 px-2 !overflow-visible"
          >
            {data.tutors.map((tutor) => (
              <SwiperSlide key={tutor.id} className="!overflow-visible">
                <div className="rounded-[35px] bg-white shadow-sm border border-gray-100 group transition-all hover:shadow-xl hover:translate-y-[-5px] h-full flex flex-col relative !overflow-visible">
                  {/* Image Height Reduced from 320 to 240 */}
                  <div className="relative h-[240px] rounded-t-[35px] overflow-hidden">
                    {tutor.picture ? (
                      <img
                        src={`${BASE_URL}${tutor.picture}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={tutor.name}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-200">
                        <User size={60} />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-[#407008] text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                      Staff
                    </div>
                  </div>

                  {/* Padding Reduced from p-8 to p-6 */}
                  <div className="p-6 text-center flex-1 flex flex-col justify-between !overflow-visible">
                    <div>
                      <h4 className="font-black uppercase text-gray-800 tracking-tight text-lg mb-1">
                        {tutor.name}
                      </h4>
                      <p className="text-[#407008] text-[9px] font-black uppercase tracking-[0.2em] opacity-60">
                        {tutor.role}
                      </p>
                    </div>

                    <div className="flex justify-center gap-3 pt-4 mt-4 border-t border-gray-50 !overflow-visible">
                      <div className="relative group/email inline-block">
                        <a
                          href={`mailto:${tutor.email}`}
                          className="w-11 h-11 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 hover:text-white hover:bg-[#72333B] transition-all"
                        >
                          <Mail size={18} />
                        </a>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-gray-900 text-white text-[9px] font-bold rounded-lg opacity-0 group-hover/email:opacity-100 transition-all pointer-events-none z-[100] whitespace-nowrap">
                          {tutor.email}
                        </div>
                      </div>

                      <div className="relative group/phone inline-block">
                        <a
                          href={`tel:${tutor.phone}`}
                          className="w-11 h-11 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 hover:text-white hover:bg-[#407008] transition-all"
                        >
                          <Phone size={18} />
                        </a>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-gray-900 text-white text-[9px] font-bold rounded-lg opacity-0 group-hover/phone:opacity-100 transition-all pointer-events-none z-[100] whitespace-nowrap">
                          {tutor.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= 2. UNIVERSITY PROGRAMS (REDUCED HEIGHT) ================= */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#1B4F72] p-3 rounded-2xl text-white shadow-lg -rotate-3">
              <GraduationCap size={24} />
            </div>
            <div>
              <h3 className="font-black text-3xl uppercase tracking-tighter text-gray-800">
                Our Programs
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.courses.map((course) => (
              <Link
                to={`/course/${course._id}`}
                key={course._id}
                className="bg-white p-7 rounded-[30px] shadow-sm border-b-[8px] border-[#1B4F72] hover:translate-y-[-5px] transition-all group relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[8px] font-black text-white bg-[#1B4F72] px-2 py-0.5 rounded-full uppercase tracking-widest">
                    {course.code}
                  </span>
                  <ChevronRight
                    size={18}
                    className="text-gray-200 group-hover:text-[#1B4F72] group-hover:translate-x-1 transition-all"
                  />
                </div>
                <h4 className="font-black text-xl text-gray-800 uppercase leading-tight mb-2 group-hover:text-[#1B4F72] transition-colors">
                  {course.name}
                </h4>
                <p className="text-gray-400 text-[11px] font-bold leading-relaxed line-clamp-2 italic opacity-80">
                  {course.aboutTheCourse}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* ================= 3. LEADERSHIP TEAM (COMPACT GRID) ================= */}
        <div className="pb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#72333B] p-3 rounded-2xl text-white shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="font-black text-3xl uppercase tracking-tighter text-gray-800">
                Leadership
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {data.admins.map((admin) => (
              <div
                key={admin.id}
                className="rounded-[40px] bg-[#72333B] p-7 flex flex-col items-center text-center shadow-xl group border border-white/5 transition-all relative !overflow-visible"
              >
                {/* Image Size Reduced from 24 to 20 */}
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 overflow-hidden border-2 border-white/10">
                  {admin.picture ? (
                    <img
                      src={`${BASE_URL}${admin.picture}`}
                      className="w-full h-full object-cover"
                      alt={admin.name}
                    />
                  ) : (
                    <User size={40} className="text-white/10" />
                  )}
                </div>

                <h4 className="font-black text-white uppercase tracking-tight text-lg mb-0.5">
                  {admin.name}
                </h4>
                <p className="text-white/40 text-[8px] font-black uppercase tracking-[0.2em] mb-6">
                  {admin.role}
                </p>

                <div className="flex gap-3 !overflow-visible">
                  <div className="relative group/admEmail inline-block">
                    <a
                      href={`mailto:${admin.email}`}
                      className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-[#72333B] transition-all"
                    >
                      <Mail size={18} />
                    </a>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-white text-[#72333B] text-[9px] font-bold rounded-lg opacity-0 group-hover/admEmail:opacity-100 transition-all pointer-events-none z-[100] whitespace-nowrap">
                      {admin.email}
                    </div>
                  </div>

                  <div className="relative group/admMap inline-block">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-[#72333B] transition-all cursor-pointer">
                      <MapPin size={18} />
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-white text-[#72333B] text-[9px] font-bold rounded-lg opacity-0 group-hover/admMap:opacity-100 transition-all pointer-events-none z-[100] whitespace-nowrap">
                      Studingham Campus
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;
