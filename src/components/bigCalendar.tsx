'use client'
import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

const BigCalendar = () => {
  return (
    <div className='bg-white px-0 rounded-md border-b-3 border-third shadow-md font-poppins'>
        <Calendar
      localizer={localizer}
      events={[
        {
          title: '2025 Event',
          start: new Date(2025, new Date().getMonth(), new Date().getDate()),
          end: new Date(2025, new Date().getMonth(), new Date().getDate() + 1),
        }
      ]}

      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </div>
  )
}

export default BigCalendar