import React from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

type DataCount = {
  page: number,
  total: number,
  totalPages: number,
  hasNextPage: boolean
  hasPrevPage: boolean,
  limit: number,
  dataLength: number
}

const Pagination = ({dataCount}: {dataCount: DataCount}) => {
  return (
    <div className='flex rounded-md justify-between mt-3 py-3 items-center text-xs px-3 bg-white border-b-2 border-third'>
      {/* left */}
      <div className='flex items-center gap-4'>
        <span className='flex items-center gap-2'> {!dataCount.hasPrevPage ? 1 : dataCount.page * dataCount.limit} <span className='text-[10px]'>sampai </span> {!dataCount.hasNextPage ? dataCount.dataLength : dataCount.page * dataCount.limit + dataCount.limit} </span>
        <span className='text-[10px]'>dari</span>
        <span>{dataCount.total}</span>
      </div>
      <div className='flex items-center gap-4'>
        <button className='cursor-pointer disabled:cursor-not-allowed disabled:text-slate-300' disabled={!dataCount.hasPrevPage}><MdOutlineKeyboardArrowLeft size={15} /></button>
        <div className='flex items-center gap-2'>
          <span>{dataCount.page}</span>
          <span className='text-[10px]'>dari</span>
          <span>{dataCount.totalPages}</span>
        </div>
        <button className='cursor-pointer disabled:cursor-not-allowed disabled:text-slate-300' disabled={!dataCount.hasNextPage}><MdOutlineKeyboardArrowRight size={15} /></button>
      </div>
    </div>
  )
}

export default Pagination