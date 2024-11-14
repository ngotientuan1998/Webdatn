
import React, { useEffect, useState } from 'react'
import './ItemStyle.css'

const ItemSanPham = ({ tenSP, idHangSP, anhSP }) => {


    const [currentImage, setCurrentImage] = useState(0); // Lưu trữ chỉ mục ảnh hiện tại

    // Function để chuyển ảnh mỗi giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % anhSP.length); // Chuyển sang ảnh tiếp theo theo vòng tròn
        }, 10000); // Thay đổi mỗi giây

        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, [anhSP]);
    return (
        <div className="item-sanpham">
            {/* Phần trên chứa tên sản phẩm, tên hãng và ảnh */}
            <div className="top-section">
                <div className="left-column">
                    <h2 className="product-title">Tên sản phẩm: {tenSP}</h2>
                    <h3 className="product-brand">Hãng sản phẩm: {idHangSP.TenHang}</h3>
                </div>
                <div className="right-column">
                    <div className="image-container">
                        <img src={anhSP[currentImage]} alt={tenSP} className="product-image" />
                    </div>
                </div>
            </div>

            {/* Phần dưới chứa nút "Sửa" và "Xóa" */}
            <div className="button-container">
                <button className="button">Sửa</button>
                <button className="button delete-button">Xóa</button>
            </div>
        </div>
    )
}


export default ItemSanPham