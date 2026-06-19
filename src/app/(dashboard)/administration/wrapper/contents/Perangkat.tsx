"use client"
import React from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const perangkatPembelajaran = [
    {
        name: "Modul Ajar",
        description: "Modul ajar untuk mata pelajaran tertentu.",
        file: "/template/perangkat/modul_ajar.docx",
        link: "https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j?usp=sharing",
        style: "bg-purple-300 hover:scale-105 shadow-md"
    },
    {
        description: "coming soon...",
        style: ""
    }
];

const administrasiKegiatan = [
    {
        name: "Proposal Kegiatan",
        description: "Proposal untuk kegiatan sekolah.",
        file: "/template/kegiatan/proposal.docx",
        link: "https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j?usp=sharing",
        style: "bg-yellow-300 rounded-lg shadow-md hover:scale-105"
    },
    {
        name: "Laporan Kegiatan",
        description: "Laporan hasil dari kegiatan sekolah.",
        file: "/template/kegiatan/laporan_kegiatan.docx",
        link: "https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j?usp=sharing",
        style: "bg-emerald-300 rounded-lg shadow-md hover:scale-105"
    },
    {

        description: "coming soon...",
    }
];

const Perangkat = () => {
    return (
        // lokasi untuk download template perangkat pembelajaran, seperti RPP, Silabus, Prota, Promes, dll
        <div className="p-4 space-y-4">
            {/* upload perangkat ke Google Drive */}
            <a href="https://drive.google.com/drive/folders/1jvfuHPwaRbiqBXuo175r9Ms-YI42bKtC?usp=drive_link" target='_blank' className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center gap-10 hover:scale-105 transition-all duration-300">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Upload Perangkat Pembelajaran</h2>
                    <p className="text-sm text-gray-600 mb-4">Silakan upload perangkat pembelajaran ke Google Drive...</p>
                </div>
                <span><FaCloudUploadAlt size={70} /></span>
            </a>

            {/* Perangkat Pembelajaran */}
            <h2 className='text-center font-semibold'>Perangkat Pembelajaran</h2>
            <div className="flex gap-5 justify-start items-center">
                {perangkatPembelajaran.map((item, index) => (
                    <a key={index} href={item.file} download={item.file} rel="noopener noreferrer" className={`text-grey-800 mt-2 inline-block p-4 rounded-lg transition-all duration-300 ${item.style}`}>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                    </a>

                ))}
            </div>

            {/* administrasi kegiatan */}
            <h2 className="mt-8 text-center font-semibold">Administrasi Kegiatan</h2>
            <div className="flex gap-5 items-center">
                {administrasiKegiatan.map((item, index) => (
                        <a key={index} href={item.file} download={item.file} rel="noopener noreferrer" className={`text-grey-800 mt-2 inline-block p-4 transition-all duration-300 ${item.style}`}>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </a>
                    
                ))}
            </div>
        </div>
    )
}

export default Perangkat