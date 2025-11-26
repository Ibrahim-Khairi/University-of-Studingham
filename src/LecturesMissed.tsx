import React from 'react';

interface MissedLecture {
  id: number;
  course: string;
  room: string;
  date: string;
  time: string;
}

const LectureMissed: React.FC = () => {
  const missedLectures: MissedLecture[] = [
    { id: 1, course: 'Computer Science', room: 'Fml100', date: '11/11/11', time: '9:00' },
    { id: 2, course: 'Computer Science', room: 'Fml100', date: '11/11/11', time: '9:00' },
    { id: 3, course: 'Computer Science', room: 'Fml100', date: '11/11/11', time: '9:00' },
    { id: 4, course: 'Computer Science', room: 'Fml100', date: '11/11/11', time: '9:00' },
    { id: 5, course: 'Computer Science', room: 'Fml100', date: '11/11/11', time: '9:00' }
  ];

  return (
    <div className="lecture-missed">
      <h2>Lectures Missed</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Room</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {missedLectures.map(lecture => (
            <tr key={lecture.id}>
              <td>{lecture.course}</td>
              <td>{lecture.room}</td>
              <td>{lecture.date}</td>
              <td>{lecture.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LectureMissed;