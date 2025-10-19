import NewStudentsChart from '@/components/newStudentChart';
import NewStudentGenderChart from '@/components/NewStudentGenderChart';
import NewStudentPaymentChart from '@/components/NewStudentsPaymentChart';
import NewStudentsRegistChart from '@/components/NewStudentsRegistChart';
import React from 'react'

type Program = {
    kategori: string
    name: string;
    value: number;
}[]

const NewStudentChartWrapper = ({ program, gender, pembayaran }: { program: Program, gender: Program, pembayaran: Program }) => {
    return (
        <div>
            <div className='flex flex-col md:flex-row justify-center items-stretch relative z-0 gap-2 flex-wrap h-full overflow-hidden'>
                <NewStudentsChart programSummary={program} />
                <NewStudentGenderChart gender={gender} />
            </div>

            <div className='mt-10 flex flex-col md:flex-row gap-2'>
                <NewStudentPaymentChart />
                <NewStudentsRegistChart pembayaran={pembayaran} />
                {/* <NewStudentsChart programSummary={program} /> */}

                {/* <NewStudentPaymentChart /> */}
            </div>
        </div>
    )
}

export default NewStudentChartWrapper