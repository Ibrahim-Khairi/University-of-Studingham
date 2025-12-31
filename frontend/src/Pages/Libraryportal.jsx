import React from 'react'
import { Link } from 'react-router-dom'

const Libraryportal = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat p-5 text-white"
      style={{
        backgroundImage: "url('./libraryimg.png')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 flex justify-center flex-col lg:flex-row items-center text-center h-full">
        <div>
          <div className="flex items-center justify-center space-x-4">
            <img src="./websitelogo.png" alt="" className="w-16 h-16 object-contain" />
            <h1 className="text-[35px] font-bold max-w-60">
              University of Studingham
            </h1>
          </div>

          <div className="p-5">
            <h3 className="text-[45px] font-bold text-[#388F96]">Library Overview</h3>
            <p className="max-w-[600px]">
              The University of Studingham Virtual Library is a digital gateway to knowledge,
              providing students and faculty with seamless access to e-books, journals, and
              research databases. Designed for flexible, online learning, it connects the
              Studingham community to academic resources anytime, anywhere.
            </p>

            <Link
              className="bg-[#C87E3C] px-20 py-5 text-white font-bold inline-block rounded-3xl text-[20px] mt-8"
              to="#"
            >
              Log In
            </Link>
          </div>
        </div>

     
      </div>
    </div>
  )
}

export default Libraryportal
