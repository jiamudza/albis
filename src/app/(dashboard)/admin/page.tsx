import InfoCard from '@/components/infoCard'
import React from 'react'

const AdminPage = () => {
  return (
    <div className='flex flex-col md:flex-row p-3 gap-2 overflow-auto'>
      {/* LEFT */}
      <div className="flex-2/3">
        <h3 className='text-lg font-bold text-primary'>Dashboard</h3>
        <div className='w-full flex justify-between flex-wrap items-center gap-2 lg:gap-4 mt-3'>
          <InfoCard type='Total Siswa' count={205} />
          <InfoCard type='Total Guru' count={25} />
          <InfoCard type='Total Mapel' count={14} />
          <InfoCard type='Total Kelas' count={11} /> 
        </div>
      </div>

      <div className='flex-1/3'>r</div>
    </div>
  )
}

export default AdminPage
