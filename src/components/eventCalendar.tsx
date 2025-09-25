"use client"
import React, { useState } from 'react'
import Calendar from 'react-calendar';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
import 'react-calendar/dist/Calendar.css';


const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());
  return (
    <div className='p-4'>
        <Calendar locale='id-ID' onChange={onChange} value={value} />
    </div>
  )
}

export default EventCalendar