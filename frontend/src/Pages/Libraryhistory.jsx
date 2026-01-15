import React from "react";
import Librarynav from "../components/librarycomponents/Librarynav";
import Bookschart from "../components/librarycomponents/Bookschart";
import Footer from "../components/homecomponents/Footer";
const Libraryhistory = () => {
  return (
    <div>
      <Librarynav></Librarynav>
      <div className="container flex gap-10">
        <button className="bg-[#5C7AEA] text-[18px] p-3 rounded-2xl text-white">
          Borrowed Books (3)
        </button>
        <button className="bg-[#22988E] text-[18px] p-3 rounded-2xl text-white">
          Returned Books (14)
        </button>
        <button className="bg-[#7A6191] text-[18px] p-3 rounded-2xl text-white">
          Requested Books (14)
        </button>
      </div>
      <div className="container">
        <div className="grid my-10 grid-cols-[2fr_1fr] gap-4">
          <div>
            <div className=" flex justify-between bg-white  p-10">
              <div className="flex gap-4">
                <img src="librarycollection.png" className="h-[200px]" alt="" />
                <div className="flex flex-col gap-3">
                  <h3 className="font-bold text-[24px]">
                    The Rules we Live by
                  </h3>
                  <p className="text-[#747474] text-[18px] font-bold">
                    Anthony
                  </p>
                  <p className="text-[#747474] text-[18px] font-bold">
                    Borrowed Date: 23/09/2025
                  </p>
                  <p className="text-[#747474] text-[18px] font-bold">
                    Due Date: 23/10/2025
                  </p>
                  <span className="text-[#D81C1C] text-[18px] font-bold">
                    OVERDUE (7 days)
                  </span>
                </div>
              </div>
              <div>
                <button className="bg-[#AD5B54] text-white p-4 rounded-2xl">
                  Return Book
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-[#202E48] text-white p-4 rounded-2xl">
              <h3 className="text-[25px] font-bold">Account Overview</h3>
              <p>Fines: $30.75</p>
              <p>Holds: 4</p>
              <div className="flex items-center">
                <div>
                  <Bookschart></Bookschart>
                </div>
                <div className="text-[14px] ">
                  <ul>
                    <li>
                      {" "}
                      <span className="bg-[#D75CEA] w-3 inline-block h-3 rounded-full mr-1"></span>{" "}
                      Total Books Borrowed
                    </li>
                    <li>
                      {" "}
                      <span className="bg-[#5C7AEA] w-3 inline-block h-3 rounded-full mr-1"></span>{" "}
                      Currently Borrowed 27%
                    </li>
                    <li>
                      {" "}
                      <span className="bg-[#F6D047] w-3 inline-block h-3 rounded-full mr-1"></span>{" "}
                      Holds 13%
                    </li>
                    <li>
                      <span className="bg-[#22988E] w-3 inline-block h-3 rounded-full mr-1"></span>{" "}
                      Returned Books 9%
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-[#202E48] text-white p-4 rounded-2xl mt-4">
              <h3 className="text-[25px] font-bold">Holds (Requested Books)</h3>
              <p className="text-[13px]">
                Holds can be kept for up to 15 days to ensure fair access for
                all users. This shorter period helps prevent others from missing
                out on books they’ve requested.{" "}
              </p>
              <ol className="mt-2 list-decimal p-4 font-medium">
                <li>The Rules We Live By</li>
                <li>The Rules We Don’t Live By</li>
                <li>Did I Mention The Rules We Live By</li>
                <li>Live Not But By The Rules</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Libraryhistory;
