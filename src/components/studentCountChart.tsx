"use client"
import React from 'react'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { IoMan, IoWoman } from "react-icons/io5";

const dataRaw = [
    
    {
        name: 'Total',
        count: 205,
        fill: '#ffffff',
    },
    {
        name: 'Perempuan',
        count: 78,
        fill: '#FFC107',
    },
    {
        name: 'Laki-Laki',
        count: 127,
        fill: '#6b4bac',
    },
];


const StudentChart = () => {
    const total = dataRaw.reduce((sum, d) => sum + d.count, 0)

    const data = dataRaw.map(d => ({
        ...d,
        percent: (d.count / total) * 100
    }))

    return (
        <div className='flex-1/3 bg-white rounded-md p-2 relative overflow-hidden'>
            <div className='text-sm font-semibold text-text flex justify-between items-center'>
                <p>Data Siswa</p>
                <button>...</button>
            </div>
            <div className='relative'>
                <div className='absolute-center flex z-10'>
                <span className='text-primary'><IoMan size={20}/></span>
                <span className='text-amber-400'><IoWoman size={20}/></span>
            </div>
                <ResponsiveContainer height={220} className="">
                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={100} data={data}>
                    <RadialBar
                        // minAngle={2}
                        // label={{ position: 'insideStart', fill: '#fff' }}
                        background
                        // clockWise
                        dataKey="count"
                    />
                    {/* <PolarRadiusAxis domain={[0, 100]} tick={false} /> */}
                </RadialBarChart>
            </ResponsiveContainer>
            </div>
            <div className='flex items-center justify-between'>
                {/* laki laki */}
                <div className='flex-1/2 flex justify-center items-center gap-3'>
                    <div className='h-5 w-5 rounded-full bg-primary'></div>
                    <div className='text-xs flex flex-col'>
                        <span className='font-semibold text-nowrap'>Laki-laki</span>
                        <span>{dataRaw[2].count}</span>
                    </div>
                </div>
                {/* Perempuan */}
                <div className='flex-1/2 flex justify-center items-center gap-3'>
                    <div className='h-5 w-5 rounded-full bg-amber-400'></div>
                    <div className='text-xs md:text[12px] flex flex-col'>
                        <span className='font-semibold'>Perempuan</span>
                        <span>{dataRaw[1].count}</span>
                    </div>
                </div>
            </div>
            {/* LEGEND ICON */}
        </div>
    )
}

export default StudentChart