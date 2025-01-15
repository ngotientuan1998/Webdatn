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
    const [weeklyRevenueData, setWeeklyRevenueData] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalRevenueRange, setTotalRevenueRange] = useState(0);
    const apiUrl = process.env.REACT_APP_API_URL;

    const getWeekRange = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay() + 1);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return { startOfWeek, endOfWeek };
    };

    const { startOfWeek, endOfWeek } = getWeekRange(currentDate);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await axios.get(apiUrl + "/thong-ke/thongke", {
                    params: { startOfWeek, endOfWeek }
                });
                const data = response.data;
                setWeeklyRevenueData(data.dailyRevenue || []);
                setTotalRevenue(data.totalRevenue || 0);
            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        };

        fetchRevenueData();
    }, [currentDate]);

    const fetchTotalRevenueRange = async () => {
        console.log('vào đ');

        if (!startDate || !endDate) {
            alert("Vui lòng chọn khoảng thời gian hợp lệ.");
            return;
        }

        try {
            const response = await axios.get(apiUrl + "/thong-ke/thongke_ktg", {
                params: { startDate, endDate }
            });
            const data = response.data;
            setTotalRevenueRange(data.totalRevenue || 0);
        } catch (error) {
            console.error("Error fetching total revenue for range:", error);
        }
    };

    const getWeekNumber = (date) => {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + 1) / 7);
    };

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

    const handleBack = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    return (
        <div>
            <div style={{ marginTop: '20px', textAlign: 'center',top:'0' }}>

                <label>
                    Từ ngày:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ marginLeft: '10px', marginRight: '20px', width: '100px' }}
                    />
                </label>
                <label>
                    Đến ngày:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ marginLeft: '10px', width: '100px' }}
                    />
                </label>
                <button onClick={fetchTotalRevenueRange} style={{
                    fontSize: '16px',
                    cursor: 'pointer',
                    background: 'green',
                    color: 'white',
                    border: 'none',
                    marginLeft: '10px',
                    borderRadius: '5px',
                    padding: '5px 10px',
                }}>Xem tổng doanh thu</button>
                <h4 style={{ marginTop: '20px' }}>Tổng doanh thu từ {startDate} đến {endDate}: {totalRevenueRange ? totalRevenueRange.toLocaleString("vi-VN") : "0"} VND</h4>


            </div>
            <h2 style={{ textAlign: 'center' }}>Thống kê doanh thu theo tuần</h2>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                
            }}>
                <button onClick={handleBack} style={{
                    fontSize: '10px',
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
                <h4>Tổng doanh thu theo tuần: {totalRevenue ? totalRevenue.toLocaleString("vi-VN") : "0"} VND</h4>
            </div>

        </div>
    );
};

export default RevenueStatistics;