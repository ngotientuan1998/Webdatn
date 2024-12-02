import React, { useState, useEffect } from 'react';
import './Style.css';

const DialogThemSanPham = ({ open, onClose, token, fetchSanPham }) => {
    const [productData, setProductData] = useState({
        tenSP: '',
        idHangSP: '',
        anhSP: [],
    });
    const [listHang, setListHang] = useState([]);
    const [errors, setErrors] = useState({}); // State lưu lỗi

    // Hàm validate
    const validateData = () => {
        const { tenSP, idHangSP, anhSP } = productData;
        const errors = {};

        if (!tenSP.trim()) {
            errors.tenSP = "Vui lòng nhập tên sản phẩm!";
        }

        if (!idHangSP) {
            errors.idHangSP = "Vui lòng chọn hãng sản phẩm!";
        }

        if (anhSP.length === 0) {
            errors.anhSP = "Vui lòng chọn ít nhất một ảnh sản phẩm!";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Thêm sản phẩm 
    const postSanPham = async () => {
        // Kiểm tra dữ liệu trước khi gửi
        if (!validateData()) return; // Nếu có lỗi, không tiếp tục

        const formData = new FormData();
        formData.append('tenSP', productData.tenSP);
        formData.append('idHangSP', productData.idHangSP);

        productData.anhSP.forEach((file) => {
            formData.append('anhSP', file);
        });

        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/san-pham/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message);
                console.log('Error:', errorData.message);
                throw new Error('Fetch failed');
            }

            const data = await res.json();
            alert(data.message);
            fetchSanPham();
            onClose();

        } catch (error) {
            console.log(error.message);
        }
    };

    // Fetch danh sách hãng sản phẩm từ API
    useEffect(() => {
        const fetchHang = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/hang`);
                if (!response.ok) throw new Error('Lỗi khi lấy danh sách hãng');
                const data = await response.json();
                setListHang(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchHang();
    }, []);

    // Chặn cuộn trang khi dialog mở
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

    // Hàm xử lý thay đổi giá trị trong các input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    // Hàm xử lý thay đổi ảnh
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProductData({ ...productData, anhSP: files });
    };

    if (!open) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2>Thêm Sản Phẩm</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="dialog-content">
                    <div className="dialog-input-group">
                        <label>Tên sản phẩm:</label>
                        <input
                            type="text"
                            name="tenSP"
                            value={productData.tenSP}
                            onChange={handleChange}
                            placeholder="Nhập tên sản phẩm"
                            className={errors.tenSP ? 'error' : ''}
                        />
                    </div>

                    <div className="dialog-input-group">
                        <label>Hãng sản phẩm:</label>
                        <select
                            name="idHangSP"
                            value={productData.idHangSP}
                            onChange={handleChange}
                            className={errors.idHangSP ? 'error' : ''}
                        >
                            <option value="">Chọn hãng</option>
                            {listHang.map((hang) => (
                                <option key={hang._id} value={hang._id}>
                                    {hang.TenHang}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="dialog-input-group">
                        <label>Ảnh sản phẩm:</label>
                        <input
                            type="file"
                            name="anhSP"
                            multiple
                            onChange={handleImageChange}
                            className={errors.anhSP ? 'error' : ''}
                        />
                        <div className="image-preview-container">
                            {productData.anhSP.map((src, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(src)}
                                    alt={`Ảnh ${index + 1}`}
                                    className="image-preview"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="dialog-footer">
                    <button className="close-dialog-button" onClick={onClose}>Hủy</button>
                    <button className="save-dialog-button" onClick={postSanPham}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default DialogThemSanPham;
