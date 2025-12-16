import React, { useState } from 'react';

interface AttendanceRecord {
  studentName: string;
  studentID: string;
  level: string;
  attendance: number;
  absence: number;
}

const AttendanceDetails: React.FC = () => {
  const [attendance] = useState<AttendanceRecord>({
    studentName: 'Lewis Hamilton',
    studentID: '2500106',
    level: 'I',
    attendance: 65,
    absence: 25
  });

  const total = attendance.attendance + attendance.absence;
  const attendancePercentage = (attendance.attendance / total) * 100;
  const absencePercentage = (attendance.absence / total) * 100;

  return (
    <div className="attendance-details">
      <h2>Attendance Details</h2>
      <div className="attendance-layout">
        <div className="table-section">
          <div className="column-table">
            <div className="column-row">
              <div className="column-label">Student Name</div>
              <div className="column-value">{attendance.studentName}</div>
            </div>
            <div className="column-row">
              <div className="column-label">Student ID</div>
              <div className="column-value">{attendance.studentID}</div>
            </div>
            <div className="column-row">
              <div className="column-label">Level</div>
              <div className="column-value">{attendance.level}</div>
            </div>
            <div className="column-row">
              <div className="column-label">Attendance</div>
              <div className="column-value">{attendance.attendance}</div>
            </div>
            <div className="column-row">
              <div className="column-label">Absence</div>
              <div className="column-value">{attendance.absence}</div>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <h3>Attendance Overview</h3>
          <div className="pie-chart">
            <div 
              className="chart-slice attendance-slice"
              style={{ 
                background: `conic-gradient(
                  #28a745 0% ${attendancePercentage}%,
                  #dc3545 ${attendancePercentage}% 100%
                )`
              }}
            >
              <div className="chart-center">
                <span className="chart-percentage">{Math.round(attendancePercentage)}%</span>
              </div>
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color attendance-color"></div>
              <span>Attendance: {attendance.attendance} ({Math.round(attendancePercentage)}%)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color absence-color"></div>
              <span>Absence: {attendance.absence} ({Math.round(absencePercentage)}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetails;