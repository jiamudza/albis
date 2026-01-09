import AddQuestion from '@/components/master/addQuestion'
import AddUser from '@/components/master/addUser'
import React from 'react'



const MasterData = () => {
  return (
    <div className='p-3'>
        <h3 className='font-bold text-blue-400'>Data Master</h3>
        <div className='mt-4 flex bg-white w-full rounded-md p-3 h-[80vh]'>
            <div className='flex-1/3'>
            {/* Add user */}
                <div>
                    <AddUser />
                </div>
                <div className='mt-2'>
                  <AddQuestion />
                </div>
            </div>

            {/* <div className='flex-1/3'>m</div>
            <div className='flex-1/3'>r</div> */}
        </div>
    </div>
  )
}

export default MasterData