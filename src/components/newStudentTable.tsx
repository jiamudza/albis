'use client'
import React, { useState } from 'react'
import Search from './search-bar'
import TableList from './table'
import { newStudent, role } from '@/lib/data'
import Image from 'next/image'
import Pagination from './pagination'
import { TbListDetails } from 'react-icons/tb'
import { MdOutlineDelete } from 'react-icons/md'
import { VscSettings } from 'react-icons/vsc'
import NewStudentDetail from './newStudentDetail'

type DataCount = {
  page: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  dataLength: number
}

const columns = [
  { key: 'calon_siswa', label: 'Nama', className: 'py-2 px-4 w-1/3 md:w-2/8' },
  { key: 'masa_pendaftaran', label: 'Fase', className: 'hidden md:table-cell w-1/8 text-center' },
  { key: 'pilihan_program', label: 'Program', className: 'w-1/3 md:w-1/7 text-center' },
  { key: 'asal_sekolah', label: 'Asal Sekolah', className: 'hidden md:table-cell w-1/8' },
  { key: 'pembayaran', label: 'Pembayaran', className: 'hidden md:table-cell w-1/8 text-center' },
  { key: 'metode_pembayaran', label: 'Metode', className: 'hidden text-center md:table-cell w-1/8' },
  { key: 'aksi', label: 'Aksi', className: 'text-center w-1/3 md:w-1/8' },
]

const NewStudentsTable = ({
  data,
  pageData,
  filter,
  loading,
  onPageChange, // ✅ tambahkan prop
}: {
  data: any[]
  pageData: DataCount
  filter: (value: string) => void
  loading: boolean
  onPageChange: (page: number) => void
}) => {
  const [id, setId] = useState<string>('')
  const [detail, setDetail] = useState(false)

  const handleDetailFalse = () => setDetail(false)
  const handleShowDetail = (id: string) => {
    setId(id)
    setDetail(true)
  }

  console.log(data)

  const renderNewStudent = (item: newStudent) => (
    <tr
      key={item.id}
      className="text-xs border-b border-separate border-spacing-10 border-slate-200 even:bg-white odd:bg-slate-50 hover:bg-[#d3bae6] hover:text-white px-20"
    >
      <td className="flex items-center gap-2 p-2 min-w-0">
        <Image
          src={
            item.foto_kecil
              ? item.foto_kecil
              : `https://avatar.iran.liara.run/public/${item.jenis_kelamin === 'Perempuan' ? 'girl' : 'boy'}`
          }
          alt="avatar"
          width={30}
          height={25}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col min-w-0">
          <span className="font-semibold whitespace-nowrap truncate">{item.nama_lengkap}</span>
          <span className="hidden md:block text-[10px] whitespace-nowrap truncate">
            {item.email === '' ? '-' : item.email}
          </span>
        </div>
      </td>

      <td className="hidden md:table-cell text-center">{item.fase || '-'}</td>
      <td className="text-center">{item.pilihan_program || '-'}</td>
      <td className="hidden md:table-cell truncate">{item.asal_sekolah || '-'}</td>
      <td className="hidden md:table-cell text-center">{item.status_pembayaran || '-'}</td>
      <td className="hidden md:table-cell text-center">{item.metode_bayar || '-'}</td>

      <td className="">
        <div className="flex items-center justify-center gap-3">
          <abbr
            title="Detail"
            className="bg-accent rounded-full hover:bg-primary cursor-pointer"
            onClick={() => handleShowDetail(item.id)}
          >
            <TbListDetails size={22} className="p-1 rounded-full text-white" />
          </abbr>
          {role === 'admin' && (
            <abbr title="Hapus" className="cursor-pointer bg-red-300 rounded-full hover:bg-red-400">
              <MdOutlineDelete size={22} className="p-1 rounded-full text-white" />
            </abbr>
          )}
        </div>
      </td>
    </tr>
  )

  const renderResult = () => {
    if (loading) return <div className="font-semibold text-black text-center text-sm py-3">Loading...</div>
    if (pageData.dataLength === 0)
      return <div className="bg-background text-sm font-semibold text-center py-2">Data tidak ditemukan</div>

    return <TableList key="student" columns={columns} renderRow={renderNewStudent} data={data} />
  }

  return (
    <div className="relative z-0">
      <div className="border h-full border-t-0 rounded-md rounded-tl-none bg-white border-slate-300">
        <div className="h-1 w-full bg-third rounded-tr-md"></div>

        <div className={`${detail ? 'hidden' : ''} w-full flex justify-between items-center bg-transparent`}>
          <div className="w-80 px-3">
            <Search filter={filter} />
          </div>
          <div className="flex justify-end items-center gap-3 py-3 px-2 md:px-5">
            <span className="flex items-center justify-center md:justify-end gap-2 bg-primary font-bold py-2 px-2 rounded-full md:rounded-md text-white cursor-pointer">
              <VscSettings />
            </span>
          </div>
        </div>

        {!detail && renderResult()}
        {detail && <NewStudentDetail handleDetail={handleDetailFalse} id={id} detail={detail} />}
      </div>

      {!detail && <Pagination dataCount={pageData} onPageChange={onPageChange} />} {/* ✅ kirim prop */}
    </div>
  )
}

export default NewStudentsTable
