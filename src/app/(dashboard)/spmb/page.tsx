import NewStudentsChart from '@/components/newStudentChart'
import React from 'react'

const SPMB = () => {
    return (
        <div className=''>
            
            <div className='flex flex-col lg:flex-row gap-2'>
                {/* left */}
                <div className='flex-2/3 p-3' >
                <h3 className='font-bold text-lg text-primary'>SPMB</h3>
                
                
                </div>
                {/* right */}
                <div className='flex-1/3 bg-white'>
                    <NewStudentsChart />
                </div>
            </div>
        </div>
    )
}

export default SPMB