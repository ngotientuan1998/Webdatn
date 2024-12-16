import React from 'react';
import './SanPhamDanhGiaStyle.css';

const ProductDialog = ({ onClose, products }) => {
    if (!products) return null;

    return (
        <div className={`dialog-overlay ${onClose ? 'open' : ''}`} onClick={onClose}>
            <div className="dialog" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                    <h2>Danh sách sản phẩm</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="dialog-content">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên hãng</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Hình ảnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id}>
                                    <td>{index}</td>
                                    <td>{product.idSanPham.idHangSP.TenHang}</td>
                                    <td>{product.idSanPham.tenSP}</td>
                                    <td>{product.Gia}</td>
                                    <td>
                                        <div className="product-images">
                                            {product.idSanPham.anhSP.map((url, imgIndex) => (
                                                <img
                                                    key={imgIndex}
                                                    src={process.env.REACT_APP_API_URL + url}
                                                    alt={`Sản phẩm ${imgIndex + 1}`}
                                                    className="product-image"
                                                />
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="dialog-actions">
                    <button className="close-button" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDialog;
