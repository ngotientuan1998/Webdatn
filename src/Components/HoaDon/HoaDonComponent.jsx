import React, { useEffect, useState } from 'react';
import './HoaDonStyle.css';
import DialogDonHangCT from '../DonHang/DialogDonHangCT';

const HoaDonComponent = ({ token }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [listHoaDon, setListHoaDon] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDHCT = async (idDonHang) => {
    try {
      const res = await fetch(apiUrl + '/chi-tiet-don-hang/' + idDonHang, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Fetch failed');
      }
      const data = await res.json();
      setOrderDetails(data.data);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchHoaDon = async () => {
      try {
        const res = await fetch(apiUrl + '/hoa-don/admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('Fetch failed');
        }
        const data = await res.json();
        setListHoaDon(data.data);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };
    fetchHoaDon();
  }, [token]);

  const filteredInvoices = listHoaDon.filter((invoice) => {
    const customerName = invoice.idDonHang.idKhachHang.HoTen.toLowerCase();
    const adminName = invoice.idDonHang.idAdmin ? invoice.idDonHang.idAdmin.HoTen.toLowerCase() : '';
    return customerName.includes(searchQuery) || adminName.includes(searchQuery);
  });

  return (
    <div className="invoice-management">
      <h1>Quản lý Hóa Đơn</h1>

      {/* Tìm kiếm */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên khách hàng hoặc admin"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Bảng Hóa Đơn */}
      <table className="invoice-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã hóa đơn</th>
            <th>Khách hàng <br/> (SĐT)</th>
            <th>Admin <br/> (SĐT)</th>
            <th>Ngày nhận hàng</th>
            <th>Tổng tiền</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice,index) => (
            <tr key={invoice._id}>
                <td>{index+1}</td>
              <td>{invoice._id}</td>
              <td>{invoice.idDonHang.idKhachHang.HoTen}<br/> ({invoice.idDonHang.idKhachHang.Sdt})</td>
              <td>{invoice.idDonHang.idAdmin?.HoTen || 'N/A'}<br/> ({invoice.idDonHang.idAdmin?.Sdt ||'N/A'})</td>
              <td>{invoice.NgayNhanHang}</td>
              <td>{invoice.TongTien.toLocaleString()} VND</td>
              <td>
                <button
                  onClick={() => {
                    fetchDHCT(invoice.idDonHang._id);
                    handleOpenDialog();
                  }}
                  className="button"
                >
                  Xem chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DialogDonHangCT
        open={dialogOpen}
        onClose={handleCloseDialog}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default HoaDonComponent;
