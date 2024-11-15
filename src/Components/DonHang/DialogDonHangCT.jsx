
import React, { useEffect } from 'react'
import './StyleDialog.css'
const DialogDonHangCT = ({ open, onClose, orderDetails }) => {
    useEffect(() => {
        if (open) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [open]);
    
      if (!open) return null;
    

    return (
        <div className="dialog-overlay">
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2>Chi tiết đơn hàng</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="dialog-content">
                    {orderDetails.length > 0 ? (
                        <ul className="order-details-list">
                            {orderDetails.map((item) => (
                                <li key={item._id} className="order-item">
                                    <p><strong>Sản phẩm:</strong> {item.idSanPhamCT.idSanPham.tenSP}</p>
                                    <p><strong>Số lượng:</strong> {item.SoLuongMua}</p>
                                    <p><strong>Giá:</strong> {item.idSanPhamCT.Gia.toLocaleString()} VND</p>
                                    <p><strong>Thành tiền:</strong> {item.TongTien.toLocaleString()} VND</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Không có chi tiết đơn hàng.</p>
                    )}
                </div>
                <div className="dialog-footer">
                    <button className="close-dialog-button" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    )
}

export default DialogDonHangCT