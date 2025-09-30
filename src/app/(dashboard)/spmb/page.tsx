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



const SPMB = async () => {

    const { data, error, isLoading } = await useNewStudent()

    const renderNewStudent = (item: newStudent) => (
        <tr key={item.id} className="text-xs border-b border-separate border-spacing-10 border-slate-200 even:bg-white odd:bg-slate-50 hover:bg-accent hover:text-white px-20">
            <td className="flex items-center gap-2 p-2 min-w-0 ">
                <Image src={item.foto_kecil ? item.foto_kecil : `https://avatar.iran.liara.run/public/${item.jenis_kelamin === "Perempuan" ? "girl" : "boy" }`} alt="" width={30} height={25} className="rounded-full object-cover " />
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
                    <h3 className='font-bold text-lg text-primary'>SPMB</h3>
                    <div className="border rounded-md bg-white border-slate-300">
                        <div className="w-full flex justify-between items-center bg-transparent">
                            <div className="w-80 px-3">
                                <Search />
                            </div>
                            <div className="flex justify-end items-center gap-3 py-3 px-2 md:px-5 ">
                                <span className="flex items-center justify-center md:justify-end gap-2 bg-primary font-bold py-2 px-2 rounded-full md:rounded-md text-white cursor-pointer"><VscSettings /></span>
                                {/* {role === "admin" && <div className="flex items-center justify-center md:justify-end gap-2 bg-primary font-bold py-2 px-2 rounded-full md:rounded-md text-white cursor-pointer">
              <span><MdOutlineAdd /></span>
              <p className="hidden md:block text-xs">Tambah Siswa</p>
            </div>} */}
                            </div>
                        </div>
                        <TableList key="student" columns={columns} renderRow={renderNewStudent} data={data} />
                        
                    </div>
                    <div>
                    <Pagination dataLength={data.length} />
                </div>


                </div>
                {/* right */}
                <div className='flex-1/3 bg-white'>
                    <NewStudentsChart />
                </div>
            </div>
        </div>
    )
}

export default SPMB