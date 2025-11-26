import React, { useState } from 'react';

// Define TypeScript interface for the data
interface Schedule {
  data: string;
  time: string;
  room: string;
  instructor: string;
  status: string;
}

// Props interface for HorizontalRow component
interface HorizontalRowProps {
  label: string;
  value: string;
}

// HorizontalRow component - displays label and value side by side
const HorizontalRow: React.FC<HorizontalRowProps> = ({ label, value }) => {
  const isStatus = label === 'Status';
  
  return (
    <div className="horizontal-row">
      <div className="row-label">{label}</div>
      <div className={`row-value ${isStatus ? 'status-value' : ''}`}>
        {isStatus ? (
          <span className={`status-text ${value === 'Ongoing' ? 'ongoing' : ''}`}>
            {value}
          </span>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

// Main Horizontal Table component
const BasicTable: React.FC = () => {
  const [schedules] = useState<Schedule[]>([
    { 
      data: 'Monday 30 October', 
      time: '11:00 to 12:00', 
      room: 'FML-104', 
      instructor: 'Dr Bruce', 
      status: 'Ongoing' 
    }
  ]);

  const schedule = schedules[0]; // Get the first schedule

  return (
    <div className="basic-table-container">
      <div className="horizontal-table">
        <HorizontalRow label="Date" value={schedule.data} />
        <HorizontalRow label="Time" value={schedule.time} />
        <HorizontalRow label="Room" value={schedule.room} />
        <HorizontalRow label="Instructor" value={schedule.instructor} />
        <HorizontalRow label="Status" value={schedule.status} />
      </div>
    </div>
  );
};

export default BasicTable;