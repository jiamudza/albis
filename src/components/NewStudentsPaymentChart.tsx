import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: "Akademik", Sudah: 14, Belum: 2 },
    { name: "Tahta", Sudah: 13, Belum: 4 },
    { name: "Observasi", Sudah: 17, Belum: 2 },
    { name: "Seragam", Sudah: 19, Belum: 1 },
];

const NewStudentPaymentChart = () => {
    return (
        <div className="flex-1/3 border-b-3 pb-0 border-blue-300 shadow-md rounded-md overflow-hidden">
            <div className="text-sm font-semibold p-2 text-text">Observasi</div>

            <div className="flex justify-center items-center gap-5">
                <div className="flex justify-center items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-300"></div>
                    <p className="text-xs font-semibold text-blue-500">Sudah</p>
                </div>
                <div className="flex justify-center items-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-pink-300"></div>
                    <p className="text-xs font-semibold text-pink-500">Belum</p>
                </div>
            </div>

            {/* ✅ Tambahan pembungkus tinggi tetap */}
            <div className="w-full h-48 md:h-56 px-2">
                <ResponsiveContainer width="100%" height="100%" debounce={300}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 8 }}
                            interval={0}
                            dy={5}
                        />
                        <Tooltip />
                        <Bar
                            dataKey="Sudah"
                            fill="oklch(80.9% 0.105 251.813)"
                            barSize={30}
                            name="Sudah Tes"
                        />
                        <Bar
                            dataKey="Belum"
                            fill="#fda5d5"
                            barSize={30}
                            name="Belum Tes"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default NewStudentPaymentChart;
