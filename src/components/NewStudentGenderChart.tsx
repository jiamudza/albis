"use client"
import React from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { IoMan, IoWoman } from "react-icons/io5";
import { useRouter } from 'next/navigation';

type Program = {
    kategori: string
    name: string;
    value: number;
}[]


const NewStudentGenderChart = ({gender} : {gender: Program}) => {

    let genderCountArray:any[] = [];

    const genderCount = gender
        .filter(item => item.kategori === "Jenis Kelamin")
        .map(item => {
            if(item.name === "Perempuan") {
                genderCountArray[2] = {
                    name: item.name,
                    value: item.value,
                    fill: '#FFC107'
                }
            } else {
                genderCountArray[1] = {
                    name: item.name,
                    value: item.value,
                    fill: "#6b4bac"
                }
            }
        })

        const totalData = [{ name: "Total", value: 80, fill: "#ffffff" }]
        const newStudentByGender = genderCountArray.concat(totalData).reverse()

        const kuota = totalData[0].value - genderCountArray[1].value - genderCountArray[2].value
    

    return (
        <div
            className='flex-1/3 w-full bg-white rounded-md p-2 overflow-hidden shadow-md border-b-3 border-pink-300 z-20 '>
            <div className='text-sm font-semibold text-text flex justify-between items-center'>
                <p>Gender</p>
            </div>
            <div className='flex justify-center items-center relative -m-8'>
                <div className='absolute-center flex justify-center z-10'>
                    <span className='text-primary'><IoMan size={30} /></span>
                    <span className='text-amber-400'><IoWoman size={30} /></span>
                </div>
                <ResponsiveContainer debounce={300} width={290} height={250} className="">
                    <RadialBarChart innerRadius="10%" outerRadius="100%" barSize={100} data={newStudentByGender}>
                        <RadialBar
                            // minAngle={2}
                            // label={{ position: 'insideStart', fill: '#fff' }}
                            background
                            // clockWise
                            dataKey="value"
                        />
                        {/* <PolarRadiusAxis domain={[0, 100]} tick={false} /> */}
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
            <div className='flex flex-col md:flex-row justify-center gap-5 pb-3 pt-1'>
                {/* laki laki */}
                <div>
                    <div className='flex justify-center items-center gap-1'>
                        <div className='h-2 w-2 rounded-full bg-primary'></div>
                        <div className='text-xs flex gap-1 text-primary font-semibold'>
                            <span className=' text-nowrap'>Laki-laki</span>
                            <span>({genderCountArray[1].value})</span>
                        </div>
                    </div>
                    <p className='text-center text-xs text-purple-800'>{`${(genderCountArray[1].value/totalData[0].value * 100).toFixed(0)}%`}</p>
                </div>
                {/* Perempuan */}
                <div>
                    <div className='flex justify-center items-center gap-1'>
                        <div className='h-2 w-2 rounded-full bg-amber-400'></div>
                        <div className='text-xs md:text[12px] flex gap-1 text-amber-400 font-semibold'>
                            <span className=''>Perempuan</span>
                            <span>({genderCountArray[2].value})</span>
                        </div>
                    </div>
                    <p className='text-xs text-center text-amber-500'>{`${(genderCountArray[2].value/totalData[0].value * 100).toFixed(0)}%`}</p>
                </div>
                <div>
                    <div className='flex justify-center items-center gap-1'>
                        <div className='h-2 w-2 rounded-full bg-slate-300'></div>
                        <div className='text-xs md:text[12px] flex gap-1 text-text font-semibold'>
                            <span className=''>Kuota</span>
                            <span>({kuota})</span>
                        </div>
                    </div>
                    <p className='text-xs text-center text-text'>{`${(kuota/totalData[0].value * 100).toFixed(0)}%`}</p>
                </div>
            </div>
            {/* LEGEND ICON */}
        </div>
    )
}

export default NewStudentGenderChart;