import { useNavigate } from "react-router-dom";

const CourseAddedSuccess = ({ onAddAnother }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center text-center py-16">
            <div className="border-[1.5px] border-green-700 p-1 rounded-full">
                <div className="border-[3px] border-white rounded-full">
                    <div className="border-[3px] border-green-100 rounded-full">
                        <div className="border-[6px] border-white rounded-full p-6">
                            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={3}
                                    stroke="white"
                                    className="w-10 h-10"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="mt-8 text-[22px] font-bold">
                COURSE ADDED SUCCESSFULLY!
            </h2>

            <p className="mt-4 text-gray-500 text-[16px] max-w-md">
                Your new course has been created and is now live on the portal.
            </p>

            <div className="mt-10 flex gap-6">
                <button
                    onClick={() => navigate("/courses")}
                    className="px-8 py-3 border-2 border-[#4877DF] text-[#4877DF] rounded-full font-semibold"
                >
                    VIEW COURSE
                </button>

                <button
                    onClick={onAddAnother}
                    className="px-8 py-3 bg-[#4877DF] text-white rounded-full font-semibold"
                >
                    ADD ANOTHER COURSE
                </button>
            </div>
        </div>
    );
};

export default CourseAddedSuccess;
