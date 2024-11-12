import React, { useState ,useEffect} from 'react';
import '../Homes/home.css';
import SanPham from '../SanPham/sanPham';
import LoaiSP from '../../LoaiSP/LoaiSP';

const Home = () => {
  const [content, setContent] = useState('');
  useEffect(()=>{
    document.body.style.cssText=`
        display: contents
    `
    return ()=>{
        document.body.style.cssText=``
    }
  },[])
  const renderContent=()=>{
    switch (content){
        case 'ql-sanpham':
            return <SanPham/>
        case 'ql-loaisp':
              return <LoaiSP/>    
    }
  }
  const handleContentChange = (type) => {
    setContent(type);
  };

  return (
    <div className='home'>
      <div className="sidebar">
        <h2>Quản trị hệ thống</h2>
        <ul>
          <li onClick={() => handleContentChange('ql-sanpham')}><i className="fas fa-laptop"></i> Quản lý sản phẩm</li>
          <li onClick={() => handleContentChange('ql-loaisp')}><i className="fas fa-tags"></i> Quản lý loại sản phẩm</li>
          <li onClick={() => handleContentChange('ql-khachhang')}><i className="fas fa-users"></i> Quản lý khách hàng</li>
          <li onClick={() => handleContentChange('cai-dat')}><i className="fas fa-cogs"></i> Cài đặt</li>
        </ul>
      </div>

      <div className="content">
        
        {renderContent()}
      </div>

      <div className="user-avatar dropdown">
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Thông tin người dùng</a></li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item" href="#">Đăng xuất</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
