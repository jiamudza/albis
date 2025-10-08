'use client'
import React, { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios' // ✅ tambahkan import axios

interface User {
    username: string,
    password: string,
    id_role: string,
    role: string[]
}

const AddUser = ({ }) => {
    const [addUser, setAddUser] = useState(false)
    const [user, setUser] = useState<User>({
        username: "",
        password: "",
        id_role: "",
        role: []
    })

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        id_role: ""
    })

    const [loading, setLoading] = useState(false)       // ✅ baru
    const [message, setMessage] = useState("")          // ✅ baru

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let newErrors = { username: "", password: "", id_role: "" }
        let isValid = true

        if (!user.username.trim()) {
            newErrors.username = "Username wajib diisi"
            isValid = false
        }

        if (!user.password.trim()) {
            newErrors.password = "Password wajib diisi"
            isValid = false
        } else if (user.password.length < 6) {
            newErrors.password = "Password minimal 6 karakter"
            isValid = false
        }

        if (!user.id_role.trim()) {
            newErrors.id_role = "ID Guru/Siswa wajib diisi"
            isValid = false
        }

        setErrors(newErrors)

        if (isValid) {
            try {
                setLoading(true);
                setMessage("");

                // ✅ kirim data ke backend
                const response = await axios.post(
                    "/api/users",
                    user,
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    }
                );

                setMessage(response.data.message || "User berhasil ditambahkan ✅");
                alert("User berhasil ditambahkan");
                setAddUser(false);
                setUser({
                    username: "",
                    password: "",
                    id_role: "",
                    role: []
                });
                localStorage.removeItem('addUser');

            } catch (err: unknown) {
                // cast ke AxiosError dengan tipe data { error: string }
                const axiosErr = err as AxiosError<{ error: string }>;

                console.error(axiosErr);
                setMessage(axiosErr.response?.data?.error || "Gagal menambahkan user ❌");
                alert("Gagal menambahkan user!");
            } finally {
                setLoading(false);
            }

        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        const updatedUser = {
            ...user,
            [name]: value,
        }

        setUser(updatedUser)
        localStorage.setItem("addUser", JSON.stringify(updatedUser))

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }))
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target

        const updatedUser = {
            ...user,
            role: checked
                ? [...user.role, value]
                : user.role.filter((r) => r !== value),
        }

        setUser(updatedUser)
        localStorage.setItem("addUser", JSON.stringify(updatedUser))
    }

    useEffect(() => {
        const savedUser = localStorage.getItem("addUser")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    console.log(user)

    return (
        <div>
            <button
                onClick={() => {
                    setAddUser(true);
                }}
                className='text-sm font-semibold bg-primary text-white px-2 py-1 rounded-md border-b-3 border-white hover:bg-third hover:border-b-primary transition-hover ease-in-out duration-200 cursor-pointer'>Add User</button>
            {/* add user menu */}
            {addUser &&
                <div className='w-screen h-screen absolute-center overflow-hidden bg-white/`0 backdrop-blur-md transition-all ease-in-out duration-500'>
                    <div className=' bg-white border absolute-center border-slate-300 border-b-3 border-b-third rounded-md shadow-md w-2/3 lg:w-1/3 '>
                        {/* close button */}
                        <div
                            onClick={() => {
                                setAddUser(false);
                            }}
                            className='w-6 h-6 bg-red-400 text-center align-center font-semibold text-white rounded-tr-md rounded-bl-md absolute right-0 top-0 cursor-pointer'>x</div>
                        <h3 className='py-2 px-3 font-semibold text-xs text-text '>Tambah user</h3>
                        <form onSubmit={handleSubmit} className='p-3'>
                            {/* User Name */}
                            <div className='flex gap-5'>
                                <div className='flex-1/2'>
                                    <div className=''>
                                        <label className='text-xs font-semibold'>Username</label><br />
                                        <input
                                            name='username'
                                            value={user.username}
                                            onChange={handleChange}
                                            type='text'
                                            className='border border-slate-300 rounded-full px-4 py-1 mt-1 focus:border-third focus:outline-none focus:ring-none text-xs text-primary'
                                            placeholder='add username'
                                        />
                                        {errors.username && <p className='text-[10px] text-red-500 mt-1'>{errors.username}</p>}
                                    </div>
                                    <div className='mt-2'>
                                        <label className='text-xs font-semibold'>Password</label><br />
                                        <input
                                            name='password'
                                            value={user.password}
                                            onChange={handleChange}
                                            type='password'
                                            className='border border-slate-300 rounded-full px-4 py-1 mt-1 focus:border-third focus:outline-none focus:ring-none text-xs text-primary'
                                            placeholder='add password'
                                        />
                                        {errors.password && <p className='text-[10px] text-red-500 mt-1'>{errors.password}</p>}
                                    </div>
                                    <div className='mt-2'>
                                        <label className='text-xs font-semibold'>ID Guru/Siswa</label><br />
                                        <input
                                            name='id_role'
                                            value={user.id_role}
                                            onChange={handleChange}
                                            type='text'
                                            className='border border-slate-300 rounded-full px-4 py-1 mt-1 focus:border-third focus:outline-none focus:ring-none text-xs text-primary'
                                            placeholder='id data'
                                        />
                                        {errors.id_role && <p className='text-[10px] text-red-500 mt-1'>{errors.id_role}</p>}
                                    </div>
                                </div>

                                {/* role */}
                                <div className='flex-1/2'>
                                    <label className='text-xs font-semibold'>Role</label>
                                    <div className='flex items-center gap-3 flex-wrap'>
                                        {["Admin", "Guru", "SPMB", "Siswa", "Wali", "Walas"].map((r) => (
                                            <div key={r} className='flex justify-start items-center gap-1 mt-2'>
                                                <input
                                                    type='checkbox'
                                                    value={r}
                                                    checked={user.role.includes(r)}
                                                    onChange={handleCheckbox}
                                                />
                                                <label className='text-[10px] font-semibold'>{r}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='text-center'>
                                        <button
                                            type='submit'
                                            disabled={loading}
                                            className='mt-10 text-center text-xs font-semibold bg-accent text-white px-2 py-1 rounded-full cursor-pointer'
                                        >
                                            {loading ? 'Menyimpan...' : 'Submit'}
                                        </button>
                                        {message && <p className='text-[10px] text-center mt-2'>{message}</p>} {/* ✅ tampilkan pesan */}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>}
        </div>
    )
}

export default AddUser
