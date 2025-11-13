import React from "react";
import Librarynav from "../components/librarycomponents/Librarynav";
import { Link } from "react-router-dom";
import { useState } from "react";

const Bookdetail = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  return (
    <div className="bg-[#EFEFEF] h-auto 2xl:h-screen ">
      <Librarynav />
      <div className="flex justify-center gap-6 ">
        <div className="bg-white grid grid-cols-2 p-6 gap-4 max-w-[800px] w-full ">
          <img
            src="./librarycollection.png"
            className="w-full h-[500px] object-cover"
            alt="./bookdetail"
          />
          <div>
            <p className="uppercase">Book</p>
            <h3 className="text-[35px] font-bold">The Rules We Live By</h3>
            <span className="text-green-400">Available</span>

            <div className="grid grid-cols-[1fr_2fr]">
              <div className="border border-gray-300 p-1.5">
                <p>Authors</p>
              </div>
              <div className="border border-gray-300 p-1.5">
                <p>Anthony Martial</p>
              </div>
              <div className="border border-gray-300 p-1.5">
                <p>Authors</p>
              </div>
              <div className="border border-gray-300 p-1.5">
                <p>Anthony Martial</p>
              </div>
              <div className="border border-gray-300 p-1.5">
                <p>Authors</p>
              </div>
              <div className="border border-gray-300 p-1.5">
                <p>Anthony Martial</p>
              </div>
              <div className="border border-gray-300 p-1.5">
                <p>Authors</p>
              </div>
              <div className="border border-gray-300 p-1.5">
                <p>Anthony Martial</p>
              </div>
              <div className="border border-gray-300 p-1.5">
                <p>Authors</p>
              </div>
              <div className="border border-gray-300 p-1.5">
                <p>Anthony Martial</p>
              </div>
            </div>
            <button className="bg-[#C54800] text-white px-8 py-2 mt-4 rounded-xl">
              Borrow Book
            </button>
            <br />
            <button className="bg-[#C54800] text-white px-7 py-2 mt-2 rounded-xl">
              Request Book
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-between cursor-pointer  p-4 items-center ">
            <div className="flex items-center gap-2 w-[200px]">
              <svg
                width="47"
                height="45"
                viewBox="0 0 47 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1_269_553" fill="white">
                  <path d="M38.6187 27.449C33.9894 27.449 30.2363 31.3781 30.2363 36.2245C30.2363 41.0709 33.9894 45 38.6187 45C43.248 45 47.0011 41.0709 47.0011 36.2245C47.0011 31.3781 43.248 27.449 38.6187 27.449ZM40.0557 35.7287V41.1973H37.1817V35.7287H34.1481L38.6187 31.2517L43.0893 35.7287H40.0557Z" />
                </mask>
                <path
                  d="M38.6187 27.449C33.9894 27.449 30.2363 31.3781 30.2363 36.2245C30.2363 41.0709 33.9894 45 38.6187 45C43.248 45 47.0011 41.0709 47.0011 36.2245C47.0011 31.3781 43.248 27.449 38.6187 27.449ZM40.0557 35.7287V41.1973H37.1817V35.7287H34.1481L38.6187 31.2517L43.0893 35.7287H40.0557Z"
                  fill="#D5F390"
                />
                <path
                  d="M40.0557 35.7287V27.7287H32.0557V35.7287H40.0557ZM40.0557 41.1973V49.1973H48.0557V41.1973H40.0557ZM37.1817 41.1973H29.1817V49.1973H37.1817V41.1973ZM37.1817 35.7287H45.1817V27.7287H37.1817V35.7287ZM34.1481 35.7287L28.4872 30.0759L14.8538 43.7287H34.1481V35.7287ZM38.6187 31.2517L44.2796 25.5989L38.6187 19.9299L32.9578 25.5989L38.6187 31.2517ZM43.0893 35.7287V43.7287H62.3836L48.7502 30.0759L43.0893 35.7287ZM38.6187 27.449V19.449C29.2295 19.449 22.2363 27.3093 22.2363 36.2245H30.2363H38.2363C38.2363 35.8909 38.3595 35.6676 38.4765 35.5451C38.5344 35.4845 38.5795 35.4604 38.5951 35.4535C38.6041 35.4496 38.6054 35.449 38.6187 35.449V27.449ZM30.2363 36.2245H22.2363C22.2363 45.1397 29.2295 53 38.6187 53V45V37C38.6054 37 38.6041 36.9994 38.5951 36.9955C38.5795 36.9885 38.5344 36.9645 38.4765 36.9039C38.3595 36.7814 38.2363 36.5581 38.2363 36.2245H30.2363ZM38.6187 45V53C48.0079 53 55.0011 45.1397 55.0011 36.2245H47.0011H39.0011C39.0011 36.5581 38.8779 36.7814 38.7609 36.9039C38.703 36.9645 38.6579 36.9885 38.6423 36.9955C38.6333 36.9994 38.632 37 38.6187 37V45ZM47.0011 36.2245H55.0011C55.0011 27.3093 48.0079 19.449 38.6187 19.449V27.449V35.449C38.632 35.449 38.6333 35.4496 38.6423 35.4535C38.6579 35.4604 38.703 35.4845 38.7609 35.5451C38.8779 35.6676 39.0011 35.8909 39.0011 36.2245H47.0011ZM40.0557 35.7287H32.0557V41.1973H40.0557H48.0557V35.7287H40.0557ZM40.0557 41.1973V33.1973H37.1817V41.1973V49.1973H40.0557V41.1973ZM37.1817 41.1973H45.1817V35.7287H37.1817H29.1817V41.1973H37.1817ZM37.1817 35.7287V27.7287H34.1481V35.7287V43.7287H37.1817V35.7287ZM34.1481 35.7287L39.809 41.3815L44.2796 36.9045L38.6187 31.2517L32.9578 25.5989L28.4872 30.0759L34.1481 35.7287ZM38.6187 31.2517L32.9578 36.9045L37.4284 41.3815L43.0893 35.7287L48.7502 30.0759L44.2796 25.5989L38.6187 31.2517ZM43.0893 35.7287V27.7287H40.0557V35.7287V43.7287H43.0893V35.7287Z"
                  fill="#658717"
                  mask="url(#path-1-inside-1_269_553)"
                />
                <path
                  d="M2.00285 39.8444C2.00285 40.7527 2.7228 41.4898 3.60989 41.4898H26.4342C28.9262 41.4898 29.8583 40.689 29.8583 37.9796V34.8094M2.00285 39.8444C2.00285 38.5352 2.51079 37.2797 3.41493 36.3539C4.31906 35.4282 5.54534 34.9082 6.82398 34.9082H28.577C29.0612 34.9082 29.4876 34.8774 29.8583 34.8094M2.00285 39.8444V9.02041C2.00285 6.52816 1.84857 3.77923 4.34271 2.47827C5.25979 2 6.45972 2 8.85958 2H28.5727C31.2211 2 32.001 2.95872 32.001 5.5102V31.398C32.001 33.5809 31.3968 34.5242 29.8583 34.8094"
                  stroke="#658717"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p className="font-bold">Return a Book</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.901367 27.0977C0.365776 26.5635 0.365898 25.6914 0.901367 25.1572L12.1768 13.9141L1.07129 2.83984C0.536099 2.30573 0.536062 1.43448 1.07129 0.900391C1.60626 0.366995 2.4787 0.366995 3.01367 0.900391L15.0977 12.9434L15.0986 12.9443C15.6338 13.4784 15.6339 14.3497 15.0986 14.8838L2.84863 27.0977C2.57472 27.3706 2.22417 27.4999 1.87305 27.5C1.52304 27.5 1.16763 27.3631 0.901367 27.0977Z"
                fill="black"
                stroke="white"
              />
            </svg>
          </div>

          {/* --------------------------------------help & Info -------------------------------------  */}
          <div
            className="flex justify-between cursor-pointer  p-4 items-center "
            onClick={() => setIsHelpOpen(!isHelpOpen)}
          >
            <div className="flex items-center gap-2 w-[200px]">
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.5 0C28.7178 0 34.0222 2.2007 38.4133 6.60211C42.8044 11.0035 45 16.3028 45 22.5C45 28.6972 42.8044 33.9965 38.4133 38.3979C34.0222 42.7993 28.7178 45 22.5 45C16.2822 45 10.9778 42.7993 6.58665 38.3979C2.19555 33.9965 0 28.6972 0 22.5C0 16.3028 2.19555 11.0035 6.58665 6.60211C10.9778 2.2007 16.2822 0 22.5 0ZM24.7658 38.2394V33.8028H20.2342V38.2394H24.7658ZM29.4028 20.8099C30.808 19.4014 31.5105 17.7113 31.5105 15.7394C31.5105 13.2746 30.6323 11.162 28.8759 9.40141C27.1194 7.64085 24.9941 6.76056 22.5 6.76056C20.0059 6.76056 17.8806 7.64085 16.1241 9.40141C14.3677 11.162 13.4895 13.2746 13.4895 15.7394H18.0211C18.0211 14.4718 18.4602 13.3979 19.3384 12.5176C20.2166 11.6373 21.2705 11.1972 22.5 11.1972C23.7295 11.1972 24.7834 11.6373 25.6616 12.5176C26.5398 13.3979 26.9789 14.4718 26.9789 15.7394C26.9789 17.007 26.5222 18.0634 25.6089 18.9085L22.8689 21.7606C21.1124 23.5211 20.2342 25.6338 20.2342 28.0986V29.2606H24.7658C24.7658 27.7113 24.959 26.4965 25.3454 25.6162C25.7318 24.7359 26.4169 23.838 27.4005 22.9225L29.4028 20.8099Z"
                  fill="#4EB5FF"
                />
              </svg>

              <p className="font-bold">Help & Info </p>
            </div>
            <svg
              className={`transition-transform duration-300 ${
                isHelpOpen ? "rotate-90" : "rotate-0"
              }`}
              width="16"
              height="16"
              viewBox="0 0 16 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.901367 27.0977C0.365776 26.5635 0.365898 25.6914 0.901367 25.1572L12.1768 13.9141L1.07129 2.83984C0.536099 2.30573 0.536062 1.43448 1.07129 0.900391C1.60626 0.366995 2.4787 0.366995 3.01367 0.900391L15.0977 12.9434L15.0986 12.9443C15.6338 13.4784 15.6339 14.3497 15.0986 14.8838L2.84863 27.0977C2.57472 27.3706 2.22417 27.4999 1.87305 27.5C1.52304 27.5 1.16763 27.3631 0.901367 27.0977Z"
                fill="black"
                stroke="white"
              />
            </svg>
          </div>
          {/* Toggle list  */}

          {isHelpOpen && (
            <ul className=" mx-auto max-w-[180px] list-disc flex flex-col gap-2">
              <li>Borrowed books must be returned in 30 days.</li>
              <li>
                For more help - contact the librarian on their personal email.
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookdetail;
