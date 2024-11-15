// ChiTietSanPhamItem.jsx
import React from 'react';
import './ItemChiTietSP.css'; // Import file CSS riêng

const ItemChiTietSP = ({ chiTietSanPham}) => {
  

  return (
    <div className="product-detail-item">
      <div className="product-detail-content">
        <div className="product-images">
          {chiTietSanPham.idSanPham.anhSP.map((url, index) => (
            <img key={index} src={process.env.REACT_APP_API_URL+url} alt="Sản phẩm" className="product-image" />
          ))}
        </div>
        <div className="product-details">
          <p><strong>Màu sắc:</strong> {chiTietSanPham.MauSac}</p>
          <p><strong>RAM:</strong> {chiTietSanPham.Ram}</p>
          <p><strong>SSD:</strong> {chiTietSanPham.SSD}</p>
          <p><strong>Màn hình:</strong> {chiTietSanPham.ManHinh}</p>
          <p><strong>Số lượng:</strong> {chiTietSanPham.SoLuong}</p>
          <p><strong>Giá:</strong> {chiTietSanPham.Gia.toLocaleString()} VND</p>
          <p><strong>Mô tả:</strong> {chiTietSanPham.MoTa}</p>
        </div>
      </div>
      <div className="product-edit-button">
        <button >Sửa</button>
      </div>
    </div>
  );
};

export default ItemChiTietSP;
