'use client'
import React from "react";
import { RiNotificationBadgeFill, RiMessage2Fill, RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import avatar from '@/assets/images/placeholder/avatar.svg';
import Image from "next/image";
import Search from "./search-bar";
import { useState, useEffect } from 'react'

interface NavbarProps {
  user: {role: string, nama_lengkap: string};
  timezone?: string;
}



const Navbar = ({ user, timezone = Intl.DateTimeFormat().resolvedOptions().timeZone }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const date = new Date()
  const [now, setNow] = useState(() => new Date())
  const [is24h, setIs24h] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])


  // Formatters (pakai literal type sesuai TypeScript)
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: !is24h,
    timeZone: timezone,
  }


  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: timezone,
  }


  const timeString = new Intl.DateTimeFormat("id-ID", timeOptions).format(now)
  const dateString = new Intl.DateTimeFormat("id-ID", dateOptions).format(now)
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-2 px-5 bg-white sticky top-0 z-50 box-border h-[8vh]">
      <div className="">
        <div className="hidden lg:block">
          <div className="text-xs text-slate-500 dark:text-slate-300">Zona: <span className="font-medium">{timezone}</span></div>
        </div>


        <div className="flex flex-col lg:flex-row items-baseline justify-start gap-0 lg:gap-4">
          <div className="font-mono font-bold text-slate-900 tracking-tight">{timeString}</div>
          <div className="flex flex-col text-xs md:text-sm text-slate-500 dark:text-slate-300">
            {/* <button
              className="mb-2 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              onClick={() => setIs24h((s) => !s)}
            >
              Toggle {is24h ? '24h' : '12h'}
            </button> */}
            <div className="text-nowrap">{dateString}</div>
          </div>
        </div>

      </div>
      <div className="flex items-center justify-end gap-3 lg:gap-8 w-full md:w-1/2">
        {/* Notification */}
        <div className="text-primary flex items-center gap-2 text-2xl">
          <span>
            <RiNotificationBadgeFill size={20} className="xl:w-6 xl:h-6" />
          </span>
          <span>
            <RiMessage2Fill size={20} className="xl:w-6 xl:h-6" />
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Image
            src={avatar}
            alt="avatar"
            className="h-8 w-8 rounded-full object-fill bg-amber-300"
          />
          <div className="hidden md:block">
            <p className="text-xs lg:text-sm font-medium text-text text-nowrap">{user.nama_lengkap}</p>
            <p className="text-xs text-gray-500">{user.role[0]}</p>
          </div>
          <div
            className="relative"
            onMouseLeave={() => setOpen(false)}
          >
            <button
              type="button"
              className="flex items-center text-text focus:outline-none cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={open}
            >
              {open ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
            </button>
            {open && (
              <div
                className="absolute right-0 w-44 rounded bg-white bg-opacity-30 border-accent border border-b-4 shadow-lg shadow-gray-300/50 backdrop-blur-md z-10"
                style={{
                  boxShadow: "0 8px 16px -8px rgba(128,128,128,0.25)",
                  borderBottom: "3px solid #B7A5DB",
                }}

              >
                <ul className="py-2">
                  <li>
                    <button className="w-full px-4 py-2 text-left text-sm rounded-full  hover:text-accent duration-100 ease-in-out">Profile</button>
                  </li>
                  <li>
                    <button className="w-full px-4 py-2 text-left text-sm rounded-full hover:text-accent duration-100 ease-in-out">Settings</button>
                  </li>
                  <li>
                    <button className="w-full px-4 py-2 text-left text-sm rounded-full  hover:text-red-300 text-red-400 duration-100 ease-in-out">Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
