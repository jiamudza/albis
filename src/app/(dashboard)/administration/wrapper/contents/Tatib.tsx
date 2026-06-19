import React, { useState } from 'react'
import { FaChalkboardTeacher, FaUser, FaUsers } from 'react-icons/fa';
import Tatibmain from './Tatibmain';
import { FaBuilding } from 'react-icons/fa6';


const tatibItems = [
    {
        title: "Tata Tertib Guru dan Staf",
        description: "Peraturan dan tata tertib yang harus diikuti oleh guru di sekolah.",
        file: "/tatib/Tatib Guru dan Staff.pdf",
        style: "bg-blue-300",
        reacticon: <FaUser />,
    },
    {
        title: "Kode Etik Guru",
        description: "Kode Etik guru sebagai teladan dan role model bagi siswa.",
        file: "/tatib/Kode Etik Guru.pdf",
        style: "bg-teal-300",
        reacticon: <FaChalkboardTeacher />,
    },
    {
        title: "Tatib Penggunaan SarPras",
        description: "Tata Tertib yang harus diikuti dalam penggunaan sarana dan prasarana.",
        file: "/tatib/Tatib penggunaan sarpras.pdf",
        style: "bg-purple-300",
        reacticon: <FaBuilding />,
    },
    {
        title: "Tata Tertib Siswa",
        description: "Peraturan dan tata tertib yang harus diikuti oleh siswa di sekolah.",
        file: "/tatib/Tatib siswa.pdf",
        style: "bg-amber-300",
        reacticon: <FaUsers />,
    },
]   

const Tatib = () => {
    const [popUp, setPopup] = useState(false);
    const [selectedFile, setSelectedFile] = useState("");
    return (
        <div className='flex justify-evenly gap-4 h-full w-full p-3 flex-wrap'>
            
            {tatibItems.map((item, index) => (
                <div
                onClick={() => {
                    setSelectedFile(item.file);
                    setPopup(true);
                }}
                 key={index} className={`flex flex-col justify-center items-center gap-2 sm:w-full md:w-2/5 lg:w-[23%] h-50 ${item.style} shadow-xl rounded-lg p-3 cursor-pointer relative hover:scale-105 transition-transform duration-300`}>
                    <span className="text-2xl absolute top-3 left-3">{item.reacticon}</span>
                    <h2 className='text-lg font-semibold'>{item.title}</h2> 
                    <p className='text-sm text-slate-600'>{item.description}</p>
                </div>
            ))}
            {popUp && (
                    <div className="fixed inset-0 bg-black bg-opacity-[70%] flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg w-[97vw] h-[95vh] relative">
                        <button
                          className="absolute top-0 right-0 px-2 py-1 text-sm font-bold bg-red-400 text-white cursor-pointer hover:text-gray-700 rounded-tr-lg rounded-bl-lg transition duration-300"
                          onClick={() => setPopup(false)}
                        >
                          &times;
                        </button>
                        <Tatibmain file={selectedFile} />
                      </div>
                    </div>
                  )}
        </div>
    )
}

export default Tatib