import React from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"

type DataCount = {
  page: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  dataLength: number
}

type PaginationProps = {
  dataCount: DataCount
  onPageChange: (page: number) => void
}

const Pagination = ({ dataCount, onPageChange }: PaginationProps) => {
  const start = dataCount.total === 0 ? 0 : (dataCount.page - 1) * dataCount.limit + 1
  const end = dataCount.hasNextPage
    ? dataCount.page * dataCount.limit
    : Math.min(dataCount.total, dataCount.page * dataCount.limit)

  return (
    <div className='flex rounded-md justify-between mt-3 py-3 items-center text-xs px-3 bg-white border-b-2 border-third'>
      {/* Left */}
      <div className='flex items-center gap-4'>
        <span className='flex items-center gap-2'>
          {start} <span className='text-[10px]'>sampai</span> {end}
        </span>
        <span className='text-[10px]'>dari</span>
        <span>{dataCount.total}</span>
      </div>

      {/* Right */}
      <div className='flex items-center gap-4'>
        <button
          className='cursor-pointer disabled:cursor-not-allowed disabled:text-slate-300'
          disabled={!dataCount.hasPrevPage}
          onClick={() => onPageChange(dataCount.page - 1)} // ✅ halaman sebelumnya
        >
          <MdOutlineKeyboardArrowLeft size={15} />
        </button>

        <div className='flex items-center gap-2'>
          <span>{dataCount.page}</span>
          <span className='text-[10px]'>dari</span>
          <span>{dataCount.totalPages}</span>
        </div>

        <button
          className='cursor-pointer disabled:cursor-not-allowed disabled:text-slate-300'
          disabled={!dataCount.hasNextPage}
          onClick={() => onPageChange(dataCount.page + 1)} // ✅ halaman selanjutnya
        >
          <MdOutlineKeyboardArrowRight size={15} />
        </button>
      </div>
    </div>
  )
}

export default Pagination
