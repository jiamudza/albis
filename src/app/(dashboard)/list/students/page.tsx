import TableList from "@/components/table";
import React from "react";
import { role, Student, studentsList } from "@/lib/data";
import Link from "next/link";
// import Search from "@/components/search-bar";
import Image from "next/image";
// import Pagination from "@/components/pagination";
import { VscSettings, VscAdd } from "react-icons/vsc";
import { MdOutlineAdd, MdOutlineDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";


const columns = [
  {
    key: "nama_siswa",
    label: "Siswa",
    className: 'py-2 px-4'
  },
  {
    key: "nis_siswa",
    label: "NIS"
  },
  {
    key: "email_siswa",
    label: "Email",
    className: "hidden md:table-cell"
  },
  {
    key: "telepon_siswa",
    label: "Telepon",
    className: "hidden md:table-cell"
  },
  {
    key: "alamat_siswa",
    label: "Alamat",
    className: "hidden md:table-cell"
  },
  {
    key: "action_siswa",
    label: "Lainnya"
  }
]

const StudentPage = () => {

  const renderStudent = (item: Student) => (
    <tr key={item.nis} className="text-xs border-b border-slate-200 even:bg-white odd:bg-slate-50 hover:bg-accent hover:text-white px-20">
      <td className="flex items-center gap-2 p-2">
        <Image src={`https://avatar.iran.liara.run/public/${item.id}`} alt="" width={30} height={25} className="rounded-full object-cover " />
        <div className="flex flex-col">
          <span className="font-semibold">{item.nama}</span>
          <span className="hidden md:block text-xs text-text">{item.email}</span>
        </div>
      </td>
      <td>
        {item.nis}
      </td>
      <td className="hidden md:table-cell">{item.email}</td>
      <td className="hidden md:table-cell">{item.telepon}</td>
      <td className="hidden md:table-cell">{item.alamat}</td>
      <td className="">
        <div className="flex items-center gap-3">
          <abbr title="Detail" className="bg-accent rounded-full hover:bg-primary"><Link href={`/list/teacher/${item.id}`} className="bg-accent rounded-full hover:bg-primary"><TbListDetails size={22} className="p-1 rounded-full text-white" /></Link></abbr>
          {role === "admin" && <abbr title="Hapus" className="cursor-pointer bg-red-300 rounded-full hover:bg-red-400"><MdOutlineDelete size={22} className="p-1 rounded-full text-white" /></abbr>}
        </div>
      </td>
    </tr>
  )

  return (
    <div className="px-3 py-2 overflow-auto">
      <h3 className="font-bold text-lg text-primary mb-1">Data Siswa</h3>
      <div className="border rounded-md bg-white border-slate-300">
        <div className="w-full flex justify-between items-center bg-transparent">
          <div className="w-80 px-3">
            {/* <Search /> */}
          </div>
          <div className="flex justify-end items-center gap-3 py-3 px-2 md:px-5 ">
            <span className="flex items-center justify-center md:justify-end gap-2 bg-primary font-bold py-2 px-2 rounded-full md:rounded-md text-white cursor-pointer"><VscSettings /></span>
            {role === "admin" && <div className="flex items-center justify-center md:justify-end gap-2 bg-primary font-bold py-2 px-2 rounded-full md:rounded-md text-white cursor-pointer">
              <span><MdOutlineAdd /></span>
              <p className="hidden md:block text-xs">Tambah Siswa</p>
            </div>}
          </div>
        </div>
        <TableList key="student" columns={columns} renderRow={renderStudent} data={studentsList} />
      </div>
      <div>
        {/* <Pagination dataLength={studentsList.length} /> */}
      </div>
    </div>
  );
};

export default StudentPage;
