import React from "react";

const ApprovalCard = ({ className, name, role, email, phoneNumber, onApprove, onReject }) => {
    return (
        <div className={`w-full bg-white rounded-3xl shadow-[0_24px_40px_rgba(0,0,0,0.1)] p-6 flex items-center justify-between 
        ${className || ""}`}>

            <div className="flex items-center gap-6">
                <div className="w-[90px] h-[90px] rounded-full bg-gray-300" />
                <div>
                    <p className="text-[26px] font-bold text-black">
                        {name}
                    </p>
                    <p className="text-gray-500 font-bold">
                        {role}, {email}
                    </p>
                    <p className="text-gray-500 font-bold">
                        {phoneNumber}
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onApprove}
                    className="px-8 py-3 bg-[#40BC70] text-white font-bold rounded-2xl hover:opacity-90 transition cursor-pointer"
                >
                    APPROVE
                </button>

                <button
                    onClick={onReject}
                    className="px-8 py-3 bg-[#D13129] text-white font-bold rounded-2xl hover:opacity-90 transition cursor-pointer"
                >
                    REJECT
                </button>
            </div>
        </div>
    );
};

export default ApprovalCard;