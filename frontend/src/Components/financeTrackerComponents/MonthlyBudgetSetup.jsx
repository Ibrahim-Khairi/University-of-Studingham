import { useState, useEffect } from "react";
import axios from "axios";

export default function MonthlyBudgetSetup({
  currentBudget,
  currentSavings,
  onUpdate,
}) {
  const [budget, setBudget] = useState("");
  const [savings, setSavings] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentBudget) setBudget(currentBudget);
    if (currentSavings) setSavings(currentSavings);
  }, [currentBudget, currentSavings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        "http://localhost:5000/api/finance/budget",
        { budget: Number(budget), savings: Number(savings) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onUpdate) onUpdate();
      alert("Plan Updated");
    } catch (error) {
      alert("Error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-[25px] p-6 shadow-sm border border-gray-100 flex-shrink-0">
      <h3 className="text-xl font-black uppercase text-gray-800 mb-4">
        Finance Plan
      </h3>
      <div className="space-y-3">
        <div>
          <label className="text-[14px] font-black uppercase text-gray-400 block mb-1">
            Target Budget
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm"
          />
        </div>
        <div>
          <label className="text-[14px] font-black uppercase text-gray-400 block mb-1">
            Savings Goal
          </label>
          <input
            type="number"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm"
          />
        </div>
        <button
          disabled={isSaving}
          onClick={handleSave}
          className="w-full py-3 bg-gray-800 text-white font-black text-xs uppercase rounded-xl hover:bg-black transition-all active:scale-95 mt-2"
        >
          {isSaving ? "Saving..." : "Update Plan"}
        </button>
      </div>
    </div>
  );
}
