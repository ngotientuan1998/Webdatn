import React, { useEffect, useState } from 'react';
import './StyleDialog.css'; // Giả sử bạn đã có CSS cho dialog

const DialogSuaSPCT = ({ close, data, render }) => {
    const user = localStorage.getItem('user');
    const resUser = JSON.parse(user);
    const token = resUser.AccessToken;
    // console.log('data',data._id);


    const [chiTietData, setChiTietData] = useState({
        MauSac: data.MauSac || '',
        Ram: data.Ram || '',
        SSD: data.SSD || '',
        ManHinh: data.ManHinh || '',
        SoLuong: data.SoLuong || '',
        Gia: data.Gia || 0,
        MoTa: data.MoTa
    });

    const [errors, setErrors] = useState({}); // State lưu lỗi

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChiTietData({ ...chiTietData, [name]: value });
    };

    const validateData = () => {
        const { MauSac, Ram, SSD, ManHinh, SoLuong, Gia, MoTa } = chiTietData;
        const errors = {};

        // Kiểm tra các trường không được bỏ trống
        if (!MauSac) errors.MauSac = "Vui lòng nhập màu sắc!";
        if (!Ram) errors.Ram = "Vui lòng nhập dung lượng RAM!";
        if (!SSD) errors.SSD = "Vui lòng nhập dung lượng SSD!";
        if (!ManHinh) errors.ManHinh = "Vui lòng nhập kích thước màn hình!";
        if (!SoLuong) errors.SoLuong = "Vui lòng nhập số lượng!";
        if (!Gia) errors.Gia = "Vui lòng nhập giá sản phẩm!";
        if (!MoTa) errors.MoTa = "Vui lòng nhập mô tả sản phẩm!";

        // Kiểm tra số lượng và giá phải là số dương
        if (SoLuong <= 0) errors.SoLuong = "Số lượng phải lớn hơn 0!";
        if (Gia <= 0) errors.Gia = "Giá phải lớn hơn 0!";

        setErrors(errors); // Cập nhật lỗi
        return Object.keys(errors).length === 0; // Nếu không có lỗi thì trả về true
    };

    const postCTSP = async () => {
        // Kiểm tra dữ liệu trước khi gửi
        if (!validateData()) return;

        // Cập nhật lại giá trị sau khi validate
        const { SoLuong, Gia } = chiTietData;
        const SoLuongNumber = parseInt(SoLuong, 10);
        const GiaNumber = parseFloat(Gia);

        const updatedChiTietData = {
            ...chiTietData,
            SoLuong: SoLuongNumber,
            Gia: GiaNumber
        };

        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/chi-tiet-san-pham/' + data._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Thêm token vào header
                },
                body: JSON.stringify(updatedChiTietData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.log('Error:', errorData.message);
                throw new Error("Lỗi khi thêm chi tiết sản phẩm");
            } else {
                const data = await res.json();
                render(); // Cập nhật lại danh sách
                close();
                alert(data.message);
            }

        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };


    useEffect(() => {
        if (close) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [close]);

    if (!close) return null; // Nếu dialog không mở, không hiển thị gì

    return (
        <div className="dialog-overlay">
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2>Sửa Chi Tiết Sản Phẩm </h2>
                    <button className="close-button" onClick={close}>
                        &times;
                    </button>
                </div>
                <div className="dialog-content">
                    {/* Các trường nhập liệu */}
                    <div className="dialog-input-group">
                        <label>Màu Sắc:</label>
                        <input
                            value={chiTietData.MauSac}
                            type="text"
                            onChange={handleChange}
                            name="MauSac"
                            placeholder="Nhập màu sắc"
                            className={errors.MauSac ? 'error' : ''}
                        />
                    </div>
                    <div className="dialog-input-group">
                        <label>RAM:</label>
                        <input
                            value={chiTietData.Ram}
                            type="text"
                            onChange={handleChange}
                            name="Ram"
                            placeholder="Nhập dung lượng RAM"
                            className={errors.Ram ? 'error' : ''}
                        />
                    </div>
                    <div className="dialog-input-group">
                        <label>SSD:</label>
                        <input
                            value={chiTietData.SSD}
                            type="text"
                            onChange={handleChange}
                            name="SSD"
                            placeholder="Nhập dung lượng SSD"
                            className={errors.SSD ? 'error' : ''}
                        />
                    </div>
                    <div className="dialog-input-group">
                        <label>Màn Hình:</label>
                        <input
                            value={chiTietData.ManHinh}
                            type="text"
                            onChange={handleChange}
                            name="ManHinh"
                            placeholder="Nhập kích thước màn hình"
                            className={errors.ManHinh ? 'error' : ''}
                        />
                    </div>
                    <div className="dialog-input-group">
                        <label>Số Lượng:</label>
                        <input
                            value={chiTietData.SoLuong}
                            type="number"
                            onChange={handleChange}
                            name="SoLuong"
                            placeholder="Nhập số lượng"
                            className={errors.SoLuong ? 'error' : ''}
                        />
                    </div>
                    <div className="dialog-input-group">
                        <label>Giá:</label>
                        <input
                            value={chiTietData.Gia}
                            type="number"
                            onChange={handleChange}
                            name="Gia"
                            placeholder="Nhập giá sản phẩm"
                            className={errors.Gia ? 'error' : ''}
                        />
                    </div>
                    <div className="dialog-input-group">
                        <label>Mô Tả:</label>
                        <textarea
                            value={chiTietData.MoTa}
                            name="MoTa"
                            onChange={handleChange}
                            placeholder="Nhập mô tả sản phẩm"
                            className={errors.MoTa ? 'error' : ''}
                        ></textarea>
                    </div>
                </div>
                <div className="dialog-footer">
                    <button className="close-dialog-button" onClick={close}>Đóng</button>
                    <button className="save-dialog-button" onClick={postCTSP}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default DialogSuaSPCT;
