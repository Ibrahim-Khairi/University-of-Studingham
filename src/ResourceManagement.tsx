import React from 'react';
import './App.css';

const ResourceManagement: React.FC = () => {
  const programmeDetails = [
    { label: 'Programme of Study', value: 'Bachelors' },
    { label: 'Mode of Attendance', value: 'Full Time' },
    { label: 'Level', value: 'I' },
    { label: 'Start Date', value: 'September' },
    { label: 'Completion Date', value: 'June 2027' },
    { label: 'Degree', value: 'University of Studingham' }
  ];

  return (
    <div className="resource-management">
      <h2>Programme Details</h2>
      <h3 className="sub-header">Your Details</h3>
      <table className="programme-table">
        <tbody>
          {programmeDetails.map((detail, index) => (
            <tr key={index}>
              <td className="label-cell">{detail.label}</td>
              <td className="value-cell">{detail.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceManagement;