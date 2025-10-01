"use client"
import React from 'react'
import { Cell, Legend, Pie, PieChart } from 'recharts';

// const data = [
//     { name: 'Boarding', value: 7 },
//     { name: 'Prestasi', value: 25 },
//     { name: 'Reguler', value: 20 },
// ];
const COLORS = ['#f6339a', '#fe9a00', '#6e11b0'];

type Program = {
    program: string;
    jumlah: number;
}

const NewStudentsChart = ({programSummary} : {programSummary: Program[]}) => {

    console.log(programSummary)

    return (
        <div className='overflow h-[90vh] relative z-0'>
            <div className='h-1 w-full'></div>
            <PieChart width={300} height={250} className='absolute top-1/3 md:top-2/7 lg:top-3/10 left-1/2 md:left-2/4 lg:left-2/6 -translate-x-1/2 -translate-y-1/2 transform h-full w-full border-slate-200'>
                <Pie
                    data={programSummary}
                    cx={140}
                    cy={100}
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="jumlah"
                    className='mx-auto'
                    nameKey='program'
                >
                    {programSummary.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}

                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                </Pie>
            </PieChart>
        </div>
    )
}

export default NewStudentsChart