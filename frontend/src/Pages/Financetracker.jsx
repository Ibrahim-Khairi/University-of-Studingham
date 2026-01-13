import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Wallet,
  TrendingDown,
  Coins,
  PiggyBank,
  PlusCircle,
  Tag,
  ChevronRight,
  FileText,
  XCircle,
  Info,
} from "lucide-react";
import DashboardPanel from "../components/Dashboardcomponents/DashboardPanel";
import DashboardSearch from "../components/Dashboardcomponents/DashboardSearch";
import MonthlyBudgetSetup from "../Components/financeTrackerComponents/MonthlyBudgetSetup.jsx";

// Map Backend Categories to Icons and Colors
const CATEGORY_MAP = {
  Rent: { color: "#4A6FA5", icon: <Wallet size={20} /> },
  Utilities: { color: "#6F9E9A", icon: <LayoutDashboard size={20} /> },
  Groceries: { color: "#3E9351", icon: <Tag size={20} /> },
  Subscriptions: { color: "#C4A46B", icon: <FileText size={20} /> },
  "Eating Out": { color: "#C66D6D", icon: <Coins size={20} /> },
  Other: { color: "#E56C51", icon: <PlusCircle size={20} /> },
};

const Financetracker = () => {
  const [financeData, setFinanceData] = useState({
    monthlyBudget: 0,
    savings: 0,
    expenses: [],
  });
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    amount: "",
    category: "Groceries",
    date: new Date().toISOString().split("T")[0],
  });

  const token = localStorage.getItem("accessToken");
  const BASE_URL = "http://localhost:5000/api/finance";

  const fetchFinanceData = async () => {
    try {
      const res = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFinanceData(res.data);
    } catch (err) {
      console.error("Failed to fetch finance data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceData();
  }, []);

  // 2. Logic for Totals
  const totalSpent = financeData.expenses.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const remainingBalance = financeData.monthlyBudget - totalSpent;
  const currentSavings = financeData.savings || 0;

  const handleAddExpense = async () => {
    if (!form.amount || Number(form.amount) <= 0)
      return alert("Please enter a valid amount");

    try {
      const res = await axios.post(`${BASE_URL}/expense`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFinanceData(res.data);
      setForm({ ...form, amount: "" });
      alert("Expense logged successfully!");
    } catch (err) {
      alert("Error adding expense");
    }
  };

  const getChartGradient = () => {
    if (totalSpent === 0) return "#f3f4f6";
    let cumulative = 0;
    const colors = Object.keys(CATEGORY_MAP).map((cat) => {
      const catTotal = financeData.expenses
        .filter((e) => e.category === cat)
        .reduce((acc, curr) => acc + curr.amount, 0);
      const percentage = (catTotal / totalSpent) * 100;
      const start = cumulative;
      cumulative += percentage;
      return `${CATEGORY_MAP[cat].color} ${start}% ${cumulative}%`;
    });
    return `conic-gradient(${colors.join(", ")})`;
  };

  if (loading)
    return (
      <div className="p-20 text-center font-black uppercase text-[#72333B] animate-pulse">
        Syncing Ledger...
      </div>
    );

  return (
    <div className="bg-[#EFEFEF] min-h-screen font-[Century Gothic]">
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] gap-4 p-5">
        <div>
          {" "}
          <DashboardPanel />
        </div>

        <div className="flex flex-col gap-6 ">
          <DashboardSearch />

          {/* TOP STAT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              title="Target Budget"
              value={financeData.monthlyBudget}
              color="#488DCD"
              icon={<PiggyBank size={24} />}
            />
            <StatCard
              title="Total Spent"
              value={totalSpent}
              color="#F6825B"
              icon={<TrendingDown size={24} />}
              isNegative={true}
            />
            <StatCard
              title="Remaining"
              value={remainingBalance}
              color="#51B988"
              icon={<Wallet size={24} />}
            />
            <StatCard
              title="Total Savings"
              value={currentSavings}
              color="#9078CE"
              icon={<Coins size={24} />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <div className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-black uppercase text-gray-800 mb-4">
                Spending Breakdown
              </h3>
              <div className="flex flex-col xl:flex-row gap-12 items-center">
                <div className="relative w-[180px] h-[180px]">
                  <div
                    className="absolute inset-0 rounded-full shadow-inner transition-all duration-700"
                    style={{ background: getChartGradient() }}
                  />
                  <div className="absolute inset-[45px] bg-white rounded-full flex flex-col items-center justify-center text-center shadow-sm">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                      Total Out
                    </p>
                    <p className="text-xl font-black text-gray-800">
                      £{totalSpent.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                  {Object.keys(CATEGORY_MAP).map((cat) => {
                    const catTotal = financeData.expenses
                      .filter((e) => e.category === cat)
                      .reduce((acc, curr) => acc + curr.amount, 0);
                    const perc =
                      totalSpent > 0
                        ? ((catTotal / totalSpent) * 100).toFixed(0)
                        : 0;
                    return (
                      <div
                        key={cat}
                        className="flex items-center gap-4 p-0 rounded-[25px] hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                      >
                        <div
                          className="w-3 h-3 rounded-full shadow-sm"
                          style={{ backgroundColor: CATEGORY_MAP[cat].color }}
                        />
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-gray-400 uppercase">
                            {cat}
                          </p>
                          <p className="text-sm font-black text-gray-700">
                            £{catTotal.toFixed(2)}{" "}
                            <span className="text-gray-300 ml-1">
                              ({perc}%)
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <MonthlyBudgetSetup
              currentBudget={financeData.monthlyBudget}
              currentSavings={financeData.savings}
              onUpdate={fetchFinanceData}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
            <div className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-black uppercase text-gray-800 mb-8">
                Recent Activity
              </h3>
              <div className="space-y-6 h-[250px] overflow-y-auto pr-4 overflow-scroll">
                {financeData.expenses.length > 0 ? (
                  [...financeData.expenses].reverse().map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 transition-all group"
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className="w-14 h-14 rounded-[20px] flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform"
                          style={{
                            backgroundColor: CATEGORY_MAP[item.category]?.color,
                          }}
                        >
                          {CATEGORY_MAP[item.category]?.icon}
                        </div>
                        <div>
                          <p className="font-black text-gray-800 uppercase text-sm">
                            {item.category}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            {new Date(item.date).toLocaleDateString(undefined, {
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="font-black text-red-500 text-lg">
                        - £{item.amount.toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center flex flex-col items-center gap-4">
                    <Info className="text-gray-200" size={50} />
                    <p className="text-gray-300 font-black uppercase tracking-widest">
                      No spending recorded this month
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#72333B] rounded-[40px] p-10 shadow-2xl text-white">
              <h3 className="text-xl font-black uppercase mb-2 ">
                Add Transaction
              </h3>
              <div className="space-y-4">
                <div className="">
                  <label className="text-[14px] text-white uppercase  opacity-50">
                    Amount in GBP (£)
                  </label>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: e.target.value })
                    }
                    className="w-full p-2.5  bg-white/10 border-2 border-white/5  rounded-xl outline-none font-bold text-sm"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="text-[14px]  uppercase  opacity-50">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      className="w-full p-2.5  bg-white/10 border-2 border-white/5  rounded-xl outline-none font-bold text-sm"
                    >
                      {Object.keys(CATEGORY_MAP).map((cat) => (
                        <option key={cat} value={cat} className="text-black">
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 opacity-40" />
                  </div>
                </div>

                <div>
                  <label className="text-[14px]  uppercase  opacity-50">
                    Transaction Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full p-2.5  bg-white/10 border-2 border-white/5  rounded-xl outline-none font-bold text-sm"
                  />
                </div>

                <button
                  onClick={handleAddExpense}
                  className="w-full bg-white text-[#72333B] py-2 rounded-[10px] font-black text-xl shadow-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-4 active:scale-[0.98] mt-6"
                >
                  <PlusCircle size={28} /> LOG EXPENSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, icon, isNegative }) => (
  <div className="p-4 rounded-[40px] shadow-sm bg-white border border-gray-100 group hover:translate-y-[-5px] transition-all flex items-center gap-6">
    <div
      className="p-5 rounded-3xl text-white shadow-lg group-hover:scale-110 transition-transform"
      style={{ backgroundColor: color }}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
        {title}
      </p>
      <p
        className={`text-2xl font-black ${
          value < 0 && !isNegative ? "text-red-500" : "text-gray-800"
        }`}
      >
        {value < 0
          ? `- £${Math.abs(value).toFixed(2)}`
          : `£${value.toFixed(2)}`}
      </p>
    </div>
  </div>
);

export default Financetracker;
