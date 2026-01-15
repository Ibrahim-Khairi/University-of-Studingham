import React from "react";
import Footer from "../components/homecomponents/Footer";
import Librarynav from "../components/librarycomponents/Librarynav";
const Librarycollection = () => {
  return (
    <div>
      <Librarynav></Librarynav>
      <div className="grid grid-cols-3 container gap-4">
        <img
          src="librarycollection.png"
          className="w-full h-[400px]"
          alt="/librarycollection"
        />
        <img
          src="librarycollection.png"
          className="w-full h-[400px]"
          alt="/librarycollection"
        />
        <img
          src="librarycollection.png"
          className="w-full h-[400px]"
          alt="/librarycollection"
        />
        <img
          src="librarycollection.png"
          className="w-full h-[400px]"
          alt="/librarycollection"
        />
        <img
          src="librarycollection.png"
          className="w-full h-[400px]"
          alt="/librarycollection"
        />
        <img
          src="librarycollection.png"
          className="w-full h-[400px]"
          alt="/librarycollection"
        />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Librarycollection;
