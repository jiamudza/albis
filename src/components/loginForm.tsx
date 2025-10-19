'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/logo.png';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { useAuth } from '@/context/AuthContext';

interface LoginData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const { setUser } = useAuth();
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '', general: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '', general: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = { username: '', password: '', general: '' };
    let isValid = true;
    if (!loginData.username.trim()) { newErrors.username = 'Username wajib diisi'; isValid = false; }
    if (!loginData.password.trim()) { newErrors.password = 'Password wajib diisi'; isValid = false; }
    setErrors(newErrors);
    if (!isValid) return;

    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/login',
        loginData,
        { withCredentials: true }
      );

      setUser(res.data.user);
      window.location.href = "/spmb"

    } catch (err: any) {

      setErrors(prev => ({
        ...prev,
        general: err.response?.data?.error || 'Login gagal'
      }));

      // optional: log error lengkap
      console.error(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='absolute-center h-80 md:h-[50vh] lg:h-[60vh] w-4/5 md:w-2/5 lg:w-1/3 bg-white/10 border border-white/20 backdrop-blur-md rounded-md inset-0 shadow-md'>
      <Image src={logo} width={40} height={40} alt='Logo' className='mx-auto mt-5 border-2 border-white/30 rounded-full' />
      <div className='text-md text-white p-1 flex justify-center items-center text-center'>
        <p className='font-tulpen font-semibold tracking-widest'>Al Banna Integrated System</p>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col text-white p-3 mt-5 relative'>
        {errors.general && <p className='text-red-500 text-xs text-center mb-2'>{errors.general}</p>}

        <div className='flex flex-col'>
          <label className='text-xs font-semibold'>Username</label>
          <input
            name='username'
            value={loginData.username}
            onChange={handleChange}
            type='text'
            className='w-full px-4 py-1 rounded-full bg-white/30 text-sm input-login focus:outline-none focus:ring-0 focus:border-none mt-1'
          />
          {errors.username && <p className='text-red-500 text-[10px] mt-1'>{errors.username}</p>}
        </div>

        <div className='flex flex-col mt-5'>
          <label className='text-xs font-semibold'>Password</label>
          <input
            name='password'
            value={loginData.password}
            onChange={handleChange}
            type='password'
            className='w-full px-4 py-1 rounded-full bg-white/30 text-sm input-login focus:outline-none focus:ring-0 focus:border-none mt-1'
          />
          {errors.password && <p className='text-red-500 text-[10px] mt-1'>{errors.password}</p>}
        </div>

        <div className='mt-6 text-sm font-bold text-center'>
          <button type='submit' className='text-white bg-white/40 px-5 py-2 rounded-full cursor-pointer' disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
