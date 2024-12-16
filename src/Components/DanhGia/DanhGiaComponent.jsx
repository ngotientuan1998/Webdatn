import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DanhGiaTable.css';
import ProductDialog from "./SanPhamDanhGia";

const DanhGiaTable = () => {
  const [danhGiaList, setDanhGiaList] = useState([]);
  const [filterDiem, setFilterDiem] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setopenDialog] = useState(false)
  const [sanPham, setsanPham] = useState([])
  const handDialog = () => {
    setopenDialog(!openDialog)
  }
  const fetchDanhGia = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/danh-gia`);
      setDanhGiaList(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDanhGia();
  }, []);

  const handChiTiet = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/danh-gia/san-pham/${id}`)
      if(!res.ok){
        const err = await res.json()
        alert(err.message)
        throw new Error(err.message);
      }
      const data = await res.json()
      // alert(data.message)
      setsanPham(data.data)
      
      
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  const filteredDanhGiaList = danhGiaList.filter((danhGia) =>
    filterDiem ? danhGia.Diem === Number(filterDiem) : true
  );
  
  return (
    <div className="danh-gia-container">
      {openDialog && <ProductDialog products={sanPham} onClose={handDialog}/>}
      <h1>Danh Sách Đánh Giá</h1>
      <div className="filter-container">
        <label htmlFor="filterDiem">Lọc theo điểm: </label>
        <select
          id="filterDiem"
          value={filterDiem}
          onChange={(e) => setFilterDiem(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="error-message">Lỗi: {error}</p>
      ) : (
        <table className="danh-gia-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Điểm</th>
              <th>Nội dung</th>
              <th>Hình ảnh minh họa</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredDanhGiaList.map((danhGia, index) => (
              <tr key={danhGia._id}>
                <td>{index + 1}</td>
                <td>{danhGia.idUser?.HoTen || 'Không xác định'}</td>
                <td>{danhGia.Diem}</td>
                <td>
                  <div
                    className="expandable-content"
                    title={danhGia.NoiDung}
                    onClick={(e) =>
                      e.currentTarget.classList.toggle('expanded')
                    }
                  >
                    {danhGia.NoiDung || 'Không có nội dung'}
                  </div>
                </td>
                <td>
                  {
                    danhGia.HinhAnh?.map((img) => (
                      <img
                        src={process.env.REACT_APP_API_URL + img}
                        className="image"
                      />
                    ))
                  }
                </td>
                <td>
                  <button className="button-chi-tiet" onClick={()=>{
                    handChiTiet(danhGia._id)
                    handDialog()
                  } }>Sản phẩm liên quan</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DanhGiaTable;
