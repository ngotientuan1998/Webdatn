import React, { useState } from 'react';
import './StyleDialog.css';

const DialogThemUser = ({ onClose, token, fetchKhachHang }) => {
  const [userData, setUserData] = useState({
    UserName: '',
    Password: '',
    HoTen: '',
    Tuoi: '',
    Email: '',
    Sdt: '',
    DiaChi: '',
    Role: 'Khách hàng',
  });

  const [errors, setErrors] = useState({});

  const validateData = () => {
    const newErrors = {};
    if (!userData.UserName.trim()) newErrors.UserName = 'Tên đăng nhập là bắt buộc!';
    if (!userData.Password.trim()) newErrors.Password = 'Mật khẩu là bắt buộc!';
    if (!userData.HoTen.trim()) newErrors.HoTen = 'Họ tên là bắt buộc!';
    if (!userData.Tuoi || userData.Tuoi <= 0) newErrors.Tuoi = 'Tuổi phải là số dương!';
    if (!userData.Email.trim() || !/\S+@\S+\.\S+/.test(userData.Email))
      newErrors.Email = 'Email không hợp lệ!';
    if (!userData.Sdt.trim() || !/^[0-9]{10}$/.test(userData.Sdt))
      newErrors.Sdt = 'Số điện thoại không hợp lệ!';
    if (!userData.DiaChi.trim()) newErrors.DiaChi = 'Địa chỉ là bắt buộc!';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Không có lỗi trả về true
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Xóa lỗi khi user nhập lại
  };

  const handleSave = async () => {
    if (!validateData()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        
        throw new Error(errorData.message);
      }
      const data = await response.json()

       alert(data.message);
       fetchKhachHang()
      onClose();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <h2>Thêm Người Dùng</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="dialog-content">
          {[
            { label: 'Tên đăng nhập:', name: 'UserName', type: 'text', placeholder: 'Nhập tên đăng nhập' },
            { label: 'Mật khẩu:', name: 'Password', type: 'password', placeholder: 'Nhập mật khẩu' },
            { label: 'Họ tên:', name: 'HoTen', type: 'text', placeholder: 'Nhập họ tên' },
            { label: 'Tuổi:', name: 'Tuoi', type: 'number', placeholder: 'Nhập tuổi' },
            { label: 'Email:', name: 'Email', type: 'email', placeholder: 'Nhập email' },
            { label: 'Số điện thoại:', name: 'Sdt', type: 'text', placeholder: 'Nhập số điện thoại' },
            { label: 'Địa chỉ:', name: 'DiaChi', type: 'text', placeholder: 'Nhập địa chỉ' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="dialog-input-group">
              <label>{label}</label>
              <input
                type={type}
                name={name}
                value={userData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={errors[name] ? 'error-input' : ''}
              />
              {errors[name] && <span className="error-message">{errors[name]}</span>}
            </div>
          ))}
          <div className="dialog-input-group">
            <label>Vai trò:</label>
            <select name="Role" value={userData.Role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="Khách hàng">Khách hàng</option>
            </select>
          </div>
        </div>
        <div className="dialog-footer">
          <button className="close-dialog-button" onClick={onClose}>
            Hủy
          </button>
          <button className="save-dialog-button" onClick={handleSave}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogThemUser;
