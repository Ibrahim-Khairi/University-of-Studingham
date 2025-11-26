import React from 'react';
import BasicTable from './BasicTable';
import './App.css';

const App: React.FC = () => {
  const handleCheckIn = () => {
    console.log('Check-in button clicked');
  };

  return (
    <div className="app">
      <div className="page-header-section">
        <h1 className="main-header">CS102 - Website Development</h1>
        <h2 className="sub-header">Lecture Attendance</h2>
      </div>
      
      <div className="main-content">
        <div className="left-section">
          <BasicTable />
          <div className="check-in-section">
            <p className="check-in-message">You haven't checked in yet</p>
            <button className="check-in-button" onClick={handleCheckIn}>
              Check In
            </button>
          </div>
        </div>
        
        <div className="right-section">
          <div className="upcoming-lecture">
            <h3 className="upcoming-header">Upcoming Lecture</h3>
            <div className="lecture-item">
              <div className="lecture-title">Data Structure</div>
              <div className="lecture-time">1:00 to 2:00</div>
            </div>
            <div className="lecture-item">
              <div className="lecture-title">C++ Programme</div>
              <div className="lecture-time">2:00 to 3:00</div>
            </div>
          </div>
          
          <div className="module-insight">
            <h3 className="module-header">Module Insight</h3>
            <div className="insight-content">
              <div className="donut-chart">
                <div className="chart-percentage">83%</div>
              </div>
              <div className="attendance-stats">
                <div className="stat-item">
                  <span className="stat-label">Attendance :</span>
                  <span className="stat-value">24</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Absence :</span>
                  <span className="stat-value">5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;