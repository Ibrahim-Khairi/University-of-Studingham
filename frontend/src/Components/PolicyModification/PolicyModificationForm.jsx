import { useState } from "react";
import RichTextEditor from "./RichTextEditor.jsx";

const PolicyModificationForm = () => {
    const [activeTab, setActiveTab] = useState("terms");

    const [policies, setPolicies] = useState({
        terms: `
            <h2>Terms & Conditions</h2>
            <p>These terms govern the use of the platform.</p>
        `,
        privacy: `
            <h2>Privacy Policy</h2>
            <p>Your privacy is important to us.</p>
        `,
        accessibility: `
            <h2>Accessibility Statement</h2>
            <p>We are committed to accessibility.</p>
        `,
    });

    const handleChange = (value) => {
        setPolicies((prev) => ({
            ...prev,
            [activeTab]: value,
        }));
    };

    const handleSave = () => {
        console.log(`UPDATED ${activeTab.toUpperCase()} POLICY:`, policies[activeTab]);
        alert("Policy updated successfully (check console)");
    };

    return (
        <div className="bg-white rounded-3xl px-16 py-10 mt-6">
            <div className="flex justify-center gap-8 mb-10">
                <button
                    onClick={() => setActiveTab("terms")}
                    className={`h-[52px] px-8 font-semibold flex items-center justify-center ${
                        activeTab === "terms"
                            ? "border-b-4 border-[#4877DF] text-black"
                            : "bg-[#EBF0F3] text-[#7B7B7B]"
                    }`}
                >
                    Terms & Conditions
                </button>

                <button
                    onClick={() => setActiveTab("privacy")}
                    className={`h-[52px] px-8 font-semibold flex items-center justify-center ${
                        activeTab === "privacy"
                            ? "border-b-4 border-[#4877DF] text-black"
                            : "bg-[#EBF0F3] text-[#7B7B7B]"
                    }`}
                >
                    Privacy Policy
                </button>

                <button
                    onClick={() => setActiveTab("accessibility")}
                    className={`h-[52px] px-8 font-semibold flex items-center justify-center ${
                        activeTab === "accessibility"
                            ? "border-b-4 border-[#4877DF] text-black"
                            : "bg-[#EBF0F3] text-[#7B7B7B]"
                    }`}
                >
                    Accessibility Statement
                </button>
            </div>

            <RichTextEditor
                value={policies[activeTab]}
                onChange={handleChange}
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSave}
                    className="w-[220px] bg-[#4877DF] text-white py-2 rounded-full font-semibold"
                >
                    SAVE CHANGES
                </button>
            </div>
        </div>
    );
};

export default PolicyModificationForm;
