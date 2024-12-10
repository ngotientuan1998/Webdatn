import React, { useEffect, useState } from 'react';
import DialogThemUser from './DialogThemUser';
import './Style.css';

const KhachHangComponent = ({ token }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [listKhachHang, setListKhachHang] = useState([]);
  const [filteredKhachHang, setFilteredKhachHang] = useState([]);
  const [filterRole, setFilterRole] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State cho tìm kiếm
  const [isOpenDialogThem, setisOpenDialogThem] = useState(false);

  const onClose = () => setisOpenDialogThem(!isOpenDialogThem);

  const fetchKhachHang = async () => {
    try {
      const res = await fetch(apiUrl + '/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Fetch failed');
      }
      const data = await res.json();
      setListKhachHang(data.data);
      setFilteredKhachHang(data.data); // Khởi tạo danh sách lọc bằng toàn bộ danh sách
    } catch (error) {
      console.log(error.message);
    }
  };

  // Lọc danh sách theo Role
  const handleFilterRole = (role) => {
    setFilterRole(role);
    filterList(searchTerm, role);
  };

  // Tìm kiếm và lọc danh sách
  const filterList = (term, role) => {
    let filtered = listKhachHang;

  // Lọc theo tên
  if (term) {
    const lowerCaseTerm = term.toLowerCase();
    filtered = filtered.filter((khachhang) =>
      khachhang.HoTen && khachhang.HoTen.toLowerCase().includes(lowerCaseTerm)
    );
  }

  // Lọc theo Role nếu có
  if (role) {
    filtered = filtered.filter((khachhang) => khachhang.Role === role);
  }

  setFilteredKhachHang(filtered);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterList(term, filterRole);
  };

  useEffect(() => {
    fetchKhachHang();
  }, []);

  return (
    <div className="item-KhachHang">
      <h1>Danh sách người dùng</h1>
      <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button className="add-user-button" onClick={onClose}>
          Thêm User
        </button>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="filter-select"
          value={filterRole}
          onChange={(e) => handleFilterRole(e.target.value)}
          style={{ padding: '5px', fontSize: '12px' }}
        >
          <option value="">Tất cả</option>
          <option value="admin">Admin</option>
          <option value="Khách hàng">Khách hàng</option>
        </select>
      </div>
      {isOpenDialogThem && <DialogThemUser token={token} onClose={onClose} fetchKhachHang={fetchKhachHang} />}
      <div className="customer-list">
        <table className="customer-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Họ tên (Tên người dùng)</th>
              <th>Tuổi</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredKhachHang.map((khachhang, index) => (
              <tr key={khachhang._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={
                      khachhang.Avatar ||
                      'https://www.pngkit.com/png/full/115-1150342_user-avatar-icon-iconos-de-mujeres-a-color.png'
                    }
                    alt={`${khachhang.HoTen}'s avatar`}
                    className="avatar"
                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                  />
                </td>
                <td>
                  {khachhang.HoTen} <span className="username">({khachhang.UserName})</span>
                </td>
                <td>{khachhang.Tuoi || 'Không có'}</td>
                <td>{khachhang.Email}</td>
                <td>{khachhang.Sdt || 'Không có'}</td>
                <td>{khachhang.DiaChi || 'Không có'}</td>
                <td>{khachhang.Role}</td>
                <td>
                  <button className="edit-button">Sửa</button>
                  <button className="delete-button">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KhachHangComponent;
