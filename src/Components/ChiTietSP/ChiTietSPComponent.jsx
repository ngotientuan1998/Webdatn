

import React, { useEffect, useState } from 'react'
import './style.css'; // CSS cho danh sách sản phẩm
import ItemChiTietSP from './ItemChiTietSP';
import DialogThemChiTietSP from './DialogThemCTSP';

const ChiTietSPComponent = ({ idSanPham, back }) => {
    const [listSPCT, setlistSPCT] = useState([])
    const apiUrl = process.env.REACT_APP_API_URL
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => setDialogOpen(true);
    const closeDialog = () => setDialogOpen(false);
   

    

    useEffect(() => {
        const fetchListCTSP = async () => {
            try {
                const res = await fetch(apiUrl + '/chi-tiet-san-pham/' + idSanPham._id)
                if (!res.ok) {
                    throw new Error('Fetch failed');
                }
                const data = await res.json()
                // console.log(data.data);

                setlistSPCT(data.data)

            } catch (error) {
                console.log(error.message);

            }
        }
        fetchListCTSP()
    }, [])

    

    return (
        <div className="product-detail-list">
            <h2>Danh sách chi tiết sản phẩm {idSanPham.tenSP}</h2>
            <div className="button-container">
                <button className="back-button" onClick={() => back('ql-sanpham')}>Quay lại</button>
                <button className="add-button" onClick={openDialog}>Thêm Chi Tiết Sản Phẩm</button>
            </div>
            <DialogThemChiTietSP open={isDialogOpen} idSanPham={idSanPham} onClose={closeDialog} />
            <div className="product-list">
                {listSPCT.map((chiTiet) => (
                    <ItemChiTietSP
                        key={chiTiet._id}
                        chiTietSanPham={chiTiet}
                    />
                ))}
            </div>
            
        </div>
    )
}

export default ChiTietSPComponent