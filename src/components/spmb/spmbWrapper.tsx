'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NewStudentsTable from '@/components/newStudentTable'
import NewStudentsChart from '../newStudentChart'

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
        page: 1,
    })

    const [debounceSearch, setDebounceSearch] = useState(filter.search)
    const [loading, setLoading] = useState(true)
    const [tabActive, setTabActive] = useState("data")

    type DataResponse = {
        page: number
        total: number
        totalPages: number
        hasNextPage: boolean
        hasPrevPage: boolean
        limit: number
        data: any[],
        summary: {
            kategori: string,
            sub_kategori: string
            jumlah: number
        }[]
    }

    const [data, setData] = useState<DataResponse>({
        page: 1,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 10,
        data: [],
        summary: [{
            kategori: "",
            sub_kategori: "",
            jumlah: 0,
        }]
    })

    // === Debounce input search ===
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceSearch(filter.search)
        }, 500)
        return () => clearTimeout(handler)
    }, [filter.search])

    // === Fetch data setiap kali search atau page berubah ===
    useEffect(() => {
        setLoading(true)
        axios.get(`/api/getNewStudents?search=${debounceSearch}&page=${filter.page}&limit=10`, { withCredentials: true })
            .then(res => {
                setData(res.data)
            })
            .finally(() => setLoading(false))
    }, [debounceSearch, filter.page])

    // === handle pagination ===
    const handlePageChange = (page: number) => {
        setFilter(prev => ({
            ...prev,
            page
        }))
    }

    // === handle search ===
    const handleSearch = (value: string) => {
        setFilter(prev => ({
            ...prev,
            search: value,
            page: 1, // reset ke halaman pertama saat melakukan pencarian
        }))
    }

    // === data paging summary ===
    type DataOfPage = {
        page: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
        limit: number;
        dataLength: number;
    }

    const pageData: DataOfPage = {
        page: data.page,
        total: data.total,
        totalPages: data.totalPages,
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
        limit: data.limit,
        dataLength: data.data.length,
    }

    const student = data.data
    const programSummary = data.summary
    const program = programSummary
        .filter(item => item.kategori === "Program")
        .map(item => ({
            kategori: item.kategori,
            name: item.sub_kategori,
            value: item.jumlah
        }))
        
    const gender = programSummary
        .filter(item => item.kategori === "Jenis Kelamin")
        .map(item => ({
            kategori: item.kategori,
            name: item.sub_kategori,
            value: item.jumlah
        }))

    const statusPembayaran = programSummary
        .filter(item => item.kategori === "Status Pembayaran")
        .map(item => ({
            kategori: item.kategori,
            name: item.sub_kategori,
            value: item.jumlah
        }))
    

    const component = () => {
        if (tabActive === "data") {
            return (
                <NewStudentsTable
                    data={student}
                    pageData={pageData}
                    filter={handleSearch}
                    loading={loading}
                    onPageChange={handlePageChange} // ✅ kirim handler pagination
                />
            )
        }

        if (tabActive === "persentase") {
            return (
                <div className='border border-t-0 rounded-md rounded-tl-none bg-white border-slate-300 h-80'>
                    <div className='h-1 w-full bg-pink-300 rounded-tr-md'></div>
                    <div className='flex flex-col md:flex-row justify-center'>
                        <div className='flex-1/3'>
                            <NewStudentsChart key="program" programSummary={program} />
                        </div>
                        <div className='flex-1/3'>
                            <NewStudentsChart key="gender" programSummary={gender} />
                        </div>
                        <div className='flex-1/3'>
                            <NewStudentsChart key="status" programSummary={statusPembayaran} />
                        </div>
                    </div>
                </div>
            )
        }

        if (tabActive === "anggaran") {
            return (
                <div className='border border-t-0 rounded-md rounded-tl-none bg-white border-slate-300'>
                    <div className='h-1 w-full bg-amber-300 rounded-tr-md'></div>
                    <p className='p-4'>Anggaran</p>
                </div>
            )
        }

        return (
            <div className='border border-t-0 rounded-md rounded-tl-none bg-white border-slate-300'>
                <div className='h-1 w-full bg-blue-300 rounded-tr-md'></div>
                <p className='p-4'>Sosialisasi</p>
            </div>
        )
    }

    return (
        <div className=''>
            <div className='flex flex-col lg:flex-row'>
                <div className='flex-2/3'>
                    <h3 className='font-bold text-lg text-primary'>Sistem Penerimaan Murid Baru (SPMB)</h3>
                    <div className='flex mt-2'>
                        {tab.map(t => (
                            <div
                                key={t.key}
                                onClick={() => setTabActive(t.key)}
                                className={`${t.className} cursor-pointer text-center transition-all ease-in-out duration-200 ${tabActive === t.key ? "z-40" : ""}`}
                            >
                                <p>{t.Label}</p>
                            </div>
                        ))}
                    </div>

                    <div>{component()}</div>
                </div>
            </div>
        </div>
    )
}

export default SpmbWrapper
