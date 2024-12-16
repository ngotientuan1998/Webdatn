import React, { useEffect, useState } from 'react';
import './DonHangStyle.css';
import DialogDonHangCT from './DialogDonHangCT';

const DonHangComponent = ({ token }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [chekRender, setchekRender] = useState(true);
  const [listDHCT, setlistDHCT] = useState([]);
  const [listDonHang, setListDonHang] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
  
    // Định dạng ngày, tháng, năm
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    // Định dạng giờ, phút, giây
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    // Kết hợp
    return `${day}/${month}/${year}\ngiờ: ${hours}:${minutes}:${seconds}`;
  };
  const fetchDHCT = async (idDonHang) => {
    try {
      const res = await fetch(apiUrl + '/chi-tiet-don-hang/' + idDonHang, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Fetch failed');
      }
      const data = await res.json();
      setlistDHCT(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchDonHang = async () => {
    try {
      const res = await fetch(apiUrl + '/don-hang', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        console.log('Error:', errorData.message);
        throw new Error('Fetch failed');
      }
      const data = await res.json();
      setListDonHang(data.data);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };
  const xacNhanDon = async (id) => {
    try {
      const res = await fetch(apiUrl + '/don-hang/xac-nhan-don/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        console.log('Error:', errorData.message);
        throw new Error('Fetch failed');
      }
      const data = await res.json()
      alert(data.message)
      setchekRender(!chekRender);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }
  const huyDon = async (id) => {
    try {
      const res = await fetch(apiUrl + '/don-hang/huy-admin/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        console.log('Error:', errorData.message);
        throw new Error('Fetch failed');
      }
      const data = await res.json()
      alert(data.message)
      setchekRender(!chekRender);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }
  const duyetDon = async (id) => {
    try {
      const res = await fetch(apiUrl + '/don-hang/duyet-don/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        console.log('Error:', errorData.message);
        throw new Error('Fetch failed');
      }
      const data = await res.json();
      // console.log(data);
      setchekRender(!chekRender);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value); // Update filter status
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
  };

  useEffect(() => {
    fetchDonHang();
  }, [chekRender]);

  const filteredOrders = listDonHang
    .filter(order => {
      return statusFilter ? order.TrangThai === statusFilter : true;
    })
    .filter(order => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        order.idKhachHang?.HoTen.toLowerCase().includes(searchTerm) ||
        order.idAdmin?.HoTen.toLowerCase().includes(searchTerm)
      );
    });

  return (
    <div className="order-management">
      <h2>Quản lý Đơn Hàng</h2>
      <DialogDonHangCT
        open={dialogOpen}
        onClose={handleCloseDialog}
        orderDetails={listDHCT}
      />

      {/* Tìm kiếm đơn hàng */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên khách hàng hoặc admin"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        {/* Bộ lọc trạng thái */}
        <div className="filter-container">
          <select onChange={handleStatusChange} value={statusFilter}>
            <option value="">Tất cả</option>
            <option value="Chờ duyệt">Chờ duyệt</option>
            <option value="Đang vận chuyển">Đang vận chuyển</option>
            <option value="Thành công">Đã hoàn thành</option>
            <option value="Hủy">Đã hủy</option>
          </select>
        </div>
      </div>




      <table className="order-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã đơn</th>
            <th>Khách hàng <br /> (SĐT)</th>
            <th>Admin <br /> (SĐT)</th>
            <th>Ngày đặt hàng <br /> (Địa chỉ)</th>
            <th>Trạng thái</th>
            <th>Tổng tiền (VND)</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, index) => (
            <tr
              key={order._id}
              onClick={() => {
                fetchDHCT(order._id);
                handleOpenDialog();
              }}
              className="order-row"
            >
              <td>{index + 1}</td>
              <td>{order._id}</td>
              <td>{order.idKhachHang?.HoTen} <br /> <span className="username">({order.idKhachHang.Sdt})</span></td>
              <td>{order.idAdmin?.HoTen || 'N/A'} <br /> <span className="username">({order.idAdmin?.Sdt || 'N/A'})</span> </td>
              <td>{formatDate(order.NgayDatHang)} <br /> <span className="username">({order.idKhachHang?.DiaChi || 'N/A'})</span> </td>
              <td>{order.TrangThai}</td>
              <td>{order.TongTien}VND</td>
              <td>
                {order.TrangThai === 'Chờ duyệt' && (
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      duyetDon(order._id);
                    }}
                    className="button"
                  >
                    Duyệt đơn
                  </button>
                )}
                {order.TrangThai === 'Đang vận chuyển' && (
                  <div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        xacNhanDon(order._id)
                      }}
                      className="button-thanhcong"
                    >
                      Thành công
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        huyDon(order._id)
                      }}
                      className="button-huy"
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonHangComponent;
