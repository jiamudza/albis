"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import spmbLogo from "../assets/images/logo/spmb2026.png"

const SpmbNotifCard = () => {
    const [data, setData] = useState<Partial<any>[]>([])

    useEffect( () => {
        axios.get(`https://albis-navy.vercel.app/api/getNewStudents?limit=4`, {
            withCredentials: true
        })
        .then(res => {
            setData(res.data.data)
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className='bg-white rounded-md shadow-md border-b-3 relative p-2 border-third h-[58vh] z-0 overflow-hidden'
    >
            <Image src={spmbLogo} alt='' width={600} height={600} className='absolute inset-0 -z-10 opacity-5' />

        <div className='flex justify-between'>
            <h3 className='text-sm mb-3 font-semibold text-text'>Pendaftar Terbaru</h3>
            <p>...</p>
        </div>
        {data && data.map(item => (
            <div key={item.id} className='flex items-center justify-start gap-3  border-b-1 border-slate-200 py-4'>
                <Image src={item.foto_kecil ? item.foto_kecil : `https://avatar.iran.liara.run/public/`} alt='' width={50} height={50} className='rounded-full' />
                <div>
                    <p className='text-sm font-semibold'>{item.nama_lengkap}</p>
                <p className='text-xs'>{item.pilihan_program}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default SpmbNotifCard