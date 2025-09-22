import React from 'react'

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

const AnnouncementCard = () => {
  return (
    <div className=''>
        {announce.map(item => (
            <div key={item.title} className='odd:bg-primary even:bg-amber-500 py-2 px-3 rounded-md mt-2 text-white'>
                <div className='flex justify-between items-center '>
                    <span className='text-sm font-semibold bg-white text-black rounded-full px-2 py-1'>{item.title}</span>
                    <span>...</span>
                </div>
                <div>
                    <span className='text-xs mt-2'>{item.description}</span>
                </div>
            </div>
        ))}
    </div>
  )
}

export default AnnouncementCard