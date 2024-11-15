
import React, { useEffect, useState } from 'react'
import './DonHangStyle.css'

const DonHangComponent = ({ token }) => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [chekRender, setchekRender] = useState(true)

  const [listDonHang, setListDonHang] = useState([])
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
      if(!res.ok){
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

  // const handleApprove = (orderId) => {
  //   // Xử lý duyệt đơn hàng
  //   setOrders(orders.map((order) =>
  //     order.id === orderId ? { ...order, status: 'Đã duyệt' } : order
  //   ));
  //   console.log('Duyệt đơn hàng:', orderId);
  // };
  return (
    <div className="order-management">
      <h1>Quản lý Đơn Hàng</h1>
      {listDonHang.map((order) => (
        <div key={order._id} className="order-item">
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
            {
              order.TrangThai === 'Chờ duyệt' && (
                <button onClick={()=> duyetDon(order._id)} className="button" >
                  Duyệt đơn
                </button>
              )
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default DonHangComponent