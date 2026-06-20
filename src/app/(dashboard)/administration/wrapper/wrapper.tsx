"use client"
import React from 'react'
import SOP from './contents/SOP'
import Tatib from './contents/Tatib'
import Perangkat from './contents/Perangkat'
import { IoIosLogOut } from 'react-icons/io'

const Wrapper = () => {
    const [tabActive, setTabActive] = React.useState("sop")
    const tab = [
        {
            key: "sop",
            Label: "SOP",
            className: "px-2 lg:px-4 py-1 border-t-4 border-pink-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-pink-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white -mr-2 relative z-20",
            content: tabActive === "sop" && <SOP />
        },
        {
            key: "tatib",
            Label: "Tatib",
            className: "px-2 lg:px-4 py-1 border-t-4 border-amber-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-amber-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white -mr-2 relative z-10",
            content: tabActive === "tatib" && <Tatib />
        },
        {
            key: "perangkat",
            Label: "Administrasi",
            className: "px-2 lg:px-4 py-1 border-t-4 border-blue-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-blue-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white relative z-0",
            content: tabActive === "perangkat" && <Perangkat />
        },
    ]
    return (
        <div className="p-3">
            <div className="flex cursor-pointer relative">
                {tab.map((item) => (
                    <div className="flex gap-2"
                    key={item.key}>
                        <div
                            className={item.className + (tabActive === item.key ? " border-t-4" : "")}
                            onClick={() => setTabActive(item.key)}
                        >
                            <h2 className="text-md">{item.Label}</h2>
                            {/* <p className="text-sm">{item.description}</p> */}
                        </div>
                        <span className="block w-full h-1 bg-gray-300"></span>
                    </div>

                ))}
                <a href='https://akreditasi-smpitalbanna-2026.netlify.app/' target='_blank'
                className='bg-primary px-3 py-1 text-white cursor-pointer hover:bg-primary/80 absolute right-0 rounded-tl-lg rounded-tr-lg flex items-center justify-center gap-3'
                >
                    <p>Akreditasi</p>
                    <IoIosLogOut />
                </a>
            </div>
            <div className="w-full bg-white border-1 shadow-2xl border-gray-300 rounded-lg rounded-tl-none rounded-tr-none overflow-hidden">
                {tab.find((item) => item.key === tabActive)?.content}
            </div>
        </div>
    )
}

export default Wrapper