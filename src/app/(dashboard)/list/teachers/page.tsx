'use client';
import TableList from "@/components/table";
import React, { useState } from "react";
import { role, Teacher, teachers } from "@/lib/data";
import Link from "next/link";
// import Search from "@/components/search-bar";
import Image from "next/image";
// import Pagination from "@/components/pagination";
import { VscSettings } from "react-icons/vsc";
import { MdOutlineAdd, MdOutlineDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import AddTeacher from "@/components/TeacherList/Add";

const columns = [
  {
    key: "name",
    label: "Guru",
    className: "pl-4"
  },
  {
    key: "id",
    label: "ID Guru",
  },
  {
    key: "subjects",
    label: "Mata Pelajaran",
    className: "hidden md:table-cell"
  },
  {
    key: "classes",
    label: "Jenjang Kelas",
    className: "hidden md:table-cell"
  },
  {
    key: "phone",
    label: "Telepon",
    className: "hidden md:table-cell"
  },
  {
    key: "action",
    label: "Lainnya",
  }
]

const TeacherPage = () => {
  const [add, setAdd] = useState(false);


  const renderRow = (item: Teacher) => (
    <tr key={item.id} className="text-xs border-b border-slate-200 odd:bg-slate-50 hover:bg-[#4b096e65] hover:text-white px-20">
      <td className="w-auto flex items-center gap-2 p-2">
        <Image src={item.avatarUrl ? item.avatarUrl : "https://avatar.iran.liara.run/public"} alt="" width={30} height={25} className="rounded-full object-cover " />
        <div className="flex flex-col">
          <span className="font-semibold">{`${item.firstName} ${item.lastName}`}</span>
          <span className="hidden md:block text-xs text-text">{item.email}</span>
        </div>
      </td>
      <td>
        {item.id}
      </td>
      <td className="hidden md:table-cell">{item.subjects.join(", ")}</td>
      <td className="hidden md:table-cell">{item.classes?.join(", ")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="">
        <div className="flex items-center gap-3">
          <Link href={`/list/teacher/${item.id}`} className="bg-accent rounded-full"><TbListDetails size={22} className="bg-accent p-1 rounded-full text-white" /></Link>
          {role === "admin" && <div className="cursor-pointer"><MdOutlineDelete size={22} className="bg-red-400 p-1 rounded-full text-white" /></div>}
        </div>
      </td>
    </tr>
  )

  const handleAddTeacher = () => {
    setAdd(!add);
  }

  return (
    <div className={`${!add ? 'px-3 py-2 relative': 'p-0'}`}>
      {add === false && <h3 className="font-bold text-lg text-primary mb-1">Data Guru</h3>}
      <div className={`${add ? "hidden" : "block"} border rounded-md border-slate-300`}>
        <div className="w-full flex justify-between items-center bg-transparent">
          <div className="w-80 px-3">
            {/* <Search /> */}
          </div>
          <div className="flex justify-end items-center py-3 gap-3 px-2 md:px-5 ">
            <span className="flex items-center justify-center md:justify-end gap-2 rounded-full bg-primary font-bold py-2 px-2 md:rounded-md text-white cursor-pointer"><VscSettings /></span>
            <div
              onClick={() => {
                setAdd(true)
              }}
              className="flex items-center justify-center md:justify-end gap-2 rounded-full bg-primary font-bold py-2 px-2 md:rounded-md text-white cursor-pointer hover:bg-white hover:text-purple-800">
              <span><MdOutlineAdd /></span>
              <div

                className="hidden md:block text-xs">Tambah Guru</div>
            </div>
          </div>
        </div>
        <TableList key="teacher" columns={columns} renderRow={renderRow} data={teachers} /></div>
      {/* <div>
        <Pagination dataLength={teachers.length} />
      </div> */}
      {add === true && <AddTeacher add={add} handleAdd={handleAddTeacher} />}
    </div>
  );
};

export default TeacherPage;
