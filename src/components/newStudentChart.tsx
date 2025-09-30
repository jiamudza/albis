"use client"
import React from 'react'
import { Cell, Legend, Pie, PieChart } from 'recharts';

const data = [
    { name: 'Boarding', value: 7 },
    { name: 'Prestasi', value: 25 },
    { name: 'Reguler', value: 20 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const NewStudentsChart = () => {
    return (
        <div className='overflow-hidden h-[90vh] relative '>
            <PieChart width={400} height={250} className='absolute-center top-10'>
                <Pie
                    data={data}
                    cx={200}
                    cy={100}
                    innerRadius={30}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${entry.value}`} fill={COLORS[index % COLORS.length]} />
                    ))}

                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                </Pie>
            </PieChart>
        </div>
    )
}

export default NewStudentsChart