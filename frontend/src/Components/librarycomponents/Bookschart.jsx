import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Bookschart = ({ stats }) => {
  // Map the stats from props into chart data
  const data = [
    { name: "total", value: stats?.total || 1, color: "#D75CEA" },
    { name: "Borrowed", value: stats?.borrowed || 0, color: "#5C7AEA" },
    { name: "Pending", value: stats?.pending || 0, color: "#F6D047" },
    { name: "Returned", value: stats?.returned || 0, color: "#22988E" },
  ];

  return (
    <div className="w-[180px] h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bookschart;
