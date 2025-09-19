import React from 'react'

type tableHeader = {
    name: string;
    key: string;
    class? : string;
}

type tableProps = {
    tableHead: tableHeader[];
    tableData: () => React.JSX.Element[];
}

const TableList = ({tableHead, tableData}: tableProps) => {
  return (
    <div className=' bg-white max-h-[60vh] rounded-2xl p-3 cursor-default overflow-auto'>
      <table className='w-full rounded-2xl'>
        <thead className=''>
            <tr className='text-left'>
                {tableHead && tableHead.map(i => (
                    <th key={i.key} className={i.class ? i.class : ""}>{i.name}</th>
                ))}
            </tr>
        </thead>
        <tbody className='overflow-y-auto'>
            {tableData()}
        </tbody>
      </table>
    </div>
  )
}

export default TableList
