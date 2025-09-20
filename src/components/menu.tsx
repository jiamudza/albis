"use client";
import React from "react";
import {
  RiHome5Fill,
  RiQrCodeFill,
  RiCalendarScheduleFill,
  RiFileList2Fill,
  RiLogoutBoxFill,
  RiMessage2Fill,
} from "react-icons/ri";
import { HiUser, HiUserGroup } from "react-icons/hi2";
import { BsFillGearFill } from "react-icons/bs";
import { FaMoneyBill, FaPeopleRoof } from "react-icons/fa6";
import {
  MdInventory,
  MdMeetingRoom,
  MdClass,
  MdAssignment,
} from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
import { HiSpeakerphone } from "react-icons/hi";
import { IoIosMegaphone } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png"
import { IconType } from "react-icons"

type MenuType = {
  title: string,
  items: [
    icon: IconType,
    label: string,
    href: string
  ]
}

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <RiHome5Fill />,
        label: "Home",
        href: "/admin",
      },
      {
        icon: <HiUser />,
        label: "Teachers",
        href: "/list/teachers",
      },
      {
        icon: <HiUserGroup />,
        label: "Students",
        href: "/list/students",
      },
      {
        icon: <FaPeopleRoof />,
        label: "Parents",
        href: "/list/parents",
      },
      {
        icon: <MdMeetingRoom />,
        label: "Classes",
        href: "/classes",
      },
      {
        icon: <MdClass />,
        label: "Lessons",
        href: "/lessons",
      },
      {
        icon: <PiExamFill />,
        label: "Exams",
        href: "/exams",
      },
      {
        icon: <MdAssignment />,
        label: "Assignments",
        href: "/assignments",
      },
      {
        icon: <RiFileList2Fill />,
        label: "Attendance",
        href: "/attendance",
      },
      {
        icon: <FaMoneyBill />,
        label: "Finance",
        href: "/finance",
      },
      {
        icon: <MdInventory />,
        label: "Inventory",
        href: "/inventory",
      },
      {
        icon: <RiCalendarScheduleFill />,
        label: "Events",
        href: "/events",
      },
      {
        icon: <IoIosMegaphone />,
        label: "Announce",
        href: "/announcements",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <BsFillGearFill />,
        label: "Settings",
        href: "/settings",
      },
      {
        icon: <RiLogoutBoxFill />,
        label: "Logout",
        href: "/logout",
      },
    ],
  },
];
const homeSpecialPaths = ["/admin", "/teacher", "/student", "/parent"]

const Menu = () => {
  const pathname = usePathname();
  const [sideBar, setSideBar] = useState(false);

  return (
    <div
      className="w-full h-full align-middle text-xs text-text text-center overflow-y-auto"
      onMouseOver={() => {
        setSideBar(true);
      }}
      onMouseLeave={() => {
        setSideBar(false);
      }}
    >
      <Link href="/" className="flex items-center justify-center gap-1 h-15 py-2">
        <Image src={logo} alt="" width={30} height={30} />
        <span className={(sideBar ? "hidden lg:block text-lg font-bold text-primary" : "hidden") + " transition-all ease-in-out duration-200 text-left leading-tight"}>
          <p className="text-outline text-white">Albis</p>
          <p className="text-[5px]">(Al Banna Integrated System)</p>
        </span>
      </Link>
      <div className="">
        {menuItems.map((i) => (
          <div className="" key={i.title}>
            <span className="hidden md:block text-xs font-base text-center py-1 tracking-widest text-placeholder">
              {i.title}
            </span>
            {i.items.map((item, i) => (
              <Link
                href={item.href}
                key={item.label}
                className={
                  (sideBar
                    ? ` lg:justify-start items-center lg:h-7 xl:h-8 `
                    : " justify-center items-center lg:h-7 xl:h-8 ") +
                  " text-xs xl:text-xs flex justify-center lg:gap-4 text-center py-2 xl:px-2 transition-all ease-in-out duration-200 " +
                  (pathname === item.href
                    ? "text-purple-800 bg-third border-r-3 border-purple-800"
                    : "hover:bg-[#ecebc391] transition-[hover] ease-in-out duration-75")
                }
              >
                <span
                  className={
                    (sideBar ? "lg:px-[0.689rem] " : "") +
                    "text-lg md:text-lg lg:text-xs xl:text-[15px] text-center transition-none"
                  }
                >
                  {item.icon}
                </span>
                <span
                  className={sideBar ? "hidden lg:block lg:text-xs" : "hidden"}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
