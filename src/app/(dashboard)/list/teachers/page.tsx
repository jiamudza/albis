import TableList from "@/components/table";
import React from "react";
import teachers, { role } from "@/lib/data";

type tableBodyType = [
  {
    id: string;
    name: string;
    email: string;
    subjects: string[];
    phone: string;
    action: string;
  }
];

const tableHeadTitle = [
  {
    name: "Teacher Name",
    key: "teacher-name",
  },
  {
    name: "Subjects",
    key: "subjects",
  },
  {
    name: "Email",
    key: "email",
    class: " hidden md:inline"
  },
  {
    name: "Phone",
    key: "phone",
    class: " hidden md:inline"
  },
  {
    name: "Action",
    key: "action",
    class: " hidden"
  },
];

const TeacherList = () => {
  const tableBody = (): React.JSX.Element[] => {
    return teachers.map((item) => (
      <tr key={item.id} className="text-xs hover:bg-[#eadaf5be]">
        <td className="py-2 px-2">{`${item.firstName} ${item.lastName}`}</td>
        <td>{item.subjects.join(", ")}</td>
        <td className="hidden md:inline">{item.email}</td>
        <td className="hidden md:inline">{item.phone}</td>
        <td className="flex items-center align-middle justify-start gap-3">
          <span>details</span>
          {role === "admin" && <span className="cursor-pointer hover:bg-red-300">delete</span>}
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-3 w-full h-[100%] overflow-auto">
      <h3 className="font-semibold text-xl text-primary mb-3">Teachers</h3>
      <TableList tableHead={tableHeadTitle} tableData={tableBody} />
    </div>
  );
};

export default TeacherList;
