import Menu from "@/components/menu";
import Navbar from "@/components/navbar";
import { getUserFromCookie } from "@/lib/getUser";
import { redirect } from "next/navigation";

export const metadata = { title: "Albis (Dashboard)" };

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserFromCookie();
  if (!user) redirect("/login"); // kalau belum login, redirect ke login

  return (
    <div className="flex w-full h-screen overflow-auto scrollbar-hide">
      <div className="w-14 md:hover:w-14 lg:hover:w-[18%] xl:hover:w-[18%] border-r-[1px] border-slate-200 transition-all ease-in-out duration-200 overflow-auto scrollbar-hide">
        <Menu user={user} />
      </div>
      <div className="w-full relative bg-background overflow-auto transition-all ease-in-out duration-200 scrollbar-hide">
        <Navbar user={user} />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
