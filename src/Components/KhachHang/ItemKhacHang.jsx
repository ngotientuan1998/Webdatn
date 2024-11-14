import React from 'react'
import './item.css'

const ItemKhacHang = ({ 
    UserName, 
    HoTen, 
    Tuoi, 
    Email, 
    Sdt, 
    Avatar, 
    DiaChi, 
    Role 
  }) => {
  return (
    <div className="customer-item">
    <div className="avatar-container">
      <img src={Avatar} alt={`${HoTen}'s avatar`} className="avatar" />
    </div>
    <div className="info-container">
      <h2 className="name">{HoTen} <span className="username">({UserName})</span></h2>
      <p className="info"><strong>Tuổi:</strong> {Tuoi}</p>
      <p className="info"><strong>Email:</strong> {Email}</p>
      <p className="info"><strong>Số điện thoại:</strong> {Sdt}</p>
      <p className="info"><strong>Địa chỉ:</strong> {DiaChi}</p>
      <p className="info"><strong>Vai trò:</strong> {Role}</p>
    </div>
  </div>
  )
}
const styles ={
    container: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px'
      },
      avatarContainer: {
        marginRight: '16px',
      },
      avatar: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        objectFit: 'cover'
      },
      infoContainer: {
        flex: 1,
      },
      name: {
        fontSize: '1.5em',
        margin: '0 0 8px 0'
      }
}
export default ItemKhacHang

