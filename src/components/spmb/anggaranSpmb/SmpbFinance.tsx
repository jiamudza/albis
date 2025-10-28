import React from 'react'
import CreditCard from './CreditCard'

const SmpbFinance = () => {
  return (
    <div className='p-3 relative-z-10 flex'>
        {/* Left */}
        <div className='flex-2/3'>
            <div className='flex gap-10'>
                <div className='flex-1/2'><CreditCard /></div>
                <div className='flex-1/2'><CreditCard /></div>

            </div>
        </div>
        {/* Right */}
        <div className='flex-1/3'>Right</div>
    </div>
  )
}

export default SmpbFinance