import EventCalendar from '@/components/eventCalendar'
import InfoCard from '@/components/infoCard'
import 'react-calendar/dist/Calendar.css';
import React from 'react'
import AnnouncementCard from '@/components/announcementCard';

const AdminPage = () => {

  const announce = [
    {
      title: "Pemilihan Ketua Osis",
      description: "Pemilihan ketua osis akan dilaksanakan pada 27 Oktober 2025"
    },
    {
      title: "Rapat Guru",
      description: "Rapat awal tahun 2025 pada 3 Januari"
    },
    {
      title: "Jum'at Sehat",
      description: "Minggu depan akan ada jum'at sehat, siswa/siswi diharapkan membawa alat kebersihan"
    },
  ]

  return (
    <div className='flex flex-col md:flex-row gap-2 mb-20 md:mb-0 overflow-y-auto'>
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
      </div>
    {/* RIGHT */}
      <div className='flex-1/3 overflow-hidden px-2 bg-white'>
      {/* CALENDAR */}
      <EventCalendar />
      {/* PENGUMUMAN */}
      <h3 className='px-2 font-bold'>Pengumuman !</h3>
    <AnnouncementCard announce={announce} />
      </div>
    </div>
  )
}

export default AdminPage
