"use client"
import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Senin',
    Hadir: 200,
    Absen: 5,
  },
  {
    name: 'Selasa',
    Hadir: 172,
    Absen: 33,
  },
  {
    name: 'Rabu',
    Hadir: 185,
    Absen: 20,
  },
  {
    name: 'Kamis',
    Hadir: 192,
    Absen: 13,
  },
  {
    name: "Jum'at",
    Hadir: 190,
    Absen: 15,
  },
  {
    name: 'Sabtu',
    Absen: 17,
    Hadir: 188,
  },
];

const AttendanceChart = () => {
  return (
    <div className='flex-1 lg:flex-2/3 h-full bg-white p-2 min-h-[300px] rounded-md shadow-md relative top w-full mt-2 lg:mt-0'>
        <div className='flex items-center justify-between'>
            <span className='text-sm font-semibold text-text'>Data Kehadiran</span>
            <span>...</span>
        </div>
        <ResponsiveContainer width="100%" height="90%" debounce={300} className="mt-5 h-[full] focus:outline-none absolute-center">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}

        className='focus:outline-none'
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" style={{fontSize: "10px"}} />
        {/* <YAxis domain={[0, 205]} style={{fontSize: "10px"}} /> */}
        <Tooltip />
        <Legend align='left' verticalAlign='top' wrapperStyle={{ paddingBottom:"20px"}} />
        <Bar radius={[0,10,0,0]} dataKey="Hadir" fill="#6b4bac" activeBar={<Rectangle fill="#9E6FD5" />} />
        <Bar radius={[0,10,0,0]} dataKey="Absen" fill="#FFC107" activeBar={<Rectangle fill="#ebd671" />} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  )
}

export default AttendanceChart