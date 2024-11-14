

import React, { useEffect, useState } from 'react'
import './style.css'; // CSS cho danh sách sản phẩm
import ItemChiTietSP from './ItemChiTietSP';
const ChiTietSPComponent = ({ token, idSanPham , back }) => {
    const [listSPCT, setlistSPCT] = useState([])
    const apiUrl = process.env.REACT_APP_API_URL
    
    useEffect(() => {
        const fetchListCTSP = async () => {
            try {
                const res = await fetch(apiUrl + '/chi-tiet-san-pham/' + idSanPham)
                if (!res.ok) {
                    throw new Error('Fetch failed');
                }
                const data = await res.json()
                console.log(data.data);
                
                setlistSPCT(data.data)

            } catch (error) {
                console.log(error.message);

            }
        }
        fetchListCTSP()
    }, [])



    return (
        <div className="product-detail-list">
            <h2>Danh sách chi tiết sản phẩm</h2>
            <button className="back-button" onClick={()=>back('ql-sanpham')}>Quay lại</button>
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