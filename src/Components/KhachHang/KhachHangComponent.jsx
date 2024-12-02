import React, { useEffect, useState } from 'react'
import ItemKhacHang from './ItemKhacHang'
import DialogThemUser from './DialogThemUser'
import './Style.css'

const KhachHangComponent = ({ token }) => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [listKhachHang, setListKhachHang] = useState([])
  const [isOpenDialogThem, setisOpenDialogThem] = useState(false)
  const onClose = () => setisOpenDialogThem(!isOpenDialogThem)
  const fetchKhachHang = async () => {
    try {
      const res = await fetch(apiUrl + '/auth/user',
        {
          method: 'GET',  // Hoặc 'POST' nếu bạn gửi dữ liệu
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Thêm token vào header
          }
        }
      )
      if (!res.ok) {
        throw new Error('Fetch failed');
      }
      const data = await res.json()

      // alert(data.message)
      setListKhachHang(data.data)
    } catch (error) {
      console.log(error.message);

    }
  }
  useEffect(() => {

    fetchKhachHang()
  }, [])
  return (
    <div className="item-KhachHang">
      <h1>Danh sách người dùng</h1>
      <button className="add-user-button" onClick={onClose}>Thêm User</button>
      {isOpenDialogThem && <DialogThemUser token={token} onClose={onClose} fetchKhachHang = {fetchKhachHang}/>}
      <div className="customer-list">
        {listKhachHang.map((khachhang) => (
          <ItemKhacHang key={khachhang._id} {...khachhang} />
        ))}
      </div>
    </div>
  )
}


export default KhachHangComponent