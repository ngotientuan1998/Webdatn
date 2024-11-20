import React, { useEffect } from 'react';
import './StyleDialog.css';

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
            <table className="order-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((item) => (
                  <tr key={item._id}>
                    <td>{item.idSanPhamCT.idSanPham.tenSP}</td>
                    <td>{item.SoLuongMua}</td>
                    <td>{item.idSanPhamCT.Gia.toLocaleString()} VND</td>
                    <td>{item.TongTien.toLocaleString()} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có chi tiết đơn hàng.</p>
          )}
        </div>
        <div className="dialog-footer">
          <button className="close-dialog-button" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogDonHangCT;
