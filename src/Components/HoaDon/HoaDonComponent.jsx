
import React, { useEffect, useState } from 'react'
import './HoaDonStyle.css';
import DialogDonHangCT from '../DonHang/DialogDonHangCT';
const HoaDonComponent = ({ token }) => {
    const apiUrl = process.env.REACT_APP_API_URL
    const [listHoaDon, setListHoaDon] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false);
    const [orderDetails, setorderDetails] = useState([])

    const fetchDHCT = async (idDonHang) => {
        try {
            const res = await fetch(apiUrl + '/chi-tiet-don-hang/' + idDonHang)
            if (!res.ok) {
                throw new Error('Fetch failed');
            }
            const data = await res.json()
            console.log(data.data);

            setorderDetails(data.data)

        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
    }




    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };
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
                if (!res.ok) {
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
                        <div className="invoice-customer">Khách hàng: {invoice.idDonHang.idKhachHang.HoTen} - SĐT: {invoice.idDonHang.idKhachHang.Sdt}</div>
                        {
                            invoice.idDonHang.idAdmin && (
                                <div className="invoice-customer">Admin: {invoice.idDonHang.idAdmin.HoTen} - SĐT: {invoice.idDonHang.idKhachHang.Sdt}</div>
                            )
                        }
                        <div className="invoice-date">Ngày nhận hàng: {invoice.NgayNhanHang}</div>

                        <div className="invoice-total">Tổng tiền: {invoice.TongTien.toLocaleString()} VND</div>
                    </div>
                    <div className="invoice-buttons">
                        <button onClick={() => {
                            fetchDHCT(invoice.idDonHang._id)
                            handleOpenDialog()
                        }} className="button" >
                            Xem chi tiết
                        </button>

                    </div>
                </div>
            ))}
            <DialogDonHangCT
                open={dialogOpen}
                onClose={handleCloseDialog}
                orderDetails={orderDetails}
            />
        </div>
    )
}

export default HoaDonComponent