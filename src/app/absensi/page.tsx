"use client"
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import banner from '../../assets/images/banner/attendance.png'
import { RiQrCodeFill } from 'react-icons/ri'
import axios from 'axios'

const Absensi = () => {
  const [absen, setAbsen] = useState({
    user_id: '',
    status: 'hadir'
  })
  const [success, setSuccess] = useState<'waiting' | 'true' | 'false'>('waiting')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus()
    focusInput()
    window.addEventListener('click', focusInput)
    return () => window.removeEventListener('click', focusInput)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    if (!value) return

    setAbsen(prev => ({ ...prev, user_id: value }))
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(async () => {
      try {
        const updatedAbsen = { user_id: value, status: 'hadir' }
        await axios.post('/api/absensi', updatedAbsen)
        setSuccess('true')
      } catch (error) {
        setSuccess('false')
      } finally {
        setAbsen({ user_id: '', status: 'hadir' })
        inputRef.current?.focus()
        setTimeout(() => setSuccess('waiting'), 1800)
      }
    }, 400)
  }

  const getText = () => {
    if (success === 'true') return 'Absensi Berhasil!'
    if (success === 'false') return 'Absensi Gagal! Coba Lagi.'
    return 'Arahkan scanner ke QR Code'
  }

  return (
    <div
      className="h-screen w-screen relative flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('/background/absensi.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-[420px] text-center">
        <Image src={banner} alt="Banner" className="m-auto pt-6" />

        <div
          className={`mt-10 border-4 rounded-2xl px-8 py-6 shadow-xl backdrop-blur-md transition-all duration-300 ease-out
          ${success === 'true'
              ? 'border-green-400 bg-green-50/60 scale-105'
              : success === 'false'
                ? 'border-red-400 bg-red-50/60 scale-105'
                : 'border-slate-200 bg-white/30 scale-100'}`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <RiQrCodeFill
              key={success}
              size={60}
              className={`transition-all duration-300 ${
                success === 'true'
                  ? 'text-green-600 animate-bounce-soft'
                  : success === 'false'
                    ? 'text-red-600 animate-shake-fast'
                    : 'text-slate-600'
              }`}
            />
            <p
              key={success + '-text'}
              className={`font-semibold text-lg transition-all duration-300 animate-fadeIn-fast ${
                success === 'true'
                  ? 'text-green-700'
                  : success === 'false'
                    ? 'text-red-700'
                    : 'text-slate-700'
              }`}
            >
              {getText()}
            </p>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={absen.user_id}
            onChange={handleChange}
            autoFocus
            className="absolute opacity-0 pointer-events-none"
          />
        </div>
      </div>

      {/* ⬇ Gunakan style global agar animasi benar-benar diterapkan */}
      <style jsx global>{`
        @keyframes fadeIn-fast {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn-fast {
          animation: fadeIn-fast 0.25s ease-out;
        }

        @keyframes shake-fast {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake-fast {
          animation: shake-fast 0.35s ease-in-out;
        }

        @keyframes bounce-soft {
          0%   { transform: translateY(0); }
          30%  { transform: translateY(-12px); }
          60%  { transform: translateY(6px); }
          100% { transform: translateY(0); }
        }
        .animate-bounce-soft {
          animation: bounce-soft 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
      `}</style>
    </div>
  )
}

export default Absensi
