"use client"
import React from 'react'
import { Cell, Legend, Pie, PieChart } from 'recharts';

// const data = [
//     { name: 'Boarding', value: 7 },
//     { name: 'Prestasi', value: 25 },
//     { name: 'Reguler', value: 20 },
// ];

type Pembayaran = {
    kategori: string
    name: string;
    value: number;
}[]

const NewStudentsRegistChart = ({ pembayaran }: { pembayaran: Pembayaran }) => {

    const registPayment = pembayaran
        .filter(item => item.kategori === "Status Pembayaran")
        .map(item => ({
            name: item.name,
            value: item.value
        }))

    const dataLength = registPayment[0].value + registPayment[1].value

    return (
        <div className='flex-1/3 w-full border-b-3 rounded-md border-amber-300 shadow-md p-2 relative'>
            <div className='h-1 w-full text-sm font-semibold text-text'>Administrasi</div>
            <div className='flex justify-center'>
                <PieChart width={300} height={200} className=' h-full w-full border-slate-200'>
                    <Pie
                        data={registPayment}
                        cx={140}
                        cy={100}
                        innerRadius={50}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        className='mx-auto'
                        nameKey='name'
                    >
                        <Cell key={`cell-0`} fill="oklch(87.9% 0.169 91.605)" />
                        <Cell key={`cell-1`} fill="#C7B7EB" />

                        {/* <Legend wrapperStyle={{ fontSize: "10px" }} /> */}
                    </Pie>
                </PieChart>
            </div>
            <div className='p-2 w-full flex flex-col md:flex-row items-center justify-center gap-5'>
                <div>
                    <div className='flex-1/3 flex justify-start items-center gap-1'>
                        <div className='w-2 h-2 bg-purple-300 rounded-full'></div>
                        <p className='text-xs font-semibold text-purple-300'>Lunas ({registPayment[1].value})</p>
                    </div>
                    <p className='text-xs text-center text-purple-500'>{`${(registPayment[1].value / dataLength * 100).toFixed(0)}%`}</p>
                </div>
                
                <div>
                    <div className='flex-1/3 flex justify-start items-center gap-1'>
                        <div className='w-2 h-2 bg-amber-300 rounded-full'></div>
                        <p className='text-xs font-semibold text-amber-300'>Belum Lunas ({registPayment[0].value})</p>
                    </div>
                    <p className='text-xs text-center text-amber-500'>{`${(registPayment[0].value / dataLength * 100).toFixed(0)}%`}</p>
                </div>
                
            </div>
        </div>
    )
}

export default NewStudentsRegistChart