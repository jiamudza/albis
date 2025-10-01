'use client'
import React, { useState } from 'react'
import Search from './search-bar'
import TableList from './table'
import { newStudent, role } from '@/lib/data'
import Image from 'next/image'
import Pagination from './pagination'
import { TbListDetails } from 'react-icons/tb'
import Link from 'next/link'
import { MdOutlineDelete } from 'react-icons/md'
import { VscSettings } from 'react-icons/vsc'
import NewStudentDetail from './newStudentDetail'

type DataCount = {
    page: number,
    total: number,
    totalPages: number,
    hasNextPage: boolean
    hasPrevPage: boolean,
    limit: number,
    dataLength: number
}

const columns = [
    {
        key: "calon_siswa",
        label: "Nama",
        className: "py-2 px-4 w-1/3 md:w-2/8"
    },
    {
        key: "masa_pendaftaran",
        label: "Fase",
        className: "hidden md:table-cell w-1/8 text-center"
    },
    {
        key: "pilihan_program",
        label: "Program",
        className: "w-1/3 md:w-1/7 text-center"
    },
    {
        key: "asal_sekolah",
        label: "Asal Sekolah",
        className: "hidden md:table-cell w-1/8"
    },
    {
        key: "pembayaran",
        label: "Pembayaran",
        className: "hidden md:table-cell w-1/8 text-center"
    },
    {
        key: "metode_pembayaran",
        label: "Metode",
        className: "hidden text-center md:table-cell w-1/8"
    },
    // {
    //     key: "alamat",
    //     label: "Alamat",
    //     className: "hidden md:table-cell w-1/6 px-2"
    // },
    {
        key: "aksi",
        label: "Aksi",
        className: "text-center w-1/3 md:w-1/8"
    },
]

const pembayaran = true


const NewStudentsTable = ({ data, pageData, filter, loading }: { data: any[], pageData: DataCount, filter: (value: string) => void, loading: boolean }) => {

    const [id, setId] = useState("")

    const [detail, setDetail] = useState(false)

    const handleDetailFalse = () => {
        setDetail(false)
    }

    const renderNewStudent = (item: newStudent) => (
        <tr key={item.id} className="text-xs border-b border-separate border-spacing-10 border-slate-200 even:bg-white odd:bg-slate-50 hover:bg-[#d3bae6] hover:text-white px-20">
            <td className="flex items-center gap-2 p-2 min-w-0 ">
                <Image src={item.foto_kecil ? item.foto_kecil : `https://avatar.iran.liara.run/public/${item.jenis_kelamin === "Perempuan" ? "girl" : "boy"}`} alt="" width={30} height={25} className="rounded-full object-cover " />
                <div className="flex flex-col min-w-0">
                    <span className="font-semibold whitespace-nowrap truncate">{item.nama_lengkap}</span>
                    <span className="hidden md:block text-[10px] whitespace-nowrap truncate">{item.email === "" ? "-" : item.email}</span>
                </div>
            </td>
            <td className='hidden md:table-cell max-w-0 whitespace-nowrap truncate text-center'>
                Gelombang 1
            </td>
            <td className='text-center'>
                {item.pilihan_program}
            </td>
            <td className="hidden md:table-cell w-1/12 max-w-0 whitespace-nowrap truncate">{item.asal_sekolah}</td>
            <td className="hidden md:table-cell max-w-0 whitespace-nowrap truncate text-center">{pembayaran ? <p className='font-semibold text-green-500 rounded-full w-20 mx-auto bg-white p-1'>Lunas</p> : <p className='font-semibold text-yellow-500'>Belum Lunas</p>}</td>
            {/* <td className="hidden md:table-cell max-w-0 whitespace-nowrap truncate px-2">{item.alamat_lengkap}</td> */}
            <td className="hidden md:table-cell w-1/12 max-w-0 whitespace-nowrap truncate text-center">Tunai</td>
            <td className="">
                <div className="flex items-center justify-center gap-3">
                    <abbr title="Detail" onClick={(e : React.MouseEvent<HTMLButtonElement>) => { 
                        setDetail(true),
                        setId(e.currentTarget.id) }} id={item.id} className="bg-accent rounded-full hover:bg-primary cursor-pointer"><TbListDetails size={22} className="p-1 rounded-full text-white" /></abbr>
                    {role === "admin" && <abbr title="Hapus" className="cursor-pointer bg-red-300 rounded-full hover:bg-red-400"><MdOutlineDelete size={22} className="p-1 rounded-full text-white" /></abbr>}
                </div>
            </td>
        </tr>
    )

    const renderResult = () => {
        if (loading) {
            return <div className='font-semobild text-black text-center text-sm py-3'>Loading...</div>
        } else if (pageData.dataLength === 0) {
            return <div className='bg-background text-sm font-semibold text-center py-2'>Data tidak ditemukan</div>
        }
        return <TableList key="student" columns={columns} renderRow={renderNewStudent} data={data} />


    }

    return (
        <div className='relative z-0'>
            <div className="border border-t-0 rounded-md rounded-tl-none bg-white border-slate-300 ">
                <div className='h-1 w-full bg-third rounded-tr-md'></div>

                <div className="w-full flex justify-between items-center bg-transparent">
                    <div className="w-80 px-3">
                        <Search filter={filter} />
                    </div>
                    <div className="flex justify-end items-center gap-3 py-3 px-2 md:px-5 ">
                        <span className="flex items-center justify-center md:justify-end gap-2 bg-primary font-bold py-2 px-2 rounded-full md:rounded-md text-white cursor-pointer"><VscSettings /></span>
                    </div>
                </div>

                {renderResult()}
                {detail && <NewStudentDetail handleDetail={handleDetailFalse} id={id} detail={detail}/>}
            </div>

            <div>
                <Pagination dataCount={pageData} />
            </div>
        </div>
    )
}

export default NewStudentsTable