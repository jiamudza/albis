'use client'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
  {
    name: 'Jan',
    Pemasukan: 4000,
    Pengeluaran: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    Pemasukan: 3000,
    Pengeluaran: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    Pemasukan: 2000,
    Pengeluaran: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    Pemasukan: 2780,
    Pengeluaran: 3908,
    amt: 2000,
  },
  {
    name: 'Mei',
    Pemasukan: 1890,
    Pengeluaran: 4800,
    amt: 2181,
  },
  {
    name: 'Jun',
    Pemasukan: 2390,
    Pengeluaran: 3800,
    amt: 2500,
  },
  {
    name: 'Jul',
    Pemasukan: 3490,
    Pengeluaran: 4300,
    amt: 2100,
  },
  {
    name: 'Agu',
    Pemasukan: 3490,
    Pengeluaran: 4300,
    amt: 2100,
  },
  {
    name: 'Sep',
    Pemasukan: 3490,
    Pengeluaran: 4300,
    amt: 2100,
  },
  {
    name: 'Okt',
    Pemasukan: 3490,
    Pengeluaran: 4300,
    amt: 2100,
  },
  {
    name: 'Nov',
    Pemasukan: 3490,
    Pengeluaran: 4300,
    amt: 2100,
  },
  {
    name: 'Des',
    Pemasukan: 3490,
    Pengeluaran: 4300,
    amt: 2100,
  },
];
const FinanceChart = () => {
  return (
    <div className='h-full bg-white px-2 rounded-md shadow-md border-b-3 border-third relative overflow-hidden'>
        <div className='flex items-center justify-between py-2'>
            <span className='text-sm font-semibold text-text'>Keuangan</span>
            <span>...</span>
        </div>
        <ResponsiveContainer debounce={300} width="100%" height="100%" className="p-3 max-h-[45vh]">
      <LineChart
        width={100}
        height={300}
        data={data}
        margin={{
          top: 2,
          right: 0,
          left: 10,
          bottom: 2,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis style={{fontSize:"10px"}} tickMargin={10} dataKey="name"  />
        {/* <YAxis style={{fontSize:"10px"}} tickMargin={10} /> */}
        <Tooltip />
        <Legend align='center' verticalAlign='top' wrapperStyle={{fontSize: "10px", paddingBlock:"10px"}} />
        <Line type="monotone" strokeWidth={3} dataKey="Pemasukan" stroke="#6B4BAC" activeDot={{ r: 8 }} />
        <Line type="monotone" strokeWidth={3} dataKey="Pengeluaran" stroke="#FFC107" />
        <CartesianGrid stroke='' />
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default FinanceChart