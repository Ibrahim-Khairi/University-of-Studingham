import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
const Bookschart = () => {
  const data = [
    { name: "totalBooks", value: 100, color: "#D75CEA" },
    { name: "Borrowed", value: 97, color: "#5C7AEA" },
    { name: "On Hold", value: 63, color: "#F6D047" },
    { name: "Returned", value: 9, color: "#22988E" },
  ];
  return (
    <div className="flex justify-center items-center p-4 w-[150px] h-[150px] ">
      <PieChart width={200} height={200}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default Bookschart;
