import {useEffect, useState} from "react";
import RichTextEditor from "./RichTextEditor.jsx";

const PolicyModificationForm = () => {
    const [activeTab, setActiveTab] = useState("terms");

    const [policies, setPolicies] = useState({
        terms: "",
        privacy: "",
        accessibility: ""
    });

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const keys = ["terms", "privacy", "accessibility"];
                const result = {};

                for (const key of keys) {
                    const res = await fetch(`http://localhost:5000/api/policies/${key}`);
                    const data = await res.json();

                    result[key] = data.content || "";
                }
                setPolicies(result);
            } catch (error) {
                console.error("Failed to fetch policies", error);
            }
        };
        fetchPolicies();
    }, []);

    const handleChange = (value) => {
        setPolicies((prev) => ({ ...prev, [activeTab]: value }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(`http://localhost:5000/api/policies/${activeTab}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ content: policies[activeTab] })
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error(errorData);
                alert("There was an error updating the policy");
                return;
            }

            const updatedPolicy = await res.json();
            console.log(`${activeTab.toUpperCase()} policy updated successfully!`);
            alert("Policy updated!");
        } catch (error) {
            console.error("Failed to update policy", error);
        }
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
