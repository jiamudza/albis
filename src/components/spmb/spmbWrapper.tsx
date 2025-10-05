'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { useNewStudent } from '@/lib/dataFetch'
import NewStudentsTable from '@/components/newStudentTable'
import NewStudentsChart from '../newStudentChart'
import axios from 'axios'


const tab = [
    {
        key: "data",
        Label: "Data",
        className: "px-4 py-1 border-t-4 border-primary [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-third text-[10px] md:text-xs lg:text-sm font-semibold text-white -mr-2 relative z-30"
    },
    {
        key: "persentase",
        Label: "Persentase",
        className: "px-2 lg:px-4 py-1 border-t-4 border-pink-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-pink-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white -mr-2 relative z-20"
    },
    {
        key: "anggaran",
        Label: "Anggaran",
        className: "px-2 lg:px-4 py-1 border-t-4 border-amber-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-amber-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white -mr-2 relative z-10"
    },
    {
        key: "sosialisasi",
        Label: "Sosialisasi",
        className: "px-2 lg:px-4 py-1 border-t-4 border-blue-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-blue-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white relative z-0"
    },
]

const SpmbWrapper = () => {

    const [filter, setFilter] = useState({
        search: "",
    })

    const  [debounceSearch, setDebounceSearch] = useState(filter.search)
    type DataResponse = {
        page: number
        total: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
        limit: number
        data: any[]
        summary: [{
            program: string;
            jumlah: number
        }]
    }

    const [loading, setLoading] = useState(true)

    const [data, setData] = useState<DataResponse>({
        page: 0,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 0,
        data: [],
        summary: [{
            program: "",
            jumlah: 0,
        }]
    })

    const [studentDetail, setStudentDetail] = useState(false)
    // const { data, error, isLoading, hasNextPage, hasPrevPage, page, total, totalPages, limit } = await useNewStudent(filter.search)

    useEffect(() => {

        const handler = setTimeout(() => {
            setDebounceSearch(filter.search)
        }, 500)

        return () => clearTimeout(handler);

        

    }, [filter.search])

    useEffect(() => {
        setLoading(true)

        axios.get(`http://localhost:5000/api/getNewStudents?search=${filter.search}`)
            .then(res => {
                setData(res.data)
            })
            .finally(() => setLoading(false))
        
    }, [debounceSearch])

    type dataOfPage = {
        page: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        limit: number;
        dataLength: number
    }
    const pageData: dataOfPage = {
        page: data.page,
        total: data.total,
        totalPages: data.totalPages,
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
        limit: data.limit,
        dataLength: data.data.length
    }

    const [tabActive, setTabActive] = useState("data")

    const handleSearch = (value: string) => {

        setFilter(prev => ({
            ...prev,
            search: value
        }))
    }

    const student = data.data;
    const programSummary = data.summary;

    const component = () => {
        // DATA
        if (tabActive === "data")

            return <NewStudentsTable data={student} pageData={pageData} filter={handleSearch} loading={loading}/>
        // return <div></div>
        // Persentase
        if (tabActive === "persentase")
            return <div className='border border-t-0 rounded-md rounded-tl-none bg-white border-slate-300'>
                <div className='h-1 w-full bg-pink-300  rounded-tr-md'></div>
                <div className='flex flex-col md:flex-row'>
                    <div className='flex-1/2'>
                        <NewStudentsChart programSummary={programSummary} />
                    </div>
                </div>
            </div>
            // Anggaran
        if (tabActive === "anggaran")
            return <div className='border border-t-0 rounded-md rounded-tl-none bg-white border-slate-300'>
                <div className='h-1 w-full bg-amber-300 rounded-tr-md'></div>
                <p className='p-4'>Anggaran</p></div>
            // Sosialisasi
        return <div className='border border-t-0 rounded-md rounded-tl-none bg-white border-slate-300'>
            <div className='h-1 w-full bg-blue-300 rounded-tr-md'></div>
            <p className='p-4'>Sosialisasi</p></div>
    }


    return (
        <div className=''>

            <div className='flex flex-col lg:flex-row'>
                {/* left */}
                <div className='flex-2/3' >
                    <h3 className='font-bold text-lg text-primary'>Sistem Penerimaan Murid Baru (SPMB)</h3>
                    <div className='flex mt-2'>

                        {tab.map(t => (
                            <div onClick={() => {
                                setTabActive(t.key)
                            }} key={t.key} className={`${t.className} cursor-pointer text-center transition-all ease-in-out duration-200 ${tabActive === t.key ? "z-40" : ""}`}>
                                <p>{t.Label}</p>
                            </div>
                        ))}
                    </div>
                    <div>

                        {component()}

                    </div>



                </div>
            </div>
        </div>
    )
}

export default SpmbWrapper