import React, { useState, useEffect, useRef } from 'react';

import 'font-awesome/css/font-awesome.min.css';
import '../Homes/home.css';
import SanPham from '../SanPham/sanPham';

import KhachHang from '../KhachHang/KhachHangComponent';
import DonHangComponent from '../DonHang/DonHangComponent';
import HoaDonComponent from '../HoaDon/HoaDonComponent';
import RevenueStatistics from '../ThongKe/ThongKe';
import ChiTietSPComponent from '../ChiTietSP/ChiTietSPComponent';
import ChatsComponent from '../Chat/ChatsComonent'
// import UserInfo from '../Profile/ProfileComponent';

import { Setting } from '../Setting/Setting';
import DanhGiaTable from '../DanhGia/DanhGiaComponent';


const Home = () => {
  const [content, setContent] = useState('');
  const [idSanPham, setidSanPham] = useState({});
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0); // Dùng để lưu vị trí cuộn trước đó
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false); // Kiểm tra nếu là mobile hoặc tablet
  // const [withS, setwithS] = useState(window.innerWidth)

  const user = localStorage.getItem('user');
  const resUser = JSON.parse(user);
  const token = resUser.AccessToken;

  const contentRef = useRef(null); // Để tham chiếu đến phần content

  // Kiểm tra màn hình khi lần đầu render (để xác định xem có phải là mobile/tablet không)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024); // Kiểm tra nếu màn hình nhỏ hơn 1024px
    };
    handleResize(); // Gọi ngay khi render
    window.addEventListener('resize', handleResize); // Lắng nghe sự kiện thay đổi kích thước
    return () => {
      window.removeEventListener('resize', handleResize); // Dọn dẹp sự kiện khi component unmount
    };
  }, []);

  // Loại bỏ thuộc tính css của body khi hiển thị component này
  useEffect(() => {
    document.body.style.cssText = `display: contents;`;

    const handleContentScroll = () => {
      if (!isMobileOrTablet) return; // Nếu không phải mobile/tablet thì không thực hiện gì

      const currentScrollTop = contentRef.current.scrollTop;
      if (currentScrollTop > lastScrollTop) {
        // Nếu cuộn xuống, ẩn sidebar
        setSidebarVisible(false);
      } else {
        // Nếu cuộn lên, hiển thị sidebar
        setSidebarVisible(true);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // Đảm bảo không cuộn quá đầu trang
    };

    // Gắn sự kiện cuộn vào phần content
    const contentElement = contentRef.current;
    contentElement.addEventListener('scroll', handleContentScroll);

    return () => {
      contentElement.removeEventListener('scroll', handleContentScroll);
      document.body.style.cssText = '';
    };
  }, [lastScrollTop, isMobileOrTablet]);

  // Chuyển đổi nội dung dựa trên giá trị 'content'
  const renderContent = () => {
    switch (content) {
      case 'ql-sanpham':
        return <SanPham token={token} showCT={handleProductClick} />;
      case 'ql-chat':
        return <ChatsComponent />;
      case 'ql-khachhang':
        return <KhachHang token={token} />;
      case 'ql-donhang':
        return <DonHangComponent token={token} />;
      case 'ql-hoadon':
        return <HoaDonComponent token={token} />;
      case 'ql-danhgia':
        return <DanhGiaTable token={token} />;
      case 'thongke':
        return <RevenueStatistics />;

      case 'san-pham-chi-tiet':
        return <ChiTietSPComponent token={token} idSanPham={idSanPham} back={handleContentChange} />;
      case 'cai-dat':
        return <Setting token={token} />;
      default:
        return <RevenueStatistics />; // Đặt Thống kê làm mặc định

    }
  };

  const handleProductClick = (productId) => {
    setContent('san-pham-chi-tiet');
    setidSanPham(productId);
  };

  // Hàm để thay đổi nội dung
  const handleContentChange = (type) => {
    setContent(type);
  };

  return (
    <div className="home">
      <div className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
        <div className='profile'>
          <h3>Xin chào Admin {resUser.HoTen}</h3>
        </div>
        <ul>
          <li onClick={() => handleContentChange('ql-sanpham')}><i className="fas fa-laptop"></i> Sản phẩm</li>
          <li onClick={() => handleContentChange('ql-khachhang')}><i className="fas fa-users"></i> Người dùng</li>
          <li onClick={() => handleContentChange('ql-donhang')}><i className="fas fa-users"></i>Đơn hàng</li>
          <li onClick={() => handleContentChange('ql-hoadon')}><i className="fas fa-users"></i>Hóa đơn</li>
          <li onClick={() => handleContentChange('thongke')}><i className="fas fa-users"></i> Thống kê</li>
          <li onClick={() => handleContentChange('ql-chat')}><i className="fas fa-tags"></i> Tin Nhắn</li>
          <li onClick={() => handleContentChange('ql-danhgia')}><i className="fas fa-tags"></i>Đánh giá</li>
          <li onClick={() => handleContentChange('cai-dat')}><i className="fas fa-cogs"></i> Cài đặt</li>
        </ul>
      </div>
      <div className="content" ref={contentRef}>
        {renderContent()}
      </div>


    </div>
  );
};

export default Home;
