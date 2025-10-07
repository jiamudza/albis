'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../public/logo.png";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

// icon imports
import {
  RiHome5Fill, RiQrCodeFill, RiCalendarScheduleFill, RiFileList2Fill, RiLogoutBoxFill, RiMessage2Fill, RiAdminFill
} from "react-icons/ri";
import { HiUser, HiUserGroup } from "react-icons/hi2";
import { BsFillGearFill } from "react-icons/bs";
import { FaMoneyBill, FaPeopleRoof } from "react-icons/fa6";
import { MdInventory, MdMeetingRoom, MdAssignment } from "react-icons/md";
import { IoIosMegaphone } from "react-icons/io";

interface MenuProps {
  user: { role: string[] }; // ambil minimal role
}

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: <RiHome5Fill />, label: "Dashboard", href: "/admin" },
      { icon: <HiUser />, label: "Guru", href: "/list/teachers" },
      { icon: <HiUserGroup />, label: "Siswa", href: "/list/students" },
      { icon: <FaPeopleRoof />, label: "Wali", href: "/list/parents" },
      { icon: <MdMeetingRoom />, label: "Kelas", href: "/classes" },
      { icon: <MdAssignment />, label: "SPMB", href: "/spmb" },
      { icon: <RiFileList2Fill />, label: "Kehadiran", href: "/attendance" },
      { icon: <FaMoneyBill />, label: "Keuangan", href: "/finance" },
      { icon: <MdInventory />, label: "Inventaris", href: "/inventory" },
      { icon: <RiCalendarScheduleFill />, label: "Agenda", href: "/events" },
      { icon: <IoIosMegaphone />, label: "Pengumuman", href: "/announcements" },
      { icon: <RiAdminFill />, label: "Master", href: "/master" },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: <BsFillGearFill />, label: "Pengaturan", href: "/settings" },
      { icon: <RiLogoutBoxFill />, label: "Logout", href: "/logout" }, // nanti kita ganti logic
    ],
  },
];

const hiddenItemsByRole: Record<string, string[]> = {
  guru: ["Keuangan", "Inventaris", "Master"],
  siswa: ["Guru", "Keuangan", "Inventaris", "Wali", "SPMB", "Master"],
  wali: ["Siswa", "Keuangan", "Inventaris", "SPMB", "Master"],
  spmb: ["Keuangan", "Inventaris", "Master"]
};


const Menu = ({ user }: MenuProps) => {
  
  const pathname = usePathname();
  const router = useRouter();
  const [sideBar, setSideBar] = useState(false);
  // const { user, setUser } = useAuth();
  const userRole = user?.role || [];

  const handleLogout = async () => {
    try {
      // panggil endpoint logout di server
      await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });

      // hapus user dari context
      // setUser(null);

      // redirect ke login
      router.push("/login");
    } catch (err: any) {
      console.error("Logout gagal:", err.response?.data || err);
      // tetap hapus user dari context agar UI clear
      // setUser(null);
      router.push("/login");
    }
  };


  return (
    <div
      className="w-full h-full align-middle text-xs text-text text-center overflow-y-auto"
      onMouseOver={() => setSideBar(true)}
      onMouseLeave={() => setSideBar(false)}
    >
      <Link href="/" className="flex items-center justify-center gap-1 h-15 py-2">
        <Image src={logo} alt="Logo" width={30} height={30} />
        <span className={(sideBar ? "hidden lg:block text-lg font-bold text-primary" : "hidden") + " transition-all ease-in-out duration-200 text-left leading-tight"}>
          <p className="text-outline text-white">Albis</p>
          <p className="text-[5px]">(Al Banna Integrated System)</p>
        </span>
      </Link>

      {menuItems.map(group => (
        <div key={group.title}>
          <span className="hidden md:block text-xs font-base text-center py-1 tracking-widest text-placeholder">
            {group.title}
          </span>

          {group.items.map(item => {
            // cek role, sembunyikan menu jika user role ada di hiddenItemsByRole
            if (
              Array.isArray(userRole) &&
              !userRole.includes("admin") && // admin selalu bisa lihat semua menu
              userRole.some(role => hiddenItemsByRole[role]?.includes(item.label))
            ) {
              return null;
            }


            // logout pakai onClick
            if (item.label === "Logout") {
              return (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className={
                    (sideBar ? "lg:justify-start items-center lg:h-7 xl:h-8" : "justify-center items-center lg:h-7 xl:h-8") +
                    " text-xs xl:text-xs flex justify-center lg:gap-4 text-center py-2 xl:px-2 transition-all ease-in-out duration-200 hover:bg-[#ecebc391] w-full"
                  }
                >
                  <span className={(sideBar ? "lg:px-[0.689rem] " : "") + "text-lg md:text-lg lg:text-xs xl:text-[15px] text-center transition-none"}>
                    {item.icon}
                  </span>
                  <span className={sideBar ? "hidden lg:block lg:text-xs font-semibold" : "hidden"}>
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={
                  (sideBar ? "lg:justify-start items-center lg:h-7 xl:h-8" : "justify-center items-center lg:h-7 xl:h-8") +
                  " text-xs xl:text-xs flex justify-center lg:gap-4 text-center py-2 xl:px-2 transition-all ease-in-out duration-200 " +
                  (pathname === item.href ? "text-purple-800 bg-third border-r-3 border-purple-800" : "hover:bg-[#ecebc391]")
                }
              >
                <span className={(sideBar ? "lg:px-[0.689rem] " : "") + "text-lg md:text-lg lg:text-xs xl:text-[15px] text-center transition-none"}>
                  {item.icon}
                </span>
                <span className={sideBar ? "hidden lg:block lg:text-xs font-semibold" : "hidden"}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
