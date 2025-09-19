import Menu from "@/components/menu";
import Navbar from "@/components/navbar";
import Link from "next/link";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex w-full h-screen overflow-y fixed top-0">
      {/* LEFT */}
      <div className="w-14 md:hover:w-14 lg:hover:w-[18%] xl:hover:w-[18%] border-r-[1px] border-slate-200 transition-all ease-in-out duration-200">
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-full bg-background transition-all ease-in-out duration-200">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
