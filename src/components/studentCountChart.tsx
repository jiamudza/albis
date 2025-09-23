"use client"
import React from 'react'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { IoMan, IoWoman } from "react-icons/io5";
import { useRouter } from 'next/navigation';

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
        const router = useRouter();

        const handleClick = () => {
            router.push("/list/students")
        }

    return (
        <div
        className='flex:1 lg:flex-1/3 bg-white rounded-md p-2 relative overflow-hidden shadow-md border-b-3 border-third'>
            <div className='text-sm font-semibold text-text flex justify-between items-center'>
                <p>Data Siswa</p>
                <abbr 
                title='Detail'
                onClick={handleClick}
                className='cursor-pointer no-underline'
                >...</abbr>
            </div>
            <div className='relative'>
                <div className='absolute-center flex justify-center z-10'>
                    <span className='text-primary'><IoMan size={30} /></span>
                    <span className='text-amber-400'><IoWoman size={30} /></span>
                </div>
                <ResponsiveContainer debounce={300} height={220} className="">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={100} data={dataRaw}>
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
            <div className='flex items-center justify-center gap-5 lg:gap-2'>
                {/* laki laki */}
                <div className='flex-1/2 flex justify-center items-center gap-3'>
                    <div className='h-4 w-4 rounded-full bg-primary'></div>
                    <div className='text-xs flex flex-col'>
                        <span className='font-semibold text-nowrap'>Laki-laki</span>
                        <span>{dataRaw[2].count}</span>
                    </div>
                </div>
                {/* Perempuan */}
                <div className='flex-1/2 flex justify-center items-center gap-3'>
                    <div className='h-4 w-4 rounded-full bg-amber-400'></div>
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

export default StudentChart;