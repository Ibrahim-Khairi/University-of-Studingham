import { useState } from "react";

export default function MonthlyBudgetSetup() {
    const [transferToSavings, setTransferToSavings] = useState(true);

    return (
        <div className="bg-white rounded-3xl p-6 mt-6">
            <p className="text-[26px] font-semibold mb-6">
                Monthly Budget Setup
            </p>

            {/* Budget input */}
            <div className="mb-5">
                <label className="block text-[18px] font-medium mb-2">
                    Budget
                </label>
                <input
                    type="number"
                    placeholder="Enter budget"
                    className="
                        w-full p-2 outline-none
                        border-2 rounded-2xl border-[#95B4D3]
                        placeholder:text-[#8F8F8F]
                    "
                />
            </div>

            {/* Savings input */}
            <div className="mb-6">
                <label className="block text-[18px] font-medium mb-2">
                    Savings
                </label>
                <input
                    type="number"
                    placeholder="Enter savings"
                    className="
                        w-full p-2 outline-none
                        border-2 rounded-2xl border-[#95B4D3]
                        placeholder:text-[#8F8F8F]
                    "
                />
            </div>

            {/* Toggle row */}
            <div className="flex items-center justify-between mb-1">
                <p className="text-[18px] font-medium">
                    Transfer balance to savings?
                </p>

                <div className="flex rounded-xl border-[#4877DF] border-b-2 cursor-pointer">
                    <button
                        onClick={() => setTransferToSavings(true)}
                        className={`px-5 py-2 text-sm transition rounded-lg cursor-pointer
                            ${transferToSavings
                            ? "bg-[#4877DF] text-white"
                            : "bg-white text-[#00000]"
                        }`}
                    >
                        Yes
                    </button>

                    <button
                        onClick={() => setTransferToSavings(false)}
                        className={`px-5 py-2 text-sm transition rounded-lg cursor-pointer
                            ${!transferToSavings
                            ? "bg-[#4877DF] text-white"
                            : "bg-white text-[#00000]"
                        }`}
                    >
                        No
                    </button>
                </div>
            </div>

            <p className="text-gray-500 italic text-sm mb-6">
                Toggle yes if you want to transfer your previous balance to savings.
                If you don’t press yes, these will automatically be added to your budget.
            </p>

            <button
                className="
                    w-full py-2
                    bg-[#4877DF]
                    text-white font-semibold
                    rounded-full
                    cursor-pointer
                "
            >
                SAVE
            </button>
        </div>
    );
}