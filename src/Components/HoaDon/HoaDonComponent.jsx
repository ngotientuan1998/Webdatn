
import React, { useEffect, useState } from 'react'
import './HoaDonStyle.css';
const HoaDonComponent = ({ token }) => {
    const apiUrl = process.env.REACT_APP_API_URL
    const [listHoaDon, setListHoaDon] = useState([])
    useEffect(() => {
        const fetchHoaDon = async () => {
            try {
                const res = await fetch(apiUrl + '/hoa-don/admin', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,  // Thêm token vào header
                    }
                })
                if(!res.ok){
                    throw new Error('Fetch failed');
                }
                const data = await res.json()
                console.log(data.data);
                setListHoaDon(data.data)
            } catch (error) {
                console.log(error.message);
                alert(error.message)
                
            }
            
        }
        fetchHoaDon()
    }, [])
    return (
        <div className="invoice-management">
            <h1>Quản lý Hóa Đơn</h1>
            {listHoaDon.map((invoice) => (
                <div key={invoice._id} className="invoice-item">
                    <div className="invoice-item-details">
                        <div className="invoice-id">Mã hóa đơn: {invoice._id}</div>
                        <div className="invoice-customer">Khách hàng: {invoice.idDonHang.idKhachHang.HoTen}</div>
                        {
                            invoice.idDonHang.idAdmin && (
                                <div className="invoice-customer">Khách hàng: {invoice.idDonHang.idAdmin.HoTen}</div>
                            )
                        }
                        {/* <div className="invoice-date">Ngày lập: {invoice.date}</div>
                        <div className="invoice-status">Trạng thái: {invoice.status}</div>
                        <div className="invoice-total">Tổng tiền: {invoice.total.toLocaleString()} VND</div> */}
                    </div>
                    <div className="invoice-buttons">
                        <button className="button" >
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HoaDonComponent