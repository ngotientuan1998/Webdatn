import React, { useEffect, useState } from 'react';
import './Style.css';

const SuaSP = ({ onClose, data, token, fetchSanPham }) => {
    const [listHang, setListHang] = useState([]);
    const [errors, setErrors] = useState({}); // State lưu lỗi

    const [productData, setProductData] = useState({
        tenSP: data.tenSP || '', 
        idHangSP: data.idHangSP._id || '',
        anhSP: data.anhSP || [], 
        newAnhSP: [], 
    });

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
        if (onClose) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    // Hàm xử lý thay đổi giá trị trong các input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    // Hàm xử lý thay đổi ảnh
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProductData((prev) => ({
            ...prev,
            newAnhSP: [...prev.newAnhSP, ...files], 
        }));
    };

    const handleRemoveImage = (index) => {
        const updatedAnhSP = productData.anhSP.filter((_, i) => i !== index);
        setProductData({ ...productData, anhSP: updatedAnhSP });
    };

    const handleRemoveNewImage = (index) => {
        const updatedNewAnhSP = productData.newAnhSP.filter((_, i) => i !== index);
        setProductData({ ...productData, newAnhSP: updatedNewAnhSP });
    };

    // Hàm validate
    const validate = () => {
        const errors = {};
        if (!productData.tenSP.trim()) errors.tenSP = true;
        if (!productData.idHangSP) errors.idHangSP = true;
        if (productData.anhSP.length === 0 && productData.newAnhSP.length === 0)
            errors.anhSP = true;
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Hàm xử lý lưu sản phẩm
    const handleSubmit = async () => {
        if (!validate()) return; // Nếu lỗi, không tiếp tục

        const formData = new FormData();
        formData.append('tenSP', productData.tenSP);
        formData.append('idHangSP', productData.idHangSP);
        formData.append('selectedOldAnhSP', JSON.stringify(productData.anhSP));
        productData.newAnhSP.forEach((file) => {
            formData.append('anhSP', file);
        });

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/san-pham/${data._id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const result = await response.json();
            alert(result.message);
            fetchSanPham();
            onClose();
        } catch (error) {
            console.error(error.message);
            alert('Lỗi khi sửa sản phẩm');
        }
    };

    return (
        <div className="dialog-overlay">
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2>Sửa Sản Phẩm</h2>
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
                        <label>Ảnh sản phẩm cũ:</label>
                        <div className="image-preview-container">
                            {productData.anhSP.map((url, index) => (
                                <div key={index} className="image-preview-item">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}${url}`}
                                        alt={`Old ${index}`}
                                        className="image-preview"
                                    />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="remove-image-button"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="dialog-input-group">
                        <label>Ảnh sản phẩm mới:</label>
                        <input
                            type="file"
                            name="newAnhSP"
                            multiple
                            onChange={handleImageChange}
                            className={errors.anhSP ? 'error' : ''}
                        />
                        <div className="image-preview-container">
                            {productData.newAnhSP.map((file, index) => (
                                <div key={index} className="image-preview-item">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`New ${index}`}
                                        className="image-preview"
                                    />
                                    <button
                                        onClick={() => handleRemoveNewImage(index)}
                                        className="remove-image-button"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="dialog-footer">
                    <button className="close-dialog-button" onClick={onClose}>
                        Hủy
                    </button>
                    <button className="save-dialog-button" onClick={handleSubmit}>
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuaSP;
