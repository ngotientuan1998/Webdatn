import React from 'react';
import './StyleDialog.css'; // Giả sử bạn đã có CSS cho dialog

const DialogThemChiTietSP = ({ open, onClose }) => {
    if (!open) return null; // Nếu dialog không mở, không hiển thị gì

    return (
        <div className="dialog-overlay">
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2>Thêm Chi Tiết Sản Phẩm</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="dialog-content">
                    {/* Các trường nhập liệu */}
                    <div className="dialog-input-group">
                        <label>Màu Sắc:</label>
                        <input type="text" name="MauSac" placeholder="Nhập màu sắc" />
                    </div>
                    <div className="dialog-input-group">
                        <label>RAM:</label>
                        <input type="text" name="Ram" placeholder="Nhập dung lượng RAM" />
                    </div>
                    <div className="dialog-input-group">
                        <label>SSD:</label>
                        <input type="text" name="SSD" placeholder="Nhập dung lượng SSD" />
                    </div>
                    <div className="dialog-input-group">
                        <label>Màn Hình:</label>
                        <input type="text" name="ManHinh" placeholder="Nhập kích thước màn hình" />
                    </div>
                    <div className="dialog-input-group">
                        <label>Số Lượng:</label>
                        <input type="number" name="SoLuong" placeholder="Nhập số lượng" />
                    </div>
                    <div className="dialog-input-group">
                        <label>Giá:</label>
                        <input type="number" name="Gia" placeholder="Nhập giá sản phẩm" />
                    </div>
                    <div className="dialog-input-group">
                        <label>Mô Tả:</label>
                        <textarea name="MoTa" placeholder="Nhập mô tả sản phẩm"></textarea>
                    </div>
                </div>
                <div className="dialog-footer">
                    <button className="close-dialog-button" onClick={onClose}>Đóng</button>
                    <button className="save-dialog-button" onClick={onClose}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default DialogThemChiTietSP;
