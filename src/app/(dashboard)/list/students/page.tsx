"use server"
import TableList from "@/components/table";
import React from "react";
import studentsList, { role, Student } from "@/lib/data";
import Link from "next/link";
import Search from "@/components/search-bar";
import Image from "next/image";
import Pagination from "@/components/pagination";
import { VscSettings, VscAdd } from "react-icons/vsc";
import { MdOutlineAdd } from "react-icons/md";

const columns = [
  {
    key: "name",
    label: "Siswa",
    className: 'py-2'
  },
  {
    key: "nis",
    label: "NIS"
  },
  {
    key: "email",
    label: "Email",
    className: "hidden md:table-cell"
  },
  {
    key: "telepon",
    label: "Telepon",
    className: "hidden md:table-cell"
  },
  {
    key: "alamat",
    label: "Alamat",
    className: "hidden md:table-cell"
  },
  {
    key: "action",
    label: "Action"
  }
]

const StudentPage = () => {

  const renderStudent = (item:Student) => (
    <tr key={item.nis} className="text-xs border-b border-slate-200 even:bg-slate-50 hover:bg-[#f6ebfa] hover:text-white px-20">
      <td className="flex items-center gap-2 p-2">
        <Image src="https://avatar.iran.liara.run/public" alt="" width={30} height={25} className="rounded-full object-cover " />
        <div className="flex">
          <span>{item.nama}</span>
          <span className="text-xs">{item.email}</span>
        </div>
      </td>
      <td>
        {item.nis}
      </td>
      <td className="hidden md:table-cell">{item.alamat}</td>
      <td className="flex justify-items-center items-center gap-2">
        <div className="flex justify-baseline items-center h-5 gap-2 my-auto -mt-4" >
          <Link href={`/list/students/${item.id}`} className="bg-accent text-white p-1 rounded-md align-middle
        ">
            <div className="flex justify-center items-center align-middle">detail</div>
          </Link>
          {role === "teacher" && <span className="bg-red-300 text-white p-1 rounded-md flex flex-col justify-center items-center">delete</span>}
        </div>
      </td>
    </tr>
  )

  return (
    <div className="p-3 w-full h-full overflow-auto">
      <h3 className="font-semibold text-xl text-primary mb-3">Students</h3>
      <div className="w-full mb-3 flex justify-between">
        <div className="w-80">
          <Search />
        </div>
        <div className="flex justify-start items-center gap-3 px-10 ">
          <span className="h-8 w-8 text-white bg-primary rounded-full flex items-center justify-center"><VscSettings size={23} /></span>
          {role === "admin" && <div className="flex items-center gap-2 bg-primary font-bold py-2 px-2 rounded-md text-white cursor-pointer">
            <span><MdOutlineAdd /></span>
            <p className="text-xs">Tambah Siswa</p>
          </div>}
        </div>
      </div>
      <TableList columns={columns} renderRow={renderStudent} data={studentsList} />
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default StudentPage;
