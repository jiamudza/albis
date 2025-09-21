import React from 'react'

const AnnouncementCard = ({announce}:{announce:any[]}) => {
  return (
    <div className='px-5 py-2'>
        {announce.map(item => (
            <div className='odd:bg-primary even:bg-amber-500 py-2 px-3 rounded-md mt-2 text-white'>
                <div className='flex justify-between items-center '>
                    <span className='text-sm font-semibold'>{item.title}</span>
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