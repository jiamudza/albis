"use client"
import React, { useState } from 'react'
import { darkColor } from '@/utils/darkColor'

const eventList = [
    {
        id: 2,
        title: "Pembukaan PPDB",
        start: new Date(2025, 10, 1),
        end: new Date(2025, 10, 2)
    },
    {   id: 3,
        title: "Masa Orientasi Siswa",
        start: new Date(2026, 6, 5),
        end: new Date(2026, 6, 8)
    },
    {   id: 1,
        title: "Ujian Tengah Semester",
        start: new Date(2025, 9, 15),
        end: new Date(2025, 9, 20)
    },
]

const darkColorRandom = darkColor()

const sortedEvent = eventList.sort((a, b) => a.id - b.id)

const EventCard = () => {

    console.log(darkColor())
    const [color] = useState(eventList.map(() => darkColor()))
  return (
    <div>
        {sortedEvent.map((item, i) => (
            <div 
            key={item.id}
            style={{backgroundColor: color[i]}}
            className={`text-white px-3 py-2 mt-2 rounded-md`}>
                <span className='text-sm font-semibold'>{item.title}</span>
                <div className='text-xs mt-1'>
                    <div className='flex items-center justify-start gap-2 rounded-full bg-white text-text px-2 py-1'>
                        <span className='font-semibold'>Mulai:</span>
                        <span>
                            {item.start.toLocaleString('id-ID', {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}
                        </span>
                    </div>
                    <div className='flex items-center justify-start gap-2 rounded-full bg-white text-text px-2 py-1 mt-2'>
                        <span className='font-semibold'>Selesai:</span>
                        <span>
                            {item.end.toLocaleString('id-ID', {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}
                        </span>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default EventCard