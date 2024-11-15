import React, { useState } from 'react';
import './StyleDialog.css'; // Giả sử bạn đã có CSS cho dialog

const DialogThemChiTietSP = ({ open, onClose, idSanPham }) => {
    const user = localStorage.getItem('user');
    const resUser = JSON.parse(user);
    const token = resUser.AccessToken;

    const [chiTietData, setChiTietData] = useState({
        idSanPham,
        MauSac: '',
        Ram: '',
        SSD: '',
        ManHinh: '',
        SoLuong: '',
        Gia: 0,
        MoTa: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChiTietData({ ...chiTietData, [name]: value });
    };
    const validateData = () => {
        const { MauSac, Ram, SSD, ManHinh, SoLuong, Gia, MoTa } = chiTietData;
        // Kiểm tra xem có trường nào bị bỏ trống không
        if (!MauSac || !Ram || !SSD || !ManHinh || !SoLuong || !Gia || !MoTa) {
            return "Vui lòng điền đầy đủ thông tin!";
        }

        // Kiểm tra số lượng và giá phải là số dương
        if (SoLuong <= 0 || Gia <= 0) {
            return "Số lượng và giá phải lớn hơn 0!";
        }

        return null; // Không có lỗi
    };
    const postCTSP = async () => {

        const validationError = validateData();
        if (validationError) {
            alert(validationError);
            return; // Nếu có lỗi thì dừng lại
        }

        // Chuyển SoLuong và Gia thành số sau khi kiểm tra dữ liệu hợp lệ
        const { SoLuong, Gia } = chiTietData;
        const SoLuongNumber = parseInt(SoLuong, 10);
        const GiaNumber = parseFloat(Gia);

        // Cập nhật lại giá trị trong đối tượng chiTietData
        const updatedChiTietData = {
            ...chiTietData,
            SoLuong: SoLuongNumber,
            Gia: GiaNumber
        };
        try {

            const res = await fetch(process.env.REACT_APP_API_URL + '/chi-tiet-san-pham', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Thêm token vào header
                },
                body: JSON.stringify(updatedChiTietData)
            })
            if (!res.ok) {
                const errorData = await res.json();
                console.log('Error:', errorData.message);
                throw new Error("Lỗi khi thêm chi tiết sản phẩm");
            }
            const data = await res.json()
            // console.log(data.data);

            alert(data.message);
        } catch (error) {
            console.log(error.message);
            alert(error.message)

        }
    }

    if (!open) return null; // Nếu dialog không mở, không hiển thị gì
    return (
        <div className="dialog-overlay">
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2>Thêm Chi Tiết Sản Phẩm {idSanPham.tenSP}</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="dialog-content">
                    {/* Các trường nhập liệu */}
                    <div className="dialog-input-group">
                        <label>Màu Sắc:</label>
                        <input type="text" onChange={handleChange} name="MauSac" placeholder="Nhập màu sắc" />
                    </div>
                    <div className="dialog-input-group">
                        <label>RAM:</label>
                        <input type="text" onChange={handleChange} name="Ram" placeholder="Nhập dung lượng RAM" />
                    </div>
                    <div className="dialog-input-group">
                        <label>SSD:</label>
                        <input type="text" onChange={handleChange} name="SSD" placeholder="Nhập dung lượng SSD" />
                    </div>
                    <div className="dialog-input-group">
                        <label>Màn Hình:</label>
                        <input type="text" onChange={handleChange} name="ManHinh" placeholder="Nhập kích thước màn hình" />
                    </div>
                    <div className="dialog-input-group">
                        <label>Số Lượng:</label>
                        <input type="number" onChange={handleChange} name="SoLuong" placeholder="Nhập số lượng" />
                    </div>
                    <div className="dialog-input-group">
                        <label>Giá:</label>
                        <input type="number" onChange={handleChange} name="Gia" placeholder="Nhập giá sản phẩm" />
                    </div>
                    <div className="dialog-input-group">
                        <label>Mô Tả:</label>
                        <textarea name="MoTa" onChange={handleChange} placeholder="Nhập mô tả sản phẩm"></textarea>
                    </div>
                </div>
                <div className="dialog-footer">
                    <button className="close-dialog-button" onClick={onClose}>Đóng</button>
                    <button className="save-dialog-button" onClick={postCTSP}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default DialogThemChiTietSP;
