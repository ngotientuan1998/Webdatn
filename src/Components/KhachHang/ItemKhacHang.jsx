import React from 'react';
import './item.css';

const ItemKhacHang = ({
  UserName,
  HoTen,
  Tuoi,
  Email,
  Sdt,
  Avatar,
  DiaChi,
  Role,
  onEdit, // Hàm xử lý sửa
  onDelete, // Hàm xử lý xóa
}) => {
  return (
    <div className="customer-item">
      <div className="avatar-container">
        <img
          src={Avatar || 'https://www.pngkit.com/png/full/115-1150342_user-avatar-icon-iconos-de-mujeres-a-color.png'}
          alt={`${HoTen}'s avatar`}
          className="avatar"
        />
      </div>
      <div className="content-container">
        <div className="info-container">
          <h2 className="name">
            {HoTen} <span className="username">({UserName})</span>
          </h2>
          <p className="info">
            <strong>Tuổi:</strong> {Tuoi}
          </p>
          <p className="info">
            <strong>Email:</strong> {Email}
          </p>
          <p className="info">
            <strong>Số điện thoại:</strong> {Sdt}
          </p>
          <p className="info">
            <strong>Địa chỉ:</strong> {DiaChi}
          </p>
          <p className="info">
            <strong>Vai trò:</strong> {Role}
          </p>
        </div>

      </div>
      <div className="actions">
        <button className="edit-button" onClick={onEdit}>
          Sửa
        </button>
        <button className="delete-button" onClick={onDelete}>
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ItemKhacHang;
