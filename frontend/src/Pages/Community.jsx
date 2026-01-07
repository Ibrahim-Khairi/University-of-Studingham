import React from "react";
import Navbar from "../components/homecomponents/Navbar";
import Footer from "../components/homecomponents/Footer";
import { Phone, Mail, User } from "lucide-react";

const Community = () => {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        {/* ========= CLUBS & SOCIETIES ========= */}
        <div className="mb-14">
          <h3 className="font-bold text-[22px] mb-5">Clubs and Societies</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="rounded-2xl overflow-hidden bg-white shadow">
              <img src="/Studying.png" className="w-full h-[200px]" alt="" />
              <div className="p-4">
                <h4 className="font-bold">Filmmaking Society</h4>
                <p className="text-[#747474] text-sm">
                  Where ideas become cinematic student projects
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl overflow-hidden bg-white shadow">
              <img src="/Robotic.png" className="w-full h-[200px]" alt="" />
              <div className="p-4">
                <h4 className="font-bold">A.I Robotics Society</h4>
                <p className="text-[#747474] text-sm">
                  Build intelligent systems that shape tomorrow
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl overflow-hidden bg-white shadow">
              <img
                src="/Tennis Player.png"
                className="w-full h-[200px]"
                alt=""
              />
              <div className="p-4">
                <h4 className="font-bold">Table Tennis Society</h4>
                <p className="text-[#747474] text-sm">
                  Casual rallies to competitive match play
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl overflow-hidden bg-white shadow">
              <img
                src="/Class Presentation.png"
                className="w-full h-[200px]"
                alt=""
              />
              <div className="p-4">
                <h4 className="font-bold">Debate & Public Speaking</h4>
                <p className="text-[#747474] text-sm">
                  Exploring viewpoints with logic and respect
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========= COURSE INSTRUCTORS ========= */}
        <div className="mb-14">
          <h3 className="font-bold text-[22px] mb-5">Course Instructors</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-white shadow p-6 flex flex-col items-center text-center"
              >
                <User size={70} className="text-gray-300 mb-4" />
                <h4 className="font-bold text-lg">Dr. Ben Williams</h4>
                <p className="text-[#747474] text-sm">
                  Professor, Computer Science
                </p>

                <div className="mt-4 space-y-1 text-sm">
                  <p className="flex justify-center items-center gap-2">
                    <Phone size={16} /> +44740789474
                  </p>
                  <p className="flex justify-center items-center gap-2">
                    <Mail size={16} /> williams@bucs.ac.uk
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========= CAMPUS BUILDINGS ========= */}
        <div>
          <h3 className="font-bold text-[22px] mb-5">Campus Buildings</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Building 1 */}
            <div className="rounded-2xl overflow-hidden shadow bg-white">
              <img
                src="/community1.png"
                className="w-full h-[160px] object-cover"
              />
              <div className="p-3 font-semibold">Sanctum Meridian Hall</div>
            </div>

            {/* Building 2 */}
            <div className="rounded-2xl overflow-hidden shadow bg-white">
              <img
                src="/community2.png"
                className="w-full h-[160px] object-cover"
              />
              <div className="p-3 font-semibold">Carthena Study Pavilion</div>
            </div>

            {/* Building 3 */}
            <div className="rounded-2xl overflow-hidden shadow bg-white">
              <img
                src="/community3.png"
                className="w-full h-[160px] object-cover"
              />
              <div className="p-3 font-semibold">Vespera Gate Building</div>
            </div>

            {/* Building 4 */}
            <div className="rounded-2xl overflow-hidden shadow bg-white">
              <img
                src="/comunity4.png"
                className="w-full h-[160px] object-cover"
              />
              <div className="p-3 font-semibold">Caelestis Chamber</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;
