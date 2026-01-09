'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [calonSiswa, setCalonSiswa] = useState(null)

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setCalonSiswa(null)

    try {
      const response = await axios.post('/api/loginTest', {
        id: password,
        nama_panggilan: username
      })

      const data = response.data.data

      const calonSiswaData = {
        id_calon_siswa: data.id,
        nama_siswa: data.nama_lengkap,
        asal_sekolah: data.asal_sekolah,
        jalur_pendaftaran: data.pilihan_program,
      }

      localStorage.setItem('calonSiswa', JSON.stringify(calonSiswaData))
      router.push('/tes_pengetahuan_umum')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Login gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0edf5] p-4">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md
        shadow-[12px_12px_24px_#d1c8e0,-12px_-12px_24px_#ffffff]">

        <h2 className="text-2xl font-bold text-center text-primary mb-8">
          Login Calon Siswa
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* USERNAME */}
          <div className="relative">
            <label className="block mb-2 font-semibold text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Masukkan nama panggilan"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#f0edf5]
                shadow-[inset_6px_6px_12px_#d1c8e0,inset_-6px_-6px_12px_#ffffff]
                focus:outline-none focus:shadow-[inset_2px_2px_5px_#d1c8e0,inset_-2px_-2px_5px_#ffffff]"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <label className="block mb-2 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Masukkan ID"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#f0edf5]
                shadow-[inset_6px_6px_12px_#d1c8e0,inset_-6px_-6px_12px_#ffffff]
                focus:outline-none focus:shadow-[inset_2px_2px_5px_#d1c8e0,inset_-2px_-2px_5px_#ffffff]"
            />
          </div>

          {/* BUTTON LOGIN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white
              bg-accent shadow-xl
              hover:shadow-[inset_2px_2px_6px_#3a2360,inset_-2px_-2px_6px_#603f96]
              transition"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>

        </form>

        {/* ERROR */}
        {error && (
          <p className="mt-4 text-red-600 font-medium text-center">{error}</p>
        )}

        {/* DATA CALON SISWA */}
        {calonSiswa && (
          <div className="mt-8 p-5 rounded-2xl bg-[#f0edf5]
            shadow-[inset_6px_6px_12px_#d1c8e0,inset_-6px_-6px_12px_#ffffff]">
            <h3 className="text-lg font-semibold mb-3 text-[#4b2e7b]">Data Calon Siswa</h3>
            <ul className="space-y-2 text-gray-700">
              {Object.entries(calonSiswa).map(([key, value]) => (
                <li key={key}>
                  <span className="font-semibold capitalize">{key.replace('_', ' ')}:</span> {value}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}
