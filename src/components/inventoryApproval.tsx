'use client'
import React from 'react'

const borrowRequests = [
    {
        id: 1,
        item: 'Proyektor',
        requester: 'Susi Mufida H.',
        date: '2025-10-01',
        time: '10:00',
        status: 'Menunggu',
    },
    {
        id: 2,
        item: 'Laptop',
        requester: 'M. Saepulanam',
        date: '2025-10-02',
        time: '14:30',
        status: 'Menunggu',
    },
    {
        id: 3,
        item: 'Kamera',
        requester: 'Dinda Permata S.',
        date: '2025-10-03',
        time: '09:15',
        status: 'Menunggu',
    },
    {
        id: 4,
        item: 'Kamera',
        requester: 'Vina Agustina',
        date: '2025-10-03',
        time: '09:15',
        status: 'Menunggu',
    },
];

const InventoryApproval = () => {
    return (
        <div className='bg-white px-2 rounded-md shadow-md border-b-3 h-[58vh] border-third overflow-auto scrollbar-hide relative'>
            <div className='flex justify-between items-center sticky top-0 bg-white h-10'>
                <p className='text-sm text-text font-semibold'>Peminjaman</p>
                <p>...</p>
            </div>
            {borrowRequests.map((request) => (
                <div key={request.id} className='mb-2 p-2 border-b border-gray-200 flex justify-between items-center'>
                    <div>
                        <p className='text-sm font-semibold'>{request.item}</p>
                        <p className='text-xs text-text'>Pemohon: {request.requester}</p>
                        <p className='text-xs text-text'>Tanggal: {request.date}</p>
                        <p className='text-[10px] text-text'>waktu: {`${request.time} WIB`}</p>
                        <p className={`text-xs font-semibold ${request.status === 'Menunggu' ? 'text-orange-400' : request.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                            Status: {request.status}
                        </p>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <button className='bg-amber-500 text-white text-xs px-2 py-1 rounded-full cursor-pointer'>Tolak</button>
                        <button className='bg-primary text-white text-xs px-2 py-1 rounded-full cursor-pointer'>Setujui</button>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default InventoryApproval