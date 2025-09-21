import TableList from "@/components/table";
import React from "react";
import { role, Parent, parentsList } from "@/lib/data";
import Link from "next/link";
import Search from "@/components/search-bar";
import Image from "next/image";
import Pagination from "@/components/pagination";
import { VscSettings, VscAdd } from "react-icons/vsc";
import { MdOutlineAdd, MdOutlineDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";


const columns = [
  {
    key: "nama_wali",
    label: "Wali",
    className: 'py-2 px-2'
  },
  {
    key: "anak",
    label: "Anak"
  },
  {
    key: "email_wali",
    label: "Email",
    className: "hidden md:table-cell"
  },
  {
    key: "telepon_wali",
    label: "Telepon",
    className: "hidden md:table-cell"
  },
  {
    key: "alamat_wali",
    label: "Alamat",
    className: "hidden md:table-cell"
  },
  {
    key: "action_siswa",
    label: "Lainnya"
  }
]

const ParentsPage = () => {
  console.log(parentsList)

  const renderParent = (item: Parent) => (
    <tr key={item.id} className="text-xs border-b border-slate-200 even:bg-slate-50 hover:bg-accent hover:text-white px-20">
      <td className="flex items-center gap-2 p-2">
        <div className="flex flex-col">
          <span className="font-semibold">{item.nama}</span>
          <span className="hidden md:block text-xs text-text">{item.email}</span>
        </div>
      </td>
      <td>
        {item.anak.join(", ")}
      </td>
      <td className="hidden md:table-cell">{item.email}</td>
      <td className="hidden md:table-cell">{item.telepon}</td>
      <td className="hidden md:table-cell">{item.alamat}</td>
      <td className="">
        <div className="flex items-center gap-3">
          <Link href={`/list/teacher/${item.id}`} className="bg-accent rounded-full hover:bg-primary"><TbListDetails size={22} className="p-1 rounded-full text-white" /></Link>
          {role === "admin" && <div className="cursor-pointer bg-red-300 rounded-full hover:bg-red-400"><MdOutlineDelete size={22} className="p-1 rounded-full text-white" /></div>}
        </div>
      </td>
    </tr>
  )

  return (
    <div className="px-3 py-2 overflow-x-hidden overflow-y-auto min-h-screen">
      <h3 className="font-bold text-lg text-primary mb-1">Data Wali Siswa</h3>
      <div className="border rounded-md border-slate-300">
        <div className="w-full flex justify-between items-center bg-transparent">
          <div className="w-80 px-3">
            <Search />
          </div>
          <div className="flex justify-end items-center gap-3 py-3 px-2 md:px-5 ">
            <span className="flex items-center justify-center md:justify-end gap-2 bg-primary font-bold py-2 px-2 rounded-full md:rounded-md text-white cursor-pointer"><VscSettings /></span>
            {role === "admin" && <div className="flex items-center justify-center md:justify-end gap-2 bg-primary font-bold py-2 px-2 rounded-full md:rounded-md text-white cursor-pointer">
              <span><MdOutlineAdd /></span>
              <p className="hidden md:block text-xs">Tambah Wali</p>
            </div>}
          </div>
        </div>
        <TableList key="parent" columns={columns} renderRow={renderParent} data={parentsList} />
      </div>
      <div>
        <Pagination key="parent" dataLength={parentsList.length} />
      </div>
    </div>
  );
};

export default ParentsPage;
