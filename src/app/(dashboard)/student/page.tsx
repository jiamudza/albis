import EventCalendar from '@/components/eventCalendar'
// import 'react-calendar/dist/Calendar.css';
import React from 'react'
import AnnouncementCard from '@/components/announcementCard';
import EventCard from '@/components/eventCard';
import BigCalendar from '@/components/bigCalendar';

const StudentPage = () => {

  return (
    <div className='flex flex-col md:flex-row gap-2 md:mb-0 overflow-y-auto'>
      {/* LEFT */}
      <div className="flex-2/3 p-3">
      <div>
        <h3 className='font-bold text-lg mb-3 text-primary'>Hallo Ajimas</h3>
      </div>
       <BigCalendar />
        
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

export default StudentPage
