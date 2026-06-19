"use client"
import React from 'react'
import Albis from '../../page'

const Wrapper = () => {
    const [tabActive, setTabActive] = React.useState("albis")
    const tab = [
    {
        key: "albis",
        Label: "Albis",
        className: "px-4 py-1 border-t-4 border-primary [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-third text-[10px] md:text-xs lg:text-sm font-semibold text-white -mr-2 relative z-30",
        content: tabActive === "albis" && <Albis />

    },
    {
        key: "sop",
        Label: "SOP",
        className: "px-2 lg:px-4 py-1 border-t-4 border-pink-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-pink-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white -mr-2 relative z-20"
    },
    {
        key: "tatib",
        Label: "Tatib",
        className: "px-2 lg:px-4 py-1 border-t-4 border-amber-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-amber-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white -mr-2 relative z-10"
    },
    {
        key: "perangkat",
        Label: "Perangkat",
        className: "px-2 lg:px-4 py-1 border-t-4 border-blue-500 [clip-path:polygon(10%_0,90%_0,100%_100%,0_100%)] bg-blue-300 text-[10px] md:text-xs lg:text-sm font-semibold text-white relative z-0",
        content: `${tabActive === "albis" && <Albis />}`
    },
]
    return (
        <div className="p-3">
            <div className="flex cursor-pointer">
                {tab.map((item) => (
                    <div 
                        key={item.key} 
                        className={item.className + (tabActive === item.key ? " border-t-4 z-10" : "")}
                        onClick={() => setTabActive(item.key)}
                    >
                        <h2 className="text-md">{item.Label}</h2>
                        {/* <p className="text-sm">{item.description}</p> */}
                    </div>
                ))}
            </div>
            <div className="h-[90vh] w-[97vw] border-1 shadow-2xl border-gray-300 rounded-lg rounded-tl-none overflow-hidden">
                {tab.find((item) => item.key === tabActive)?.content}
            </div>
        </div>
    )
}

export default Wrapper