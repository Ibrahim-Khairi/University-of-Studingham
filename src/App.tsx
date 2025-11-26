import './App.css';
import ResourceManagement from './ResourceManagement';
import img1 from './image/Programme.JPG.jpg';

function App() {
  return (
    <div className="App">
      <div className="main-layout">
        <div className="left-column">
          <ResourceManagement />
          
          <div className="results-section">
            <h3 className="results-header">Results</h3>
            <div className="year-item">First Year</div>
            <div className="year-item">Second Year</div>
            <div className="year-item">Third Year</div>
          </div>

          <div className="academic-tools-section">
            <h3 className="tools-header">Academic Tools</h3>
            <p className="tools-subheader">Tools to help with University</p>
            <div className="tool-item">Bibliography Generator</div>
            <div className="tool-item">PDF Converter</div>
            <div className="tool-item">Student Planner</div>
            <div className="tool-item">Pomodoro Timer</div>
          </div>
        </div>

        <div className="right-column">
          <div className="programme-table-section">
            <h3 className="programme-header">Programme Table</h3>
            <img
            src={img1}
            alt="Programme Table"
            className="programme-image"
            />
            <div className="image-placeholder">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;