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
        href: "/teachers",
      },
      {
        icon: <HiUserGroup />,
        label: "Students",
        href: "/students",
      },
      {
        icon: <FaPeopleRoof />,
        label: "Parents",
        href: "/parents",
      },
      {
        icon: <MdMeetingRoom />,
        label: "Classes",
        href: "/classes",
      },
      {
        icon: <MdClass />,
        label: "lessons",
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
        label: "Announcements",
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

const Menu = () => {
  const pathname = usePathname();

  const [sideBar, setSideBar] = useState(false);

  return (
    <div
      className="w-full h-full align-middle text-xs text-text text-center transition ease-in-out duration-300"
      onMouseOver={() => {
        setSideBar(true);
      }}
      onMouseLeave={() => {
        setSideBar(false);
      }}
    >
      <Link href="/" className="flex items-center justify-center">
        <span className="text-xl font-bold p-4 text-primary">Albis</span>
      </Link>
      <div
        className=""
      >
        {menuItems.map((i) => (
          <div className="" key={i.title}>
            <span className="hidden md:block text-xs font-base text-center mb-1 tracking-widest text-placeholder">
              {i.title}
            </span>
            {i.items.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className={
                  ((sideBar
                    ? ` lg:justify-start items-center h-8 `
                    : " justify-center items-center h-8 ") + " text-xs xl:text-xs flex justify-center lg:gap-6 text-center py-2 xl:px-2 ") +
                  (pathname === item.href
                    ? "text-purple-800 bg-third border-r-3 border-purple-800"
                    : "hover:bg-[#f2e8f591]")
                }
              >
                <span className="text-lg md:text-lg lg:text-sm xl:text-[15px] text-center">
                  {item.icon}
                </span>
                <span className={sideBar ? "hidden lg:block lg:text-sm" : "hidden"}>
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
