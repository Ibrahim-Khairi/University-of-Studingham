import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  return (
    <div>
      <div className="bg-[#72333B] py-5">
        <div className="container grid grid-cols-[1.5fr_1fr_3fr_1fr] gap-10">
          <div className="flex items-center text-white">
            <Link to="/">
              <img src="./websitelogo.png" alt="" />

              <h3 className="font-bold text-[20px]">
                University Of Studingham
              </h3>
            </Link>
          </div>
          <div>
            <h3 className="text-[18px] border-b  border-b-gray-300 font-bold text-white">
              ACADEMIC
            </h3>
            <ul className="mt-2 text-white">
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link>Student Life</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[18px] border-b  border-b-gray-300 font-bold text-white">
              Quick Lines
            </h3>
            <div className="grid grid-cols-3">
              <ul className="mt-2 text-white">
                <li>
                  <Link to="/community">Our Community</Link>
                </li>
                <li>
                  <Link to="/LibraryPortal">Library Portal</Link>
                </li>
              </ul>
              <ul className="mt-2 text-white">
                <li>
                  <Link to="/gateway">Login Portal</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
              <ul className="mt-2 text-white">
                <li>
                  <Link to="/terms&conditions">Terms & Conditions</Link>
                </li>
                <li>
                  {" "}
                  <Link className="text-[15px]" to="/accessibility">
                    Accessibility Statement
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-[18px] border-b  border-b-gray-300 font-bold text-white">
              CONNECT WITH US
            </h3>
            <div className="mt-2 flex gap-2 text-white text-[25px]">
              <FaFacebookSquare />
              <FaInstagramSquare />
              <FaLinkedin />
              <AiFillTikTok />
              <MdEmail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
