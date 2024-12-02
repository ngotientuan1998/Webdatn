import React from 'react';
import './UserInfo.css';

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <div className="user-avatar">
        <img
          src={user.Avatar || 'https://via.placeholder.com/150'}
          alt="Avatar"
          className="avatar-img"
        />
      </div>
      <div className="user-details">
        <h2>{user.HoTen || 'Chưa cập nhật'}</h2>
        <p><strong>Email:</strong> {user.Email || 'Chưa cập nhật'}</p>
        <p><strong>Số điện thoại:</strong> {user.Sdt || 'Chưa cập nhật'}</p>
        <p><strong>Ngày sinh:</strong> {user.Tuoi ? new Date(user.Tuoi).toLocaleDateString() : 'Chưa cập nhật'}</p>
        <p><strong>Địa chỉ:</strong> {user.DiaChi || 'Chưa cập nhật'}</p>
        <p><strong>Vai trò:</strong> {user.Role || 'Khách hàng'}</p>
      </div>
    </div>
  );
};

export default UserInfo;
