'use client'
import React, { useState } from 'react'
import SOPmain from './SOPmain'
import { FaTrophy, FaCalendarAlt, } from 'react-icons/fa'
import { FaBook, FaShieldAlt, FaBuilding, FaMoon, FaFolderOpen, FaChalkboardTeacher, FaUsers } from 'react-icons/fa'

const SOP = () => {
  const [popUp, setPopup] = useState(false)
  const [url, setUrl] = useState("")
  const dataSOP = [
    {
      id: 1,
      reacticon: <FaTrophy />,
      title: "S.O.P Apresiasi dan Penghargaan Prestasi Siswa",
      description: "Prosedur untuk memberikan apresiasi dan penghargaan kepada siswa yang berprestasi di sekolah.",
      file: "/sop/APRESIASI DAN PENGHARGAAN PRESTASI SISWA.pdf",
      style: "bg-red-300"
    },
    {
      id: 2,
      reacticon: <FaBook />,
      title: "S.O.P Literasi dan Numerasi",
      description: "Prosedur untuk meningkatkan kemampuan literasi dan numerasi siswa di sekolah. ",
      file: "/sop/LITERASI NUMERASI.pdf",
      style: "bg-green-300"
    },
    {
      id: 3,
      reacticon: <FaShieldAlt />,
      title: "S.O.P Penanganan Kekerasan",
      description: "Prosedur untuk menangani situasi kekerasan di sekolah.",
      file: "/sop/PENANGANAN KEKERASAN.pdf",
      style: "bg-blue-300"
    },
    {
      id: 4,
      reacticon: <FaBuilding />,
      title: "S.O.P Pengelolaan Sarana dan Prasarana",
      description: "Prosedur untuk mengelola sarana dan prasarana sekolah dengan baik dan aman.",
      file: "/sop/PENGELOLAAN SARANA DAN PRASARANA SEKOLAH.pdf",
      style: "bg-yellow-300"
    },
    {
      id: 5,
      reacticon: <FaMoon />,
      title: "S.O.P Program Litnum-Keislaman",
      description: "Prosedur untuk mengelola program Litnum-Keislaman di sekolah dengan efektif dan efisien.",
      file: "/sop/PROGRAM LITNUM-KEISLAMAN.pdf",
      style: "bg-purple-300"
    },
    {
      id: 6,
      reacticon: <FaFolderOpen />,
      title: "S.O.P Standarisasi Pendokumentasian dan Pengarsipan Digital",
      description: "Prosedur untuk mendokumentasikan dan mengarsipkan dokumen digital di sekolah dengan standar yang baik dan aman.",
      file: "/sop/STANDARISASI PENDOKUMENTASIAN DAN PENGARSIPAN DIGITAL KEGIATAN SEKOLAH.pdf",
      style: "bg-pink-300"
    },
    {
      id: 7,
      reacticon: <FaCalendarAlt />,
      title: "S.O.P Tata Cara Pelaksanaan Kegiatan",
      description: "Prosedur untuk merencanakan, melaksanakan, dan melaporkan kegiatan di sekolah dengan baik dan terstruktur.",
      file: "/sop/TATA CARA PERENCANAAN, PELAKSANAAN, DAN PELAPORAN KEGIATAN SEKOLAH.pdf",
      style: "bg-teal-300"
    },
    {
      id: 8,
      reacticon: <FaChalkboardTeacher />,
      title: "S.O.P Teacher's Planning Day",
      description: "Prosedur untuk mengatur dan melaksanakan Teacher's Planning Day di sekolah dengan efektif dan efisien.",
      file: "/sop/TEACHER’S PLANNING DAY.pdf",
      style: "bg-indigo-300"
    },
    // {
    //   id: 9,
    //   reacticon: <FaUsers />,
    //   title: "S.O.P Pengelolaan Kegiatan Non-Akademik",
    //   description: "Prosedur untuk mengelola kegiatan non-akademik di sekolah dengan kreatif dan inovatif.",
    //   file: "/pdf/sop_pengelolaan_kegiatan_non_akademik.pdf",
    //   style: "bg-gray-300"
    // }
  ]
  return (
    <div className="p-3">
      <div className="flex gap-2 justify-center items-center flex-wrap">
        {dataSOP.map((sop) => (
          <div 
          onClick={() => {
            setPopup(true);
            setUrl(sop.file)
          }}
          key={sop.id} className={`mb-4 p-4 rounded-lg sm:w-full md:w-2/5 lg:w-3/13 md:h-60  overflow-hidden ${sop.style} shadow-2xl hover:scale-105 transition-transform cursor-pointer duration-300`}>
            {/* flex reacticon and title */}
            <div className="flex items-start gap-2 mb-2">
              <h2 className="text-lg font-semibold">{sop.title}</h2>
              <span className="text-xl mr-2">{sop.reacticon}</span>
            </div>
            <p className="text-sm text-slate-600">{sop.description}</p>
            {/* <button
              className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition duration-300 cursor-pointer"
              onClick={() => {
                setPopup(true);
                setUrl(sop.file)
              }}
            >
              Lihat SOP
            </button> */}
          </div>
        ))}
      </div>
      {popUp && (
        <div className="fixed inset-0 bg-black bg-opacity-[70%] flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-[97vw] h-[95vh] relative">
            <button
              className="absolute top-0 right-0 px-2 py-1 text-2xl bg-red-400 text-white cursor-pointer hover:text-gray-700 rounded-tr-lg rounded-bl-lg transition duration-300"
              onClick={() => setPopup(false)}
            >
              &times;
            </button>
            <SOPmain url={url} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SOP