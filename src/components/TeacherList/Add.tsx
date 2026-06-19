import React from 'react'

const AddTeacher = ({ add, handleAdd }: { add: boolean, handleAdd: () => void }) => {
    return (
        <div className='bg-transparent h-screen w-full px-3 py-2 top-0 left-10 z-20 overflow-hidden'>
            <div className='bg-white h-full rounded-md w-full border-b-4 border border-slate-200 border-b-accent shadow-md relative px-3 py-2'>
                <button
                    onClick={handleAdd}
                    aria-label="Close"
                    className="float-right w-8 h-8 bg-red-400 text-white flex items-center justify-center rounded-tr-md rounded-bl-md absolute top-0 right-0 hover:bg-red-500 cursor-pointer">
                    x
                </button>
                <h2 className='text-xl font-bold '>Tambah Guru</h2>
                {/* Form fields go here */}
                <form className='mt-3 text-xs'>
                    <div className='flex flex-col md:flex-row gap-3'>

                        {/* left form */}
                        <div className='flex-1/3'>
                            <div className='mt-1'>
                                <label className='font-semibold'>Nama Lengkap</label>
                                <input type="text" className='w-full border border-slate-300 rounded-md p-2 mt-1 mb-3 focus:outline-0 text-sm' placeholder='Masukkan nama lengkap' />
                            </div>
                            <div className='mt-1'>
                                <label className='font-semibold'>Nama Panggilan</label>
                                <input type="text" className='w-full border border-slate-300 rounded-md p-2 mt-1 mb-3 focus:outline-0 text-sm' placeholder='Masukkan nama panggilan' />
                            </div>
                            <div className='mt-1'>
                                <label className='font-semibold'>NIY</label>
                                <input type="text" className='w-full border border-slate-300 rounded-md p-2 mt-1 mb-3 focus:outline-0 text-sm' placeholder='Masukkan Nomor Induk Yayasan' />  
                            </div>
                        </div>

                        {/* middle form */}
                        <div className='flex-1/3'>
                            <div>
                                <label className='font-semibold'>Nama Lengkap</label>
                                <input type="text" className='w-full border border-slate-300 rounded-md p-2 mt-1 mb-3 focus:outline-0 text-sm' placeholder='Masukkan nama lengkap' />
                            </div>
                        </div>

                        {/* right form */}
                        <div className='flex-1/3'>
                            <div>
                                <label className='font-semibold'>Nama Lengkap</label>
                                <input type="text" className='w-full border border-slate-300 rounded-md p-2 mt-1 mb-3 focus:outline-0 text-sm' placeholder='Masukkan nama lengkap' />
                            </div>
                        </div>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default AddTeacher