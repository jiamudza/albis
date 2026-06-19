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
    kategori: string
    name: string;
    value: number;
}[]

const NewStudentsChart = ({ programSummary }: { programSummary: Program }) => {

    console.log(programSummary)
    const program = programSummary
        .filter(item => item.kategori === "Program")
        .map(item => ({
            name: item.name,
            value: item.value
        }))

    const dataLength = program[0].value + program[1].value + program[2].value

    return (
        <div className='flex-1/3 w-full border-b-3 rounded-md border-third shadow-md p-2 relative'>
            <div className='h-1 w-full text-sm font-semibold text-text'>Pilihan Program</div>
            <div className='flex justify-center'>
                <PieChart width={300} height={200} className=' h-full w-full border-slate-200'>
                    <Pie
                        data={programSummary}
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
                        {programSummary.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}

                        {/* <Legend wrapperStyle={{ fontSize: "10px" }} /> */}
                    </Pie>
                </PieChart>
            </div>
            <div className='p-2 w-full flex flex-col md:flex-row items-center justify-center gap-5'>
                <div>
                    <div className='flex-1/3 flex justify-start items-center gap-1'>
                        <div className='w-2 h-2 bg-amber-500 rounded-full'></div>
                        <p className='text-xs font-semibold text-amber-500'>Reguler ({program[1].value})</p>
                    </div>
                    <p className='text-xs text-center text-amber-600'>{`${(program[1].value / dataLength * 100).toFixed(0)}%`}</p>
                </div>
                
                <div>
                    <div className='flex-1/3 flex justify-start items-center gap-1'>
                        <div className='w-2 h-2 bg-primary rounded-full'></div>
                        <p className='text-xs font-semibold text-primary'>Prestasi ({program[2].value})</p>
                    </div>
                    <p className='text-xs text-center text-purple-800'>{`${(program[2].value / dataLength * 100).toFixed(0)}%`}</p>
                </div>

                <div>
                    <div className='flex-1/3 flex justify-start items-center gap-1'>
                        <div className='w-2 h-2 bg-pink-500 rounded-full'></div>
                        <p className='text-xs font-semibold text-pink-500'>Boarding ({program[0].value})</p>
                    </div>
                    <p className='text-xs text-center text-pink-700'>{`${(program[0].value / dataLength * 100).toFixed(0)}%`}</p>
                </div>
                
            </div>
        </div>
    )
}

export default NewStudentsChart