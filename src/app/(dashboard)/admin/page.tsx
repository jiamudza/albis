import EventCalendar from '@/components/eventCalendar'
import InfoCard from '@/components/infoCard'
// import 'react-calendar/dist/Calendar.css';
import React from 'react'
import AnnouncementCard from '@/components/announcementCard';
import EventCard from '@/components/eventCard';
import StudentChart from '@/components/studentCountChart';
import AttendanceChart from '@/components/attendanceChart';
import FinanceChart from '@/components/financeChart';
import { role } from '@/lib/data';

const AdminPage = () => {

  return (
    <div className='flex flex-col md:flex-row gap-2 md:mb-0 overflow-y-auto'>
      {/* LEFT */}
      <div className="flex-2/3 p-3">
        <h3 className='text-lg font-bold text-primary'>Dashboard</h3>
        {/* DATA UMUM */}
        <div className='w-full flex justify-between flex-wrap items-center gap-2 lg:gap-4 mt-3'>
          <InfoCard type='Total Siswa' count={205} />
          <InfoCard type='Total Guru' count={25} />
          <InfoCard type='Total Mapel' count={14} />
          <InfoCard type='Total Kelas' count={11} /> 
        </div>
        {/* GRAFIK SISWA */}
        <div className='block lg:flex justify-start lg:justify-between gap-5 mt-3'>
            <StudentChart />
            <AttendanceChart />
        </div>
    {   role === "admin" && <div className='h-[50vh] mt-3'>
          <FinanceChart />
        </div>}
      </div>
    {/* RIGHT */}
      <div className='flex-1/3 overflow-hidden px-2 bg-white pb-20 md:pb-0'>
      {/* CALENDAR */}
     <EventCalendar />

    {/* AGENDA */}
      <div className='px-5 py-2'>
        <EventCard />
      </div>
      
      {/* PENGUMUMAN */}
    <div className='px-5 py-2'>
      <AnnouncementCard/>
    </div>
      </div>
    </div>
  )
}

export default AdminPage
