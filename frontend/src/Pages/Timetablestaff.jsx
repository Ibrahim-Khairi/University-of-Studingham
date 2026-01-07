import React from 'react'
import LecturesCalendar from '../components/Timetablecomponents/LecturesCalendar'
import DashboardPanel from '../components/Dashboardcomponents/DashboardPanel'

const Timetablestaff = () => {
  return (
   <div className="bg-[#EFEFEF]  ">
      <div className=" grid grid-cols-1 lg:grid-cols-[0.4fr_1.7fr] gap-4 p-5 ">
        <div>
            <DashboardPanel />
        </div>
      <LecturesCalendar />
    </div>
       </div>
  )
}

export default Timetablestaff
