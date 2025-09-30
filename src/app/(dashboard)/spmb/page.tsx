import NewStudentsChart from '@/components/newStudentChart'
import TableList from '@/components/table'
import { newStudent, role } from '@/lib/data'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineAdd, MdOutlineDelete } from 'react-icons/md'
import { TbListDetails } from 'react-icons/tb'
import { useNewStudent } from '@/lib/dataFetch'
import { VscSettings } from 'react-icons/vsc'
import Search from '@/components/search-bar'
import Pagination from '@/components/pagination'

const columns = [
    {
        key: "calon_siswa",
        label: "Nama",
        className: "py-2 px-4 w-2/4 md:w-2/6"
    },
    {
        key: "pilihan_program",
        label: "Program",
        className: "w-1/4 md:w-1/6"
    },
    {
        key: "asal_sekolah",
        label: "Asal Sekolah",
        className: "hidden md:table-cell w-1/6"
    },
    // {
    //     key: "alamat",
    //     label: "Alamat",
    //     className: "hidden md:table-cell w-1/6 px-2"
    // },
    {
        key: "aksi",
        label: "Aksi",
        className: "text-center w-1/4 md:w-1/6"
    },
]

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

    const { data, error, isLoading, hasNextPage, hasPrevPage, page, total, totalPages, limit } = await useNewStudent()

    console.log(total)

    const pageData = {
        page,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage,
        limit,
        dataLength: data.length
    }

    const renderNewStudent = (item: newStudent) => (
        <tr key={item.id} className="text-xs border-b border-separate border-spacing-10 border-slate-200 even:bg-white odd:bg-slate-50 hover:bg-accent hover:text-white px-20">
            <td className="flex items-center gap-2 p-2 min-w-0 ">
                <Image src={item.foto_kecil ? item.foto_kecil : `https://avatar.iran.liara.run/public/${item.jenis_kelamin === "Perempuan" ? "girl" : "boy"}`} alt="" width={30} height={25} className="rounded-full object-cover " />
                <div className="flex flex-col min-w-0">
                    <span className="font-semibold whitespace-nowrap truncate">{item.nama_lengkap}</span>
                    <span className="hidden md:block text-[10px] whitespace-nowrap truncate">{item.email === "" ? "-" : item.email}</span>
                </div>
            </td>
            <td className=''>
                {item.pilihan_program}
            </td>
            <td className="hidden md:table-cell max-w-0 whitespace-nowrap truncate">{item.asal_sekolah}</td>
            {/* <td className="hidden md:table-cell max-w-0 whitespace-nowrap truncate px-2">{item.alamat_lengkap}</td> */}
            <td className="">
                <div className="flex items-center justify-center gap-3">
                    <abbr title="Detail" className="bg-accent rounded-full hover:bg-primary"><Link href={`/list/teacher/${item.id}`} className="bg-accent rounded-full hover:bg-primary"><TbListDetails size={22} className="p-1 rounded-full text-white" /></Link></abbr>
                    {role === "admin" && <abbr title="Hapus" className="cursor-pointer bg-red-300 rounded-full hover:bg-red-400"><MdOutlineDelete size={22} className="p-1 rounded-full text-white" /></abbr>}
                </div>
            </td>
        </tr>
    )

    return (
        <div className=''>

            <div className='flex flex-col lg:flex-row'>
                {/* left */}
                <div className='flex-2/3 p-3' >
                    <h3 className='font-bold text-lg text-primary'>Sistem Penerimaan Murid Baru (SPMB)</h3>
                    <div className='flex mt-2'>

                        {tab.map(t => (
                            <div key={t.key} className={`${t.className} cursor-pointer text-center`}>
                                <p>{t.Label}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border rounded-md rounded-tl-none bg-white border-slate-300">
                        <div className="w-full flex justify-between items-center bg-transparent">
                            <div className="w-80 px-3">
                                <Search />
                            </div>
                            <div className="flex justify-end items-center gap-3 py-3 px-2 md:px-5 ">
                                <span className="flex items-center justify-center md:justify-end gap-2 bg-primary font-bold py-2 px-2 rounded-full md:rounded-md text-white cursor-pointer"><VscSettings /></span>
                            </div>
                        </div>
                        <TableList key="student" columns={columns} renderRow={renderNewStudent} data={data} />

                    </div>
                    <div>
                        <Pagination dataCount={pageData} />
                    </div>


                </div>
                {/* right */}
                {/* <div className='flex-1/3 h-[92vh] bg-white shadow-xl'>
                    <NewStudentsChart />
                </div> */}
            </div>
        </div>
    )
}

export default SPMB