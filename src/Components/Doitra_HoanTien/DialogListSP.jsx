import React, { useState, useEffect } from 'react';
import './DialogStyle.css';

const DialogListSP = ({ onClose,SPRD ,token}) => {
    const [listSPCT, setlistSPCT] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [filterHang, setFilterHang] = useState('');
    const [filterManHinh, setFilterManHinh] = useState('');
    const [filterRam, setFilterRam] = useState('');
    const [filterSSD, setFilterSSD] = useState('');
    const [filterMauSac, setFilterMauSac] = useState('');

    const getListSPCT = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/chi-tiet-san-pham');
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message);
                throw new Error(errorData.message);
            }
            const data = await res.json();
            setlistSPCT(data.data);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    useEffect(() => {
        getListSPCT();
    }, []);

    const handleQuantityChange = (id, value) => {
        setQuantities({
            ...quantities,
            [id]: value,
        });
    };

    const filteredList = listSPCT.filter(item => {
        return (
            (filterHang ? item.idSanPham.idHangSP.TenHang === filterHang : true) &&
            (filterManHinh ? item.ManHinh === filterManHinh : true) &&
            (filterRam ? item.Ram === filterRam : true) &&
            (filterSSD ? item.SSD === filterSSD : true) &&
            (filterMauSac ? item.MauSac === filterMauSac : true)
        );
    });

    const uniqueHangs = [...new Set(listSPCT.map(item => item.idSanPham.idHangSP.TenHang))];
    const uniqueManHinhs = [...new Set(listSPCT.map(item => item.ManHinh))];
    const uniqueRams = [...new Set(listSPCT.map(item => item.Ram))];
    const uniqueSSDs = [...new Set(listSPCT.map(item => item.SSD))];
    const uniqueMauSacs = [...new Set(listSPCT.map(item => item.MauSac))];
    const handleThayThe = async (idSPCT) => {
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/san-pham-rui-do/admin/xu-ly/' + SPRD._id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ idSPCT, SoLuongMua: quantities.value }),
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message);
                throw new Error(errorData.message);
            }
            const data = await res.json();
            alert(data.message);
            onClose();
            // getListSPRD();
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }

    const handleDoiHang = async () =>{
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/san-pham-rui-do/admin/xu-ly/' + SPRD._id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message);
                throw new Error(errorData.message);
            }
            const data = await res.json();
            alert(data.message);
            onClose();
            // getListSPRD();
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <h3>Chọn sản phẩm thay thế</h3>
                <div className="filter-wrapper">
                    <label>
                        Hãng:
                        <select value={filterHang} onChange={(e) => setFilterHang(e.target.value)}>
                            <option value="">Tất cả</option>
                            {uniqueHangs.map((hang, index) => (
                                <option key={index} value={hang}>{hang}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Màn hình:
                        <select value={filterManHinh} onChange={(e) => setFilterManHinh(e.target.value)}>
                            <option value="">Tất cả</option>
                            {uniqueManHinhs.map((manHinh, index) => (
                                <option key={index} value={manHinh}>{manHinh}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Ram:
                        <select value={filterRam} onChange={(e) => setFilterRam(e.target.value)}>
                            <option value="">Tất cả</option>
                            {uniqueRams.map((ram, index) => (
                                <option key={index} value={ram}>{ram}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        SSD:
                        <select value={filterSSD} onChange={(e) => setFilterSSD(e.target.value)}>
                            <option value="">Tất cả</option>
                            {uniqueSSDs.map((ssd, index) => (
                                <option key={index} value={ssd}>{ssd}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Màu sắc:
                        <select value={filterMauSac} onChange={(e) => setFilterMauSac(e.target.value)}>
                            <option value="">Tất cả</option>
                            {uniqueMauSacs.map((mauSac, index) => (
                                <option key={index} value={mauSac}>{mauSac}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="table-wrapper">
                    <table className="dialog-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Hãng</th>
                                <th>Tên sản phẩm</th>
                                <th>Màn hình</th>
                                <th>Ram</th>
                                <th>SSD</th>
                                <th>Màu sắc</th>
                                <th>Giá</th>
                                <th>Số lượng mua</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredList.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.idSanPham.idHangSP.TenHang}</td>
                                    <td>{item.idSanPham.tenSP}</td>
                                    <td>{item.ManHinh}</td>
                                    <td>{item.Ram}</td>
                                    <td>{item.SSD}</td>
                                    <td>{item.MauSac}</td>
                                    <td>{item.Gia}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={quantities[item._id] || 1}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                        />
                                    </td>
                                    <td><button onClick={()=> handleThayThe(item._id)} className="dialog-button-DoiTra">Thay thế</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="dialog-footer">
                    
                    <button className="dialog-button" onClick={onClose}>Đóng</button>
                    <button className="dialog-button-DoiTra" onClick={()=> handleDoiHang()}>Đổi hàng </button>
                </div>
            </div>
        </div>
    );
};

export default DialogListSP;