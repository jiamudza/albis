import React from 'react'
import logo from '../../public/logo.png'
import Image from 'next/image'

const LoginForm = () => {
    return (
        <div className='absolute-center h-80 md:h-[50vh] lg:h-[60vh] w-4/5 md:w-2/5 lg:w-1/3  bg-white/10 border border-white/20 backdrop-blur-md rounded-md inset-0 shadow-md'>
            <Image src={logo} width={40} height={40} alt='' className='mx-auto mt-5 border-2 border-white/30 rounded-full' />
            <div className='text-md text-white p-1 flex justify-center items-center text-center'>
                <p className='font-tulpen font-semibold tracking-widest'>Al Banna Integrated System</p>
            </div>
            <form className='flex flex-col text-white p-3 mt-5 relative'>
                <div className='flex flex-col'>
                    <label className='text-xs font-semibold'>Username</label>
                    <input type='text' className='w-full px-4 py-1 rounded-full bg-white/30 text-sm input-login focus:outline-none focus:ring-0 focus:border-none mt-1'></input>
                </div>

                <div className='flex flex-col mt-5'>
                    <label className='text-xs font-semibold'>Password</label>
                    <input type="password" className='w-full px-4 py-1 rounded-full bg-white/30 text-sm input-login focus:outline-none focus:ring-0 focus:border-none mt-1' />
                </div>

                <div className='mt-6 text-sm font-bold text-center'>
                    <button className='text-white bg-white/40 px-5 py-2 rounded-full cursor-pointer'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm