import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';

const ProductDialog = ({ open, onClose }) => {
    const [productData, setProductData] = useState({
        tenSP: '',
        hangSP: '',
        mauSac: '',
        ram: '',
        oCung: '',
        manHinh: '',
        gia: '',
        moTa: '',
        soLuong: '',
    });
    //data cảu hãng laptop
    const hangSPList = [
        { value: 'Acer', label: 'Acer' },
        { value: 'Dell', label: 'Dell' },
        { value: 'HP', label: 'HP' },
        { value: 'Asus', label: 'Asus' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };
    //Thêm sản phẩm vào data
    const handleSave = () => {
        console.log('Dữ liệu sản phẩm:', productData);
        onClose();  // Đóng dialog sau khi lưu
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Thêm Sản Phẩm</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Tên sản phẩm"
                    name="tenSP"
                    fullWidth
                    value={productData.tenSP}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Hãng sản phẩm"
                    name="hangSP"
                    select
                    fullWidth
                    value={productData.hangSP}
                    onChange={handleChange}
                >
                    {hangSPList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    margin="dense"
                    label="Màu sắc"
                    name="mauSac"
                    fullWidth
                    value={productData.mauSac}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Ram"
                    name="ram"
                    fullWidth
                    value={productData.ram}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Ổ cứng"
                    name="oCung"
                    fullWidth
                    value={productData.oCung}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Màn hình"
                    name="manHinh"
                    fullWidth
                    value={productData.manHinh}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Giá"
                    name="gia"
                    type="number"
                    fullWidth
                    value={productData.gia}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Mô tả sản phẩm"
                    name="moTa"
                    fullWidth
                    multiline
                    rows={4}
                    value={productData.moTa}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Số lượng"
                    name="soLuong"
                    type="number"
                    fullWidth
                    value={productData.soLuong}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Hủy
                </Button>
                <Button onClick={handleSave} color="primary">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDialog;
