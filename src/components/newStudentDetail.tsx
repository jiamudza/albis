'use client'
import axios from 'axios'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import bg from "../../public/background/profile-bg.jpg"
import { MdDownload } from 'react-icons/md';

interface Student {
    // data siswa
    id: string;
    nama_lengkap: string;
    nama_panggilan: string;
    email?: string;
    jenis_kelamin: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    NIK: string;
    NKK: string;
    alamat_lengkap: string;
    asal_sekolah: string;
    NISN: string;
    riwayat_penyakit?: string;
    pilihan_program: string;
    anak_ke: string;
    foto: string;
    foto_kecil: string;
    // data ayah
    nama_ayah: string;
    tempat_lahir_ayah: string;
    tanggal_lahir_ayah: string;
    no_wa_ayah: string;
    email_ayah: string;
    pekerjaan_ayah: string;
    gaji_ayah: string;
    // data ibu
    nama_ibu: string;
    tempat_lahir_ibu: string;
    tanggal_lahir_ibu: string;
    no_wa_ibu: string;
    email_ibu: string;
    pekerjaan_ibu: string;
    gaji_ibu: string;

    // administrasi
    status_pembayaran: string;
    metode_bayar: string;
    bukti_pembayaran?: string;
}

const NewStudentDetail = ({ handleDetail, id, detail }: { handleDetail: () => void, id: string, detail: boolean }) => {

    const [refresh, setRefresh] = useState(false)
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [data, setData] = useState<Student | null>(null); // ← ini benar

    const url = `http://localhost:5000/api/getNewStudents/${id}`

    const handlePaymentStatus = () => {
        axios.patch(`http://localhost:5000/api/${data? data.id : "000"}/togglePayment`)
        .then(() => {
            setRefreshLoading(true);
            setRefresh(!refresh);
            setRefreshLoading(false);
        })
        .catch(err => console.log(err.message))
    }
    useEffect(() => {

        if (detail) {
            axios.get(url)
                .then(res => {
                    setData(res.data)
                })
                .catch(err => console.log(err))
        }

        return;

    }, [refresh])


    return (
        <div className='w-full bg-white rounded-md rounded-tl-none transition-all ease-in-out duration-200 border border-b-3 border-b-third border-slate-300 border-t-0 z-20'>
            <div onClick={handleDetail} className='bg-red-400 h-6 w-6 rounded-tr-md rounded-bl-md absolute right-0 top-0 font-semibold text-center text-white cursor-pointer'>x</div>

            {!data ? <div className='font-bold text-slate-400 h-[30vh] w-full rounded-md text-center align-text-bottom relative z-10'><span className='absolute-center'>Loading...</span></div> :
                <div className='flex flex-col md:flex-row gap-2 px-4 py-5'>
                    <div className='flex-1/3'>
                        <div className='p-4 rounded-md'
                            style={{
                                backgroundImage: `url('/background/profile-bg.jpg')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            {/* main profile */}
                            <div className='p-2 relative z-0 bg-white/10 border border-white/20 backdrop-blur-xs rounded-md '>
                                <div className='flex justify-start items-center gap-3'>
                                    <Image src="https://avatar.iran.liara.run/public/12" alt="" width={50} height={50} className='rounded-full ' />
                                    <div>
                                        <p className='text-sm font-semibold'>{data.nama_lengkap}</p>
                                        <p className='text-xs italic'>{data.nama_panggilan}</p>
                                    </div>
                                </div>
                                <div className='bg-black/30 text-white px-2 py-1 mt-2 rounded-md'>
                                    <p className='text-xs font-semibold mt-1'>{data.jenis_kelamin}</p>
                                    <p className='text-xs font-semibold mt-1'>{`${data.tempat_lahir}, ${new Date(data.tanggal_lahir).toLocaleDateString("id-ID")}`}</p>
                                    <p className='text-lg font-bold mt-1'>{data.pilihan_program}</p>
                                </div>
                            </div>
                        </div>
                        {/* secondary data */}
                        <div className='mt-2 text-sm font-medium p-2 rounded-md shadow-md border border-slate-200'>
                            <table className='border-collapse w-full text-start'>
                                <tr className="border-b border-slate-300">
                                    <td className='align-top w-2/4 py-1'>Asal Sekolah</td>
                                    <td className="align-top text-black">:</td>
                                    <td className='align-top text-start pl-2'> {data.asal_sekolah}</td>
                                </tr>
                                <tr className="border-b border-slate-300">
                                    <td className='align-top py-1'>NISN</td>
                                    <td className="align-top text-black">:</td>
                                    <td className='align-top text-start pl-2'>{data.NISN}</td>
                                </tr>
                                <tr className="border-b border-slate-300">
                                    <td className='align-top py-1'>NIK</td>
                                    <td className="align-top text-black">:</td>
                                    <td className='align-top text-start pl-2'>{data.NIK}</td>
                                </tr>
                                <tr className="border-b border-slate-300">
                                    <td className='align-top py-1'>NKK</td>
                                    <td className="align-top text-black">:</td>
                                    <td className='align-top text-start pl-2'>{data.NKK}</td>
                                </tr>
                                <tr className="border-b border-slate-300">
                                    <td className='align-top py-1'>Email</td>
                                    <td className="align-top text-black">:</td>
                                    <td className='align-top text-start pl-2'>{data.email}</td>
                                </tr>
                                <tr className="border-b border-slate-300">
                                    <td className='align-top py-1'>Alamat</td>
                                    <td className='align-top'>:</td>
                                    <td className='align-top text-start pl-2'>{data.alamat_lengkap}</td>
                                </tr>
                                <tr className="border-b border-slate-300">
                                    <td className='align-top py-1'>Riwayat Penyakit</td>
                                    <td className="align-top text-black">:</td>
                                    <td className='align-top text-start pl-2'>{data.riwayat_penyakit === "" ? "Tidak ada" : data.riwayat_penyakit}</td>
                                </tr>
                                <tr className="border-b border-slate-300">
                                    <td className='align-top py-1'>Anak Ke-</td>
                                    <td className="align-top text-black">:</td>
                                    <td className='align-top text-start pl-2'>{data.anak_ke}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    {/* data Orang Tua */}
                    <div className='flex-2/3'>
                        <div className='flex flex-col md:flex-row gap-2'>
                            {/* data ayah */}
                            <div className='flex-1/2 rounded-md border-slate-300'>
                                <div className='bg-blue-300 py-2 text-center font-bold rounded-md text-white'>Data Ayah</div>
                                <div className='mt-2 text-sm font-medium p-2 rounded-md shadow-md border border-slate-200'>
                                    <table className='border-collapse w-full text-start'>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top w-2/4 py-1'>Nama</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'> {data.nama_ayah}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>Tempat Lahir</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.tempat_lahir_ayah}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>Tanggal Lahir</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.tanggal_lahir_ayah}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>No Whatsapp</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.no_wa_ayah}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>Email</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.email_ayah}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>Pekerjaan</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.pekerjaan_ayah}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>Penghasilan</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.gaji_ayah}</td>
                                        </tr>

                                    </table>
                                </div>
                            </div>
                            {/* Data Ibu */}
                            <div className='flex-1/2 rounded-md border-slate-300'>
                                <div className='bg-pink-300 py-2 text-center font-bold rounded-md text-white'>Data Ibu</div>
                                <div className='mt-2 text-sm font-medium p-2 rounded-md shadow-md border border-slate-200'>
                                    <table className='border-collapse w-full text-start'>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top w-2/4 py-1'>Nama</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'> {data.nama_ibu}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>Tempat Lahir</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.tempat_lahir_ibu}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>Tanggal Lahir</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.tanggal_lahir_ibu}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>No Whatsapp</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.no_wa_ibu}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>Email</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.email_ibu}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>Pekerjaan</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.pekerjaan_ibu}</td>
                                        </tr>
                                        <tr className="border-b border-slate-300">
                                            <td className='align-top py-1'>Penghasilan</td>
                                            <td className="align-top text-black">:</td>
                                            <td className='align-top text-start pl-2'>{data.gaji_ibu}</td>
                                        </tr>

                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* administrasi */}
                        <p className='bg-third text-md text-white font-bold py-2 text-center rounded-md mt-3'>Administrasi</p>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <div className='text-sm flex-1/2 rounded-md mt-3 shadow-md border border-slate-200'>
                                <div className='mt-2 px-4 py-2 border-b border-slate-300'>
                                    <p className='mb-2 text-xs'>Metode Pembayaran</p>
                                    <p className='text-xs w-40 font-bold'>{data.metode_bayar}</p>

                                </div>
                                <div className='px-4 py-2 gap-5'>
                                    <p className='mb-2 text-xs'>Status Pembayaran</p>
                                    <div className='flex justify-between gap-10 items-center'>
                                        {data.status_pembayaran === "Lunas" ? <p className='p-2 text-white border bg-green-600 rounded-full text-xs font-semibold'>{data.status_pembayaran}</p>
                                            :
                                            <p className='p-2 text-xs font-semibold border bg-amber-600  rounded-full text-center text-white'>{data.status_pembayaran}</p>}

                                        <button className='p-2 text-blue-500 font-semibold text-xs cursor-pointer'
                                        onClick={handlePaymentStatus}>Ubah Status</button>
                                    </div>
                                </div>
                            </div>
                            {/* Bukti Pembayaran */}
                            <div className='flex-1/2 flex flex-col md:flex-row gap-3 mt-3 p-2 border border-slate-200 rounded-md shadow-md'>
                                {data.metode_bayar === "Transfer" &&
                                    <div className='h-[40vh] md:h-[20vh] overflow-scroll scrollbar-hide relative'>
                                        <p className='text-xs sticky bg-white top-0 px-3 py-2 left-2'>Bukti Pembayaran</p>
                                        <Image src={data.bukti_pembayaran == undefined ? "" : data.bukti_pembayaran} height={200} width={200} alt='' className='w-full mt-2' />
                                    </div>
                                }
                                <div className={`${data.metode_bayar === "Transfer" ? "flex-1/2 py-2" : "flex-1 py-2"}`}>
                                    <button className='flex items-center justify-center rounded-full p-2 bg-blue-300 w-full text-xs font-semibold text-white'>
                                        <MdDownload />
                                        <p>Data</p>
                                    </button>
                                    <button className='flex mt-2 items-center justify-center rounded-full p-2 bg-amber-300 w-full text-xs font-semibold text-white'>
                                        <MdDownload />
                                        <p>Kartu Tes</p>
                                    </button>
                                    <button className='flex mt-2 items-center justify-center rounded-full p-2 bg-pink-300 w-full text-xs font-semibold text-white'>
                                        <MdDownload />
                                        <p>Rapor</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default NewStudentDetail