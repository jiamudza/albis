import React, { ReactNode } from 'react'

const TableList = ({ columns, renderRow, data }: { columns: { key: string; label: string; className?: string }[], renderRow: (item: any) => React.ReactNode, data: any[] }) => {

  return (
    <div className=' bg-white rounded-2xl px-3 cursor-default h-[65vh] overflow-auto border-b-3 border-third'>
      <table className='w-full rounded-2xl'>
        <thead className='sticky top-0 bg-white'>
          <tr className='text-left text-xs'>
            {columns.map(col => (
              <th key={col.key} className={`${col.className} py-2`}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className='px-4'>
          {data.map((item) => (renderRow(item)))}
        </tbody>
      </table>
    </div>
  )
}

export default TableList
