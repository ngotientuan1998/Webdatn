import React, { useEffect, useState } from 'react'
import ItemKhacHang from './ItemKhacHang'

const KhachHangComponent = ({token}) => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [listKhachHang, setListKhachHang] = useState([])
  useEffect(() => {
    const fetchKhachHang = async () => {
      try {
        const res = await fetch(apiUrl+'/auth/user',
          {
            method: 'GET',  // Hoặc 'POST' nếu bạn gửi dữ liệu
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,  // Thêm token vào header
            }
          }
        )
        if(!res.ok){
          throw new Error('Fetch failed');
        }
        const data = await res.json()
      
        
        setListKhachHang(data.data)
      } catch (error) {
        alert(error.message)
        console.log(error.message);
        
      }
    }
    fetchKhachHang()
  }, [])
  return (
    <div className='item-KhachHang' >
      <h1>Danh sách khách hàng</h1>
      {listKhachHang.map(khachhang=>(
        <ItemKhacHang key={khachhang._id}
        {...khachhang}/>
      )

      )}

    </div>
  )
}


export default KhachHangComponent