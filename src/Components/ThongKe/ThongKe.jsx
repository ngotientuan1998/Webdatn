import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RevenueStatistics = () => {
    const [currentDate, setCurrentDate] = useState(new Date("2024-05-18"));

    // Hàm để tính toán ngày bắt đầu và kết thúc của tuần hiện tại
    const getWeekRange = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Bắt đầu tuần (Thứ Hai)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Kết thúc tuần (Chủ Nhật)
        return { startOfWeek, endOfWeek };
    };

    // Cập nhật ngày bắt đầu và kết thúc của tuần hiện tại
    const { startOfWeek, endOfWeek } = getWeekRange(currentDate);

    // Mock data cho doanh thu từng ngày trong tuần
    const mockWeeklyRevenueData = {
        dailyRevenue: [5000000, 7500000, 3000000, 9000000, 4500000, 6000000, 8000000]
    };

    // Tính tổng doanh thu của tuần
    const totalRevenue = mockWeeklyRevenueData.dailyRevenue.reduce((acc, curr) => acc + curr, 0);

    const chartData = {
        labels: [
            startOfWeek.toLocaleDateString("vi-VN"),
            new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString("vi-VN"),
            new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString("vi-VN"),
            new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString("vi-VN"),
            new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString("vi-VN"),
            new Date(startOfWeek.setDate(startOfWeek.getDate() + 1)).toLocaleDateString("vi-VN"),
            new Date(endOfWeek).toLocaleDateString("vi-VN"),
        ],
        datasets: [
            {
                label: "Doanh thu từng ngày",
                data: mockWeeklyRevenueData.dailyRevenue,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Thống kê doanh thu từ ${startOfWeek.toLocaleDateString("vi-VN")} đến ${endOfWeek.toLocaleDateString("vi-VN")}`
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Doanh thu (VND)"
                }
            }
        }
    };

    // Hàm xử lý khi nhấn nút Back
    const handleBack = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7); // Lùi 1 tuần
        setCurrentDate(newDate);
    };

    // Hàm xử lý khi nhấn nút Next
    const handleNext = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7); // Tiến 1 tuần
        setCurrentDate(newDate);
    };

    return (
        <div>
            <h2>Thống kê doanh thu theo tuần</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <button onClick={handleBack}>Back</button>
                <span style={{ margin: '0 15px' }}>
                    Doanh thu ngày {startOfWeek.getDate()} - {endOfWeek.getDate()} tháng {endOfWeek.getMonth() + 1} năm {endOfWeek.getFullYear()}
                </span>
                <button onClick={handleNext}>Next</button>
            </div>
            <div>
                <Bar data={chartData} options={chartOptions} />
                <h4>Tổng doanh thu: {totalRevenue.toLocaleString("vi-VN")} VND</h4>
            </div>
        </div>
    );
};

export default RevenueStatistics;
