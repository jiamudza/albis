import React from 'react'
import { GiSoundWaves } from 'react-icons/gi'

const CreditCard = () => {
  return (
    <div className='p-2 h-48 border border-white/20 bg-accent rounded-md backdrop-blur-sm relative'>
        <div className='flex justify-between'>
            <p className='text-xs font-semibold'>SPMB SMPIT Al Banna</p>
            <GiSoundWaves />
        </div>

        <div className='mt-18'>
            <p className='text-sm'>8332-4400-0000-2026</p>
        </div>
        <div className='flex justify-between items-center'>

            <div className='flex justify-start gap-3 items-center text-xs mt-5'>
                <div className='flex flex-col'>
                    <p>Valid</p>
                    <p>Sampai</p>
                </div>
                <div>12/28</div>
            </div>

            <p className='text-xs font-bold text-purple-800'>Mastercard</p>
        </div>
    </div>
  )
}

export default CreditCard