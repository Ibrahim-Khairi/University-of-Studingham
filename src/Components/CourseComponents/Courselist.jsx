import React from "react";
import Data from "../../Data/Data";

const Courseslist = () => {
  return (
    <section className="px-4 py-16 bg-white">
      <h2 className="text-4xl font-extrabold  mb-10 text-center text-gray-900 ">
        Available Courses
      </h2>

      <div className="grid cursor-pointer gap-[10px] sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-4 container">
        {Data.map((ele) => (
          <div
            key={ele.subject_id}
            className="group border border-[#8080806c]  rounded-2xl"
          >
            {/* Image */}
            <div className="overflow-hidden rounded-t-2xl shadow-md">
              <img
                src={ele.subject_img}
                alt={ele.subject_name}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Meta */}
            <div className="mt-[5px] flex flex-col gap-2 p-4">
              <p className="text-gray-500 font-medium text-sm">
                Schools of{" "}
                <span className="capitalize">{ele.subject_name}</span>
              </p>

              {/* Title */}
              <h3 className="text-2xl capitalize font-semibold text-gray-900  hover:underline">
                {ele.subject_name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {ele.subject_description}
              </p>

              {/* Completion */}
              <p className="text-blue-600 font-medium text-sm mt-2">
                Completion: {ele.subject_completion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courseslist;
