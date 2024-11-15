import React, { useState, useEffect } from 'react';
import './Style.css';

const DialogThemSanPham = ({ open, onClose, token, fetchSanPham }) => {

    // console.log(token);

    const [productData, setProductData] = useState({
        tenSP: '',
        idHangSP: '',
        anhSP: [],
    });
    const [listHang, setListHang] = useState([]);
    const validateData = () => {
        const { tenSP, idHangSP, anhSP } = productData;

        // Kiểm tra xem tên sản phẩm có rỗng không
        if (!tenSP.trim()) {
            return "Vui lòng nhập tên sản phẩm!";
        }

        // Kiểm tra xem hãng sản phẩm có được chọn không
        if (!idHangSP) {
            return "Vui lòng chọn hãng sản phẩm!";
        }

        // Kiểm tra xem ảnh sản phẩm có được chọn không
        if (anhSP.length === 0) {
            return "Vui lòng chọn ít nhất một ảnh sản phẩm!";
        }

        return null; // Dữ liệu hợp lệ
    };

    // thêm sản phẩm 
    const postSanPham = async () => {
        // Kiểm tra dữ liệu trước khi gửi
        const validationError = validateData();
        if (validationError) {
            alert(validationError); // Hiển thị lỗi
            return; // Dừng lại nếu có lỗi
        }
        const formData = new FormData()
        formData.append('tenSP', productData.tenSP);
        formData.append('idHangSP', productData.idHangSP);

        productData.anhSP.forEach((file, index) => {
            formData.append('anhSP', file);
        });
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/san-pham/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Thêm token vào header
                },
                body: formData
            })
            if (!res.ok) {
                const errorData = await res.json();
                console.log('Error:', errorData.message);
                throw new Error('Fetch failed');
            }
            const data = await res.json()
            alert(data.message)
            fetchSanPham()
            onClose()

        } catch (error) {
            console.log(error.message);
        }

    }

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

    // Hàm lưu sản phẩm
    const handleSave = () => {
        console.log('Dữ liệu sản phẩm:', productData);
        onClose();
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
                        />
                    </div>

                    <div className="dialog-input-group">
                        <label>Hãng sản phẩm:</label>
                        <select
                            name="idHangSP"
                            value={productData.idHangSP}
                            onChange={handleChange}
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
                        />
                        {/* .map(file => URL.createObjectURL(file)) */}
                        <div className="image-preview-container">
                            {productData.anhSP.map((src, index) => (
                                <img key={index} src={URL.createObjectURL(src)} alt={`Ảnh ${index + 1}`} className="image-preview" />
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
