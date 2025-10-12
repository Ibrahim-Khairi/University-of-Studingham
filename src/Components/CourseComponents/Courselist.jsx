import React from "react";
import Data from "../../Data/Data";
const Courselist = () => {
  return (
    <section className="px-4 py-16 bg-white">
      <h2 className="text-4x1 font-extrabold mb-10 text-center text-gray-900">
        Available Courses
      </h2>
      <div className="grid cursor-pointer gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-7x1 mx-auto px-4 container">
        {Data.map((ele) => (
          <div key={ele.subject_id} className="group">
            {/*Image*/}
            <div className="overflow-hidden rounded-x1 shadow-md">
              <img
                src={ele.subject_img}
                alt={ele.subject_name}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transformduration-500"
              />
            </div>

            {/*Meta*/}
            <div className="mt-5 flex flex-col gap-2">
              <p className="text-gray-500 font-medium text-sm">
                Schools of{" "}
                <span className="capitalize">{ele.subject_name}</span>
              </p>

              {/* Title */}
              <h3 className="text-2x1 capitalize font-semibold text-gray-900 hover:underline">
                {" "}
                {ele.subject_name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {" "}
                {ele.subject_description}{" "}
              </p>

              {/*Completion */}
              <p className="text-blue-600 font-medium text-sm mt-2"></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courselist;
