
import React, { useEffect, useState } from 'react'
import './DonHangStyle.css'
import DialogDonHangCT from './DialogDonHangCT'

const DonHangComponent = ({ token }) => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [chekRender, setchekRender] = useState(true)
  const [listDHCT, setlistDHCT] = useState([])
  const [listDonHang, setListDonHang] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const fetchDHCT = async (idDonHang) => {
    try {
      const res = await fetch(apiUrl + '/chi-tiet-don-hang/' + idDonHang, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      if (!res.ok) {
        throw new Error('Fetch failed');
      }
      const data = await res.json()
      // console.log(data.data)

      setlistDHCT(data.data)

    } catch (error) {
      console.log(error.message);
      // alert(error.message)
    }
  }
  const fetchDonHang = async () => {
    try {
      const res = await fetch(apiUrl + '/don-hang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Thêm token vào header
        },
      })
      if (!res.ok) {
        throw new Error('Fetch failed');
      }
      const data = await res.json()
      // console.log(data.data);
      setListDonHang(data.data)

    } catch (error) {
      alert(error.message)
      console.log(error.message);

    }
  }
  const duyetDon = async (id) => {
    try {
      const res = await fetch(apiUrl + '/don-hang/duyet-don/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Thêm token vào header
        },
      })
      if (!res.ok) {
        throw new Error('Fetch failed');
      }
      const data = res.json()
      console.log(data);
      setchekRender(!chekRender)

    } catch (error) {
      alert(error.message)
      console.log(error.message);
    }
  }
  useEffect(() => {

    fetchDonHang()
  }, [chekRender])


  return (
    <div className="order-management">
      <h2>Quản lý Đơn Hàng</h2>
      <DialogDonHangCT
        open={dialogOpen}
        onClose={handleCloseDialog}
        orderDetails={listDHCT}
      />
      {listDonHang.map((order) => (
        <div
          key={order._id}
          onClick={() => {
            fetchDHCT(order._id);
            handleOpenDialog();
          }}
          className="order-item"
        >
          <div className="order-item-details">
            <div className="order-id">Mã đơn: {order._id}</div>
            <div className="order-customer">Khách hàng: {order.idKhachHang.HoTen}</div>
            {order.idAdmin && (
              <div className="order-customer">Admin: {order.idAdmin.HoTen}</div>
            )}
            <div className="order-date">Ngày: {order.NgayDatHang}</div>
            <div className="order-status">{order.TrangThai}</div>
          </div>
          <div className="order-buttons">
            {order.TrangThai === 'Chờ duyệt' && (
              <button
                onClick={(event) => {
                  event.stopPropagation(); // Ngăn sự kiện lan lên
                  duyetDon(order._id);
                }}
                className="button"
              >
                Duyệt đơn
              </button>
            )}
          </div>
        </div>
      ))}

    </div>
  )
}

export default DonHangComponent