import React, { ReactNode } from 'react'

type TableListProps = {
  columns: { key: string; label: string; className?: string }[];
  renderRow: (item: any) => ReactNode;
  data: any[];
};

const TableList = ({ columns, renderRow, data }: TableListProps) => {

  console.log(data)
  return (
    <div className='cursor-default overflow-auto'>
      <table className='w-full border-collapse table-auto'>
        <thead className='bg-white'>
          <tr className='text-xs text-left font-bold border-y bg-white border-slate-300'>
            {columns.map(col => (
              <th key={col.key} className={`${col.className} py-2`}>{col.label}</th>
            ))}
            {/* <td className='
            px-4 py-3 whitespace-nowrap'>Guru</td>
            <td>Kode</td>
            <td>Mata Pelajaran</td>
            <td>Jenjang Kelas</td>
            <td>Telepon</td>
            <td>Aksi</td> */}
          </tr>
        </thead>
        <tbody className='whitespace-nowrap'>
          {data.map((item, index) => (
            <React.Fragment key={item.id ?? index}>
              {renderRow(item)}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableList
