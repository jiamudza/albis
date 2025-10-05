'use client'
import axios from 'axios'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface Student {
  id: string;
  nama_lengkap: string;
  email: string;
}

const NewStudentDetail = ({handleDetail, id, detail}:{handleDetail : () => void, id : string, detail: boolean}) => {

   const [data, setData] = useState<Student | null>(null); // ← ini benar

    const url = `http://localhost:5000/api/getNewStudents/${id}`

    useEffect(() => {

        if(detail) {
            axios.get(url)
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
        }

        return;
        
    }, [])

    console.log(data)

    return (
        <div className='h-full w-full bg-white rounded-md rounded-tl-none absolute top-0 transition-all ease-in-out duration-200'>
            <div onClick={handleDetail} className='bg-red-400 h-6 w-6 rounded-tr-md rounded-bl-md absolute right-0 font-semibold text-center text-white cursor-pointer'>x</div>

            {!data ? <span className='font-bold text-slate-400 absolute-center'>Loading...</span> :
            <div>
                <div>
                    <Image src="" alt="" />
                </div>
            </div>
            }
        </div>
    )
}

export default NewStudentDetail