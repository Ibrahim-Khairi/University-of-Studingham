import React from "react";
import SideDashboard from "../components/Dashboardcomponents/SideDashboard";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
    return (
        <div className="bg-[#EFEFEF]   ">
            <div className=" grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5 ">
                <div>
                    <SideDashboard></SideDashboard>
                </div>
                <div>
                    <DashboardSearch />

                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.7fr] gap-8">
                            <div className="bg-[#4C86A8] p-6 rounded-3xl mt-5">
                                <Link
                                    to="/"
                                    className="text-white border-b-3 text-[18px] inline-block  mb-2"
                                >
                                    {" "}
                                    Administrator Details
                                </Link>
                                <p className="text-white text-[18px] font-medium">
                                    Platform Administrator
                                </p>
                                <p className="text-white text-[18px] font-medium">
                                    ADM_03
                                </p>
                                <p className="text-white text-[18px] font-medium">
                                    Full Permissions
                                </p>
                                <p className="text-white text-[18px] font-medium">
                                    Last Action: Updated Course List
                                </p>
                            </div>
                            <div className="bg-white rounded-3xl p-5 mt-5">
                                <div className="flex items-center">
                                    <h3 className="text-[35px] font-bold">Recent Updates</h3>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.2558 1.13333C14.9959 0.781444 14.6588 0.495835 14.2713 0.299123C13.8838 0.102411 13.4565 0 13.0233 0H2.7907C2.05056 0 1.34073 0.298511 0.817377 0.829864C0.294019 1.36122 0 2.08189 0 2.83333V14.1667C0 14.9181 0.294019 15.6388 0.817377 16.1701C1.34073 16.7015 2.05056 17 2.7907 17H13.0233C13.4565 17 13.8838 16.8976 14.2713 16.7009C14.6588 16.5042 14.9959 16.2186 15.2558 15.8667L19.4419 10.2C19.8042 9.70956 20 9.11305 20 8.5C20 7.88695 19.8042 7.29044 19.4419 6.8L15.2558 1.13333Z" fill="black"/>
                                        </svg>
                                        <p className="text-[16px] font-medium">
                                            Course ‘Computer Science (CS301)’ updated
                                        </p>
                                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3.5" cy="3.5" r="3.5" fill="black"/>
                                        </svg>
                                        <span className="text-[16px] font-medium">10:15 AM</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.2558 1.13333C14.9959 0.781444 14.6588 0.495835 14.2713 0.299123C13.8838 0.102411 13.4565 0 13.0233 0H2.7907C2.05056 0 1.34073 0.298511 0.817377 0.829864C0.294019 1.36122 0 2.08189 0 2.83333V14.1667C0 14.9181 0.294019 15.6388 0.817377 16.1701C1.34073 16.7015 2.05056 17 2.7907 17H13.0233C13.4565 17 13.8838 16.8976 14.2713 16.7009C14.6588 16.5042 14.9959 16.2186 15.2558 15.8667L19.4419 10.2C19.8042 9.70956 20 9.11305 20 8.5C20 7.88695 19.8042 7.29044 19.4419 6.8L15.2558 1.13333Z" fill="black"/>
                                        </svg>
                                        <p className="text-[16px] font-medium">
                                            New Tutor Registration Request
                                        </p>
                                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3.5" cy="3.5" r="3.5" fill="black"/>
                                        </svg>
                                        <span className="text-[16px] font-medium">11:47 AM</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.2558 1.13333C14.9959 0.781444 14.6588 0.495835 14.2713 0.299123C13.8838 0.102411 13.4565 0 13.0233 0H2.7907C2.05056 0 1.34073 0.298511 0.817377 0.829864C0.294019 1.36122 0 2.08189 0 2.83333V14.1667C0 14.9181 0.294019 15.6388 0.817377 16.1701C1.34073 16.7015 2.05056 17 2.7907 17H13.0233C13.4565 17 13.8838 16.8976 14.2713 16.7009C14.6588 16.5042 14.9959 16.2186 15.2558 15.8667L19.4419 10.2C19.8042 9.70956 20 9.11305 20 8.5C20 7.88695 19.8042 7.29044 19.4419 6.8L15.2558 1.13333Z" fill="black"/>
                                        </svg>
                                        <p className="text-[16px] font-medium">
                                            System Policy Section Updated
                                        </p>
                                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3.5" cy="3.5" r="3.5" fill="black"/>
                                        </svg>
                                        <span className="text-[16px] font-medium">Yesterday</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M15.2558 1.13333C14.9959 0.781444 14.6588 0.495835 14.2713 0.299123C13.8838 0.102411 13.4565 0 13.0233 0H2.7907C2.05056 0 1.34073 0.298511 0.817377 0.829864C0.294019 1.36122 0 2.08189 0 2.83333V14.1667C0 14.9181 0.294019 15.6388 0.817377 16.1701C1.34073 16.7015 2.05056 17 2.7907 17H13.0233C13.4565 17 13.8838 16.8976 14.2713 16.7009C14.6588 16.5042 14.9959 16.2186 15.2558 15.8667L19.4419 10.2C19.8042 9.70956 20 9.11305 20 8.5C20 7.88695 19.8042 7.29044 19.4419 6.8L15.2558 1.13333Z" fill="black"/>
                                        </svg>
                                        <p className="text-[16px] font-medium">
                                            News Announcement Published
                                        </p>
                                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3.5" cy="3.5" r="3.5" fill="black"/>
                                        </svg>
                                        <span className="text-[16px] font-medium">12th November</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1.1fr] gap-8">
                        <div className="bg-white rounded-3xl p-5 mt-5">
                            <h3 className="text-[26px] font-bold mb-4">Platform Status</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                                <div
                                    className="flex items-center gap-4 p-5 rounded-2xl bg-white"
                                    style={{ boxShadow: "0px 8px 14px rgba(0,0,0,0.25)" }}>
                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="40" cy="40" r="37" fill="white" stroke="#13B7B3" strokeWidth="6"/>
                                        <path d="M63.711 23.6128L41.0958 16.0964C40.7089 15.9679 40.2907 15.9679 39.9038 16.0964L17.2886 23.6128C16.9133 23.7375 16.587 23.9768 16.3557 24.2968C16.1244 24.6168 16 25.0012 16 25.3956V44.1865C16 44.6849 16.1986 45.1629 16.552 45.5153C16.9054 45.8677 17.3848 46.0656 17.8846 46.0656C18.3844 46.0656 18.8638 45.8677 19.2172 45.5153C19.5706 45.1629 19.7692 44.6849 19.7692 44.1865V28.0028L27.6822 30.6312C25.5798 34.0178 24.9112 38.0979 25.8233 41.9756C26.7354 45.8532 29.1535 49.2115 32.5468 51.313C28.3064 52.9713 24.6409 55.9708 21.96 60.0719C21.8206 60.2785 21.7238 60.5107 21.6751 60.755C21.6265 60.9993 21.6271 61.2507 21.6767 61.4948C21.7264 61.7388 21.8243 61.9706 21.9646 62.1766C22.1049 62.3826 22.2849 62.5588 22.4941 62.6948C22.7033 62.8309 22.9375 62.9241 23.1832 62.9691C23.4288 63.0141 23.681 63.0099 23.925 62.9569C24.169 62.9039 24.4001 62.803 24.6047 62.6602C24.8092 62.5173 24.9833 62.3354 25.1167 62.1248C28.6669 56.6943 34.2735 53.582 40.4998 53.582C46.726 53.582 52.3327 56.6943 55.8828 62.1248C56.1592 62.5345 56.5862 62.8192 57.0715 62.9174C57.5568 63.0156 58.0613 62.9195 58.476 62.6498C58.8908 62.3801 59.1824 61.9584 59.2878 61.476C59.3933 60.9937 59.3041 60.4893 59.0395 60.0719C56.3587 55.9708 52.679 52.9713 48.4528 51.313C51.8428 49.2116 54.2586 45.8555 55.1706 41.9807C56.0825 38.1059 55.4161 34.0286 53.3174 30.643L63.711 27.1901C64.0863 27.0655 64.4128 26.8262 64.6441 26.5062C64.8755 26.1863 65 25.8018 65 25.4074C65 25.0129 64.8755 24.6284 64.6441 24.3085C64.4128 23.9885 64.0863 23.7492 63.711 23.6246V23.6128ZM51.8074 38.5493C51.8079 40.3317 51.3845 42.0889 50.5721 43.6766C49.7596 45.2643 48.5811 46.6374 47.1334 47.683C45.6857 48.7287 44.0099 49.4173 42.2436 49.6921C40.4774 49.967 38.6709 49.8204 36.9724 49.2644C35.2739 48.7084 33.7319 47.7587 32.4728 46.4934C31.2137 45.2281 30.2734 43.6832 29.7291 41.9853C29.1848 40.2875 29.052 38.4852 29.3415 36.7263C29.6311 34.9674 30.3347 33.302 31.3948 31.8667L39.9038 34.6854C40.2907 34.814 40.7089 34.814 41.0958 34.6854L49.6048 31.8667C51.0366 33.8022 51.8085 36.1443 51.8074 38.5493ZM40.4998 30.9319L23.8446 25.3956L40.4998 19.8593L57.1549 25.3956L40.4998 30.9319Z" fill="#13B7B3"/>
                                    </svg>
                                    <div>
                                        <p className="text-sm text-gray-500">Students Registered</p>
                                        <p className="text-[30px] font-bold text-black">7,300</p>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center gap-4 p-5 rounded-2xl bg-white"
                                    style={{ boxShadow: "0px 8px 14px rgba(0,0,0,0.25)" }}>
                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="40" cy="40" r="37" fill="white" stroke="#13B7B3" strokeWidth="6"/>
                                        <path d="M21 19H50.5556C54.5371 19 56.5258 19 57.7629 20.2306C59 21.4612 59 23.4394 59 27.4V40C59 43.9606 59 45.9388 57.7629 47.1694C56.5258 48.4 54.5371 48.4 50.5556 48.4H35.7778M37.8889 28.45H50.5556M21 50.5V42.1C21 40.1197 21 39.1306 21.6186 38.5153C22.2371 37.9 23.2314 37.9 25.2222 37.9H29.4444M21 50.5H29.4444M21 50.5V61M29.4444 37.9V50.5M29.4444 37.9H42.1111M29.4444 50.5V61" stroke="#13B7B3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M29.4444 28.45C29.4444 29.5639 28.9996 30.6322 28.2078 31.4198C27.416 32.2075 26.342 32.65 25.2222 32.65C24.1024 32.65 23.0285 32.2075 22.2367 31.4198C21.4448 30.6322 21 29.5639 21 28.45C21 27.3361 21.4448 26.2678 22.2367 25.4802C23.0285 24.6925 24.1024 24.25 25.2222 24.25C26.342 24.25 27.416 24.6925 28.2078 25.4802C28.9996 26.2678 29.4444 27.3361 29.4444 28.45Z" stroke="#13B7B3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <div>
                                        <p className="text-sm text-gray-500">Tutors Registered</p>
                                        <p className="text-[30px] font-bold text-black">300</p>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center gap-4 p-5 rounded-2xl bg-white"
                                    style={{ boxShadow: "0px 8px 14px rgba(0,0,0,0.25)" }}>
                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="40" cy="40" r="37" fill="white" stroke="#13B7B3" strokeWidth="6"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M23 22.5974L23.0143 40.0303C23.0143 54.4221 40.0029 63 40.0029 63C40.0029 63 56.9971 54.901 56.9971 39.9841L57 22.5974C57 22.5974 49.3911 17 40.0029 17C30.6089 17 23 22.5974 23 22.5974ZM54.358 40.6449C54.358 52.0244 40.8683 59.9243 39.9486 60.3715V60.4148L39.9057 60.3946L39.8629 60.4148V60.3715C38.9432 59.9243 25.4535 52.0244 25.4535 40.6449L25.442 24.3026C25.442 24.3026 31.8913 19.7583 39.8629 19.7208H39.9057L39.9486 19.7179C47.9202 19.7554 54.3695 24.3026 54.3695 24.3026L54.358 40.6449ZM51.1934 41.1065C51.1934 51.0174 40.7083 56.8659 39.9914 57.2554V57.29C39.9914 57.29 39.9629 57.2785 39.96 57.2727L39.9257 57.29V57.2525C39.2088 56.863 28.7266 51.0146 28.7266 41.1036L28.7152 26.8821C28.7152 26.8821 33.7307 22.9292 39.9257 22.8946H39.9914C46.1894 22.9292 51.1991 26.8821 51.1991 26.8821L51.1934 41.1065Z" fill="#13B7B3"/>
                                    </svg>
                                    <div>
                                        <p className="text-sm text-gray-500">Admins Registered</p>
                                        <p className="text-[30px] font-bold text-black">15</p>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center gap-4 p-5 rounded-2xl bg-white"
                                    style={{ boxShadow: "0px 8px 14px rgba(0,0,0,0.25)" }}>
                                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="40" cy="40" r="37" fill="white" stroke="#13B7B3" strokeWidth="6"/>
                                        <path d="M41.4366 28.1435L42.5144 31.4447C43.5347 30.5805 44.7189 29.9296 45.9967 29.5304C47.4225 29.0681 48.6815 28.8081 49.8197 28.6588L48.7806 25.4732C47.4847 25.6591 46.2073 25.9556 44.9624 26.3593C43.7008 26.7667 42.5111 27.3688 41.4366 28.1435ZM43.6768 35.0179L44.7546 38.3191C45.7749 37.455 46.9591 36.804 48.2368 36.4048C49.6626 35.9425 50.9216 35.6825 52.0598 35.5332L51.0207 32.3476C49.7249 32.5335 48.4475 32.83 47.2025 33.2337C45.9403 33.6397 44.7504 34.2418 43.6768 35.0179ZM45.9194 41.8899L46.9971 45.1911C48.0174 44.327 49.2016 43.676 50.4794 43.2769C51.9052 42.8145 53.1642 42.5545 54.3024 42.4052L53.2633 39.2196C51.9674 39.4056 50.69 39.702 49.4451 40.1057C48.1829 40.5117 46.9929 41.1139 45.9194 41.8899ZM28.8537 47.1198L29.8928 50.3054C31.0444 49.6847 32.2514 49.1721 33.4983 48.774C34.7676 48.3496 36.1095 48.1834 37.4445 48.2852L36.3667 44.984C35.0414 44.9859 33.7245 45.1947 32.464 45.6028C31.219 46.004 30.011 46.5115 28.8537 47.1198ZM24.3709 33.3734L25.4101 36.5589C26.5622 35.9393 27.7691 35.4267 29.0156 35.0275C30.2849 34.6032 31.6268 34.437 32.9618 34.5388L31.8864 31.2352C30.5602 31.2381 29.2425 31.4477 27.9813 31.8564C26.7363 32.2576 25.5283 32.7651 24.3709 33.3734ZM26.6111 40.2478L27.6502 43.4334C28.8018 42.8127 30.0089 42.3 31.2557 41.902C32.5251 41.4776 33.867 41.3114 35.2019 41.4132L34.1266 38.1096C32.8012 38.1115 31.4843 38.3203 30.2238 38.7284C28.978 39.1304 27.7692 39.6387 26.6111 40.2478ZM42.57 19.0274C39.3951 20.0381 36.7457 22.2508 35.1923 25.1891C32.203 23.7223 28.7549 23.4845 25.5913 24.5269C19.4943 26.5013 16 30.8523 16 30.8523L25.8958 61.16C26.2003 62.0918 27.4569 62.3085 28.0175 61.5043C29.2234 59.7731 31.5457 57.5121 35.8882 56.1059C40.0399 54.7623 43.063 56.2359 44.7207 57.4976C45.378 57.9985 46.3205 57.6421 46.5622 56.8523C47.1711 54.861 48.754 51.9403 52.8694 50.6088C57.2167 49.2002 60.4308 49.6721 62.4293 50.368C63.3596 50.6906 64.2417 49.7853 63.9396 48.8534L54.0607 18.5289C54.0607 18.5289 48.667 17.0553 42.57 19.0274ZM42.2969 52.3665C39.8162 51.6225 37.1654 51.6595 34.7065 52.4724C31.6834 53.45 29.5665 54.7575 28.1843 55.8531L20.3425 31.8179C21.2077 30.9559 23.211 29.3089 26.7754 28.1555C30.132 27.0696 32.8845 27.999 34.6993 29.0657L42.2969 52.3665ZM58.9567 45.8918C57.1902 45.8147 54.7059 45.9977 51.6828 46.9777C49.214 47.7593 47.0476 49.2814 45.4795 51.3359L37.8819 28.0351C38.718 26.1089 40.3951 23.7444 43.7541 22.6584C47.3161 21.505 49.9091 21.664 51.1174 21.8542L58.9567 45.8918Z" fill="#13B7B3"/>
                                    </svg>
                                    <div>
                                        <p className="text-sm text-gray-500">Courses Available</p>
                                        <p className="text-[30px] font-bold text-black">26</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-3xl p-5 mt-5">
                            <h3 className="text-[26px] font-bold mb-6">Recent Registrations</h3>

                            <div className="space-y-9">
                                <div className="flex items-center gap-6">
                                    <div className="w-[100px] h-[100px] rounded-full bg-gray-300"></div>

                                    <div>
                                        <p className="text-[26px] font-bold text-black">David Williams</p>
                                        <p className="text-sm text-gray-500 font-bold">
                                            Student, Computer Science (CS-301)
                                        </p>
                                        <p className="text-sm text-gray-500 font-bold">
                                            davidwilliams@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="w-[100px] h-[100px] rounded-full bg-gray-300"></div>

                                    <div>
                                        <p className="text-[26px] font-bold text-black">Sarah Johnson</p>
                                        <p className="text-sm text-gray-500 font-bold">
                                            Student, Software Engineering
                                        </p>
                                        <p className="text-sm text-gray-500 font-bold">
                                            sarahjohnson@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="w-[100px] h-[100px] rounded-full bg-gray-300"></div>

                                    <div>
                                        <p className="text-[26px] font-bold text-black">Michael Brown</p>
                                        <p className="text-sm text-gray-500 font-bold">
                                            Student, Information Technology
                                        </p>
                                        <p className="text-sm text-gray-500 font-bold">
                                            michaelbrown@gmail.com
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="w-[100px] h-[100px] rounded-full bg-gray-300"></div>

                                    <div>
                                        <p className="text-[26px] font-bold text-black">Emily Carter</p>
                                        <p className="text-sm text-gray-500 font-bold">
                                            Student, Data Science
                                        </p>
                                        <p className="text-sm text-gray-500 font-bold">
                                            emilycarter@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
