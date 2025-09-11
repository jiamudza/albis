'use client'
import React from "react";
import { RiNotificationBadgeFill, RiMessage2Fill, RiArrowDownWideLine, RiArrowUpWideLine } from "react-icons/ri";
import avatar from '@/assets/images/placeholder/avatar.svg';
import Image from "next/image";
import Search from "./search-bar";
import {useState} from 'react'

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-end lg:justify-between border-b border-gray-200 px-5 py-2 gap-6 bg-white">
      {/* Search Bar */}
      <Search />
      <div className="flex items-center justify-end gap-8 w-full md:w-1/2">
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
          <div>
            <p className="text-sm font-medium text-text text-nowrap">Ajimas Bagus K.</p>
            <p className="text-xs text-gray-500">Admin</p>
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
