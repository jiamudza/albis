import React from 'react'

type infoCardProps = {
    type: string;
    count: number;
}

const InfoCard = ({type, count}: infoCardProps) => {
    const today = new Date();

const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
const year = today.getFullYear();

const formatted = `${day}/${month}/${year}`;

  return (
    <div className='flex-1 odd:bg-primary even:bg-amber-400 text-white rounded-md p-3'>
        <div className='flex items-center justify-between'>
            <p className='text-xs text-nowrap font-semibold'>{type}</p>
        <button>...</button>
        </div>
        <div className="flex items-center justify-start md:justify-between gap-4 mt-3">
            <span className="text-[10px] bg-white px-2 py-1 rounded-full text-text">{formatted}</span>
            <span className='text-xl xl:text-3xl font-bold'>{count}</span>
        </div>
        
    </div>
  )
}

export default InfoCard
