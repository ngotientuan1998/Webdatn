import React, { useState, useEffect } from "react";
import axios from "axios";
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
    const [currentDate, setCurrentDate] = useState(new Date());
    const [weeklyRevenueData, setWeeklyRevenueData] = useState(null); // Data từ API
    const [totalRevenue, setTotalRevenue] = useState(0); // Tổng doanh thu
    const apiUrl = process.env.REACT_APP_API_URL
    //hàm lấy ngày tháng năm hiện tại
    // function getdaynow() {
    //     const today = new Date();
    //     const day = today.getDate(); // Lấy ngày
    //     const month = today.getMonth() + 1; // Lấy tháng (bắt đầu từ 0, nên cộng thêm 1)
    //     const year = today.getFullYear(); // Lấy năm
    //     const daysOfWeek = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    //     const dayOfWeek = daysOfWeek[today.getDay()]; // Lấy tên thứ trong tuần
    //     // Trả về ngày dưới dạng chuỗi "Ngày/Tháng/Năm"
    //     return `${day}/${month}/${year}`;
    // }
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

    // Lấy dữ liệu từ API khi component render hoặc khi tuần thay đổi
    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await axios.get(apiUrl + "/thong-ke/thongke", {
                    params: { startOfWeek, endOfWeek }
                });

                // Giả sử API trả về object với cấu trúc { dailyRevenue: [array của doanh thu từng ngày trong tuần] }
                const data = response.data;
                // console.log("Received Data: ", data);
                setWeeklyRevenueData(data.dailyRevenue || []);
                setTotalRevenue(data.totalRevenue || 0);

            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        };

        fetchRevenueData();
    }, [currentDate]);

    // Hàm để lấy số tuần của một ngày cụ thể
    const getWeekNumber = (date) => {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + 1) / 7);
    };

    // // Nếu chưa có dữ liệu, hiển thị loading
    // if (!weeklyRevenueData) {
    //     return <div>Loading...</div>;
    // }

    // Dữ liệu biểu đồ
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
                data: weeklyRevenueData,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            }
        ]
    };
    startOfWeek.setDate(startOfWeek.getDate() - 5)
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
            <h2 style={{ textAlign: 'center' }}>Thống kê doanh thu theo tuần</h2>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
            }}>
                <button onClick={handleBack} style={{
                    fontSize: '20px',
                    cursor: 'pointer',
                    background: 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                }}>←</button>
                <span style={{ margin: '0 15px', textAlign: 'center' }}>
                    Doanh thu tuần {getWeekNumber(currentDate)} từ ngày {startOfWeek.getDate()} đến {endOfWeek.getDate()} tháng {endOfWeek.getMonth() + 1} năm {endOfWeek.getFullYear()}
                </span>
                <button onClick={handleNext} style={{
                    fontSize: '20px',
                    cursor: 'pointer',
                    background: 'blue',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                }}>→</button>
            </div>
            <div>
                <Bar data={chartData} options={chartOptions} />
                <h4>Tổng doanh thu: {totalRevenue ? totalRevenue.toLocaleString("vi-VN") : "0"} VND</h4>
            </div>
        </div>
    );
};

export default RevenueStatistics;
