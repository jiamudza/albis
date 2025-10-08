import React from 'react'
// import { useNewStudent } from '@/lib/dataFetch'
// import NewStudentsTable from '@/components/newStudentTable'
import SpmbWrapper from '@/components/spmb/spmbWrapper'

const tab = [
    {
        key: "data",
        Label: "Data",
        className: "px-4 py-1 border-t-4 border-primary [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-third text-[10px] md:text-xs lg:text-sm font-semibold text-white -mr-2 relative z-40"
    },
    {
        key: "persentase",
        Label: "Persentase",
        className: "px-4 py-1 border-t-4 border-pink-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-pink-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white -mr-2 relative z-30"
    },
    {
        key: "anggaran",
        Label: "Anggaran",
        className: "px-4 py-1 border-t-4 border-amber-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-amber-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white -mr-2 relative z-20"
    },
    {
        key: "sosialisasi",
        Label: "Sosialisasi",
        className: "px-4 py-1 border-t-4 border-blue-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-blue-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white relative z-10"
    },
]

const SPMB = async () => {
    return (
        <div className='p-3'>
            <SpmbWrapper />
        </div>
    )
}

export default SPMB