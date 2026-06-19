"use client"
import React from 'react'
import logo from "../../public/logo.png";
import Image from 'next/image'
import background from "../../public/background/absensi.png"
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const Albis = () => {
  const router = useRouter()

  return (
    <div
      className='overflow-hidden relative h-[100vh] w-[100vw] '
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100%",
      }}
    >
      <Link href="/login" className='absolute top-5 right-5 bg-white text-primary px-4 py-1 rounded-lg text-md font-semibold hover:bg-primary-dark transition duration-300'>Login</Link>
      <div className='absolute-center'>
        <Image src={logo} alt="Albis Logo" className="w-32 h-32 mx-auto" />
        <div className=' text-center w-[50vw] text-purple-900 bg-opacity-80 p-6 rounded-lg'>
          <h1 className='text-4xl md:text-6xl font-bold mb-0'>Selamat Datang di</h1>
          <h1 className='text-4xl md:text-7xl font-bold mb-0'>Albis</h1>
          <p className='text-lg md:text-xs mb-3 font-semibold'>(Al Banna Integrated System)</p>
          {/* <p className='text-lg md:text-xl mb-3'>School Management System untuk SMPIT Al Banna</p>
            <p className='text-sm md:text-lg text-gray-700'>Solusi terintegrasi untuk mengelola administrasi, pembelajaran, dan pengembangan akademik sekolah dengan efisien dan modern</p> */}
        </div>
        {/* <div className="w-full mx-auto">
            <button
            onClick={() => router.push("/login") }
            className='absolute-center top-110 mx-auto bg-primary text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-primary-dark transition duration-300'>Login</button>
        </div> */}
        <div className="flex justify-center items-center">
          <Link href="/administrasi" className='flex justify-center items-center bg-primary text-white px-4 py-1 rounded-lg text-md font-semibold hover:bg-primary-dark transition duration-300'>Mulai</Link>
        </div>
      </div>
    </div>
  )
}

export default Albis