import React, { useEffect, useState } from 'react';
import './style.css'; // CSS cho danh sách sản phẩm
import DialogThemChiTietSP from './DialogThemCTSP';
import DialogSuaChiTietSP from './DialogSuaSPCT';

const ChiTietSPComponent = ({ idSanPham, back }) => {
    const [listSPCT, setlistSPCT] = useState([]);
    const [filteredSPCT, setFilteredSPCT] = useState([]);
    const [filters, setFilters] = useState({ SSD: '', ManHinh: '', Ram: '', MauSac: '' });

    const apiUrl = process.env.REACT_APP_API_URL;
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [render, setRender] = useState(false);

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);

    // Dữ liệu sửa SPCT
    const [isOpenDialogSua, setisOpenDialogSua] = useState(false);
    const [dataUpdate, setdataUpdate] = useState({});

    const close = () => setisOpenDialogSua(!isOpenDialogSua);

    const handRender = () => setRender(!render);

    useEffect(() => {
        const fetchListCTSP = async () => {
            try {
                const res = await fetch(apiUrl + '/chi-tiet-san-pham/' + idSanPham._id);
                if (!res.ok) {
                    throw new Error('Fetch failed');
                }
                const data = await res.json();
                setlistSPCT(data.data);
                setFilteredSPCT(data.data); // Khởi tạo danh sách đã lọc
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchListCTSP();
    }, [render]);

    useEffect(() => {
        const filtered = listSPCT.filter((item) => {
            return (
                (!filters.SSD || item.SSD === filters.SSD) &&
                (!filters.ManHinh || item.ManHinh === filters.ManHinh) &&
                (!filters.Ram || item.Ram === filters.Ram) &&
                (!filters.MauSac || item.MauSac === filters.MauSac)
            );
        });
        setFilteredSPCT(filtered);
    }, [filters, listSPCT]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const uniqueValues = (field) => {
        return [...new Set(listSPCT.map((item) => item[field]))];
    };

    return (
        <div className="product-detail-list">
            <h2>Danh sách chi tiết sản phẩm {idSanPham.tenSP}</h2>
            {isOpenDialogSua && <DialogSuaChiTietSP data={dataUpdate} render={handRender} close={close} />}
            <div className="button-container">
                <button className="back-button" onClick={() => back('ql-sanpham')}>Quay lại</button>
                <button className="add-button" onClick={openDialog}>Thêm Chi Tiết Sản Phẩm</button>
            </div>
            <DialogThemChiTietSP open={isDialogOpen} idSanPham={idSanPham} render={handRender} onClose={closeDialog} />

            {/* Bộ lọc */}
            <div className="filter-container">
                <select name="SSD" value={filters.SSD} onChange={handleFilterChange}>
                    <option value="">Lọc theo SSD</option>
                    {uniqueValues('SSD').map((ssd) => (
                        <option key={ssd} value={ssd}>{ssd}</option>
                    ))}
                </select>
                <select name="ManHinh" value={filters.ManHinh} onChange={handleFilterChange}>
                    <option value="">Lọc theo màn hình</option>
                    {uniqueValues('ManHinh').map((screen) => (
                        <option key={screen} value={screen}>{screen}</option>
                    ))}
                </select>
                <select name="Ram" value={filters.Ram} onChange={handleFilterChange}>
                    <option value="">Lọc theo RAM</option>
                    {uniqueValues('Ram').map((ram) => (
                        <option key={ram} value={ram}>{ram}</option>
                    ))}
                </select>
                <select name="MauSac" value={filters.MauSac} onChange={handleFilterChange}>
                    <option value="">Lọc theo màu sắc</option>
                    {uniqueValues('MauSac').map((color) => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
            </div>

            {/* Bảng hiển thị chi tiết sản phẩm */}
            <table className="product-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ảnh</th>
                        <th>Màu sắc</th>
                        <th>RAM</th>
                        <th>SSD</th>
                        <th>Màn hình</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSPCT.map((chiTiet, index) => (
                        <tr key={chiTiet._id}>
                            <td>{index + 1}</td>
                            <td>
                                {chiTiet.idSanPham.anhSP.map((url, idx) => (
                                    <img key={idx} src={process.env.REACT_APP_API_URL + url} alt="Sản phẩm" className="product-image" />
                                ))}
                            </td>
                            <td>{chiTiet.MauSac}</td>
                            <td>{chiTiet.Ram}</td>
                            <td>{chiTiet.SSD}</td>
                            <td>{chiTiet.ManHinh}</td>
                            <td>{chiTiet.SoLuong}</td>
                            <td>{chiTiet.Gia.toLocaleString()} VND</td>
                            <td>{chiTiet.MoTa}</td>
                            <td>
                                <button onClick={() => { setdataUpdate(chiTiet); setisOpenDialogSua(true); }}>Sửa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChiTietSPComponent;
