import React from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Pagination = () => {
  return (
    <div className='flex rounded-lg shadow-2xl justify-between mt-3 py-3 items-center text-xs px-3 bg-white border-b-2 border-third'>
        {/* left */}
        <div className='flex items-center gap-4'>
            <span>1 to 10</span>
            <span>of</span>
            <span>205</span>
        </div>
        <div className='flex items-center gap-4'>
            <span className='cursor-pointer'><MdOutlineKeyboardArrowLeft size={15} /></span>
            <span>1 of 21</span>
            <span className='cursor-pointer'><MdOutlineKeyboardArrowRight size={15} /></span>
        </div>
    </div>
  )
}

export default Pagination