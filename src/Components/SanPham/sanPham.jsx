import { useEffect, useState } from "react";
import '../SanPham/sanPham.css'
import ItemSanPham from "./ItemSanPham";
import { Button } from '@mui/material';
import ProductDialog from "../DialogThemSP/ThemSP";
const SanPham = ({ token, showCT }) => {
    const [isOpen, setisOpen] = useState({})
    const [openDialog, setOpenDialog] = useState(false);
    const [listSP, setListSp] = useState([])
    const [branList, setBranlist] = useState([])
    const [searchQuery, setSearchQuery] = useState("");  // Thêm state cho từ khóa tìm kiếm
    const [selectedBrand, setSelectedBrand] = useState(null); // Tên hãng được chọn
    const [openMenu, setOpenMenu] = useState(null); // Quản lý tên của menu đang mở
    const apiUrl = process.env.REACT_APP_API_URL


    // Hàm mở dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Hàm đóng dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleBrandClick=(a)=>{
        if(openMenu=="menu1"){
            setSelectedBrand(a)
        } else return
    }

    // if(user) {
    //   setToken(resUser.AccessToken)      
    // }

    useEffect(() => {
        const getListSP = async () => {
            try {
                const res = await fetch(apiUrl + '/san-pham',
                    {
                        method: 'GET',  // Hoặc 'POST' nếu bạn gửi dữ liệu
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,  // Thêm token vào header
                        },
                    }
                )
                if (!res.ok) {
                    throw new Error('Fetch failed');
                }

                const data = await res.json();
                console.log(data.data);
                // Đếm số lượng sản phẩm của mỗi hãng
                const brandCount = {};
                // data.data.array.forEach(item => {
                //     brandCount[item.idHangSP.]
                // });

                data.data.forEach((item) => {
                    brandCount[item.idHangSP.TenHang.toLowerCase()] = (brandCount[item.idHangSP.TenHang.toLowerCase()] || 0) + 1;
                });

                // Chuyển đối tượng thành mảng danh sách hãng
                const brands = Object.entries(brandCount).map(([brand, count]) => ({
                    brand,
                    count,
                }));
                setBranlist(brands); // Lưu vào state
                setListSp(data.data)
            } catch (error) {
                console.log(error);

            }
        }
        getListSP()
    }, [])
    
     // Hàm lọc sản phẩm theo tên
    // const filteredProducts = listSP.filter((product) =>{
       
    //    return product.tenSP.toLowerCase().includes(searchQuery.toLowerCase())})
    //Hàm lọc sản phẩm theo tên
    const filteredProducts = listSP.filter((product) =>{
        const matchesName=searchQuery?
        product.tenSP.toLowerCase().includes(searchQuery.toLowerCase())
        :true 
        //  // Lọc theo tên sản phẩm nếu có searchQuery
         const matchesBrand = selectedBrand
         ? product.idHangSP.TenHang.toLowerCase() === selectedBrand
          : true;
          
       return matchesName&&matchesBrand
});
console.log(selectedBrand)
     //chọn các tùy chọn   
    const togglemenu = (menu) => {
        setisOpen((prev) => ({
           // Đóng tất cả menu
        ...Object.keys(prev).reduce((acc, key) => {
            acc[key] = false;  // Đảm bảo tất cả các menu đều đóng
            return acc;
        }, {}),
            [menu]: !prev[menu]
        }))
      setOpenMenu(menu)
    }



    return (
        <div>
            <section>
                <h3>Chào mừng bạn đến với trang sản phẩm</h3>
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}  // Cập nhật searchQuery mỗi khi người dùng gõ
                />
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>Thêm sản phẩm</Button>

                {/* Hiển thị ProductDialog khi openDialog = true */}
                {openDialog && <ProductDialog open={openDialog} onClose={handleCloseDialog} />}
                <p>Tùy chọn</p>

                <div className="tuychon">
                    <div className="menu1" onMouseEnter={() => togglemenu('menu1')} onMouseLeave={() => togglemenu('menu1')}>
                        <button>hãng máy</button>
                        {
                            isOpen.menu1 && (
                                <ul className="list-menu">
                                    {/* Hiển thị các hãng máy và số lượng của từng hãng */}
                                    {branList.length > 0 ? (
                                        branList.map((brandObj, index) => (
                                            <li key={index} className="list-item" onClick={() => handleBrandClick(brandObj.brand.toLowerCase())}>
                                                {brandObj.brand} ({brandObj.count}) {/* Hiển thị tên hãng và số lượng */}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-item">Đang tải...</li>
                                    )}
                                </ul>
                            )
                        }

                    </div>
                    <div className="menu1" onMouseEnter={() => togglemenu('menu2')} onMouseLeave={() => togglemenu('menu2')}>
                        <button>giá</button>
                        {
                            isOpen.menu2 && (
                                <ul className="list-menu">
                                    <li className="list-item">5tr</li>
                                    <li className="list-item">10tr</li>
                                    <li className="list-item">15tr</li>
                                    <li className="list-item">Trên 15tr</li>
                                </ul>
                            )
                        }

                    </div>
                    <div className="menu1" onMouseEnter={() => togglemenu('menu3')} onMouseLeave={() => togglemenu('menu3')}>
                        <button>RAM</button>
                        {
                            isOpen.menu3 && (
                                <ul className="list-menu">
                                    <li className="list-item">4gb</li>
                                    <li className="list-item">8gb</li>
                                    <li className="list-item">16gb</li>
                                    <li className="list-item">trên 16gb</li>
                                </ul>
                            )
                        }

                    </div>
                    <div className="menu1" onMouseEnter={() => togglemenu('menu4')} onMouseLeave={() => togglemenu('menu4')}>
                        <button>Car đồ họa</button>
                        {
                            isOpen.menu4 && (
                                <ul className="list-menu">
                                    <li className="list-item">intel core i3</li>
                                    <li className="list-item">intel core i5</li>
                                    <li className="list-item">intel core i7</li>
                                    <li className="list-item">intel core i9</li>
                                </ul>
                            )
                        }

                    </div>
                    <div className="menu1" onMouseEnter={() => togglemenu('menu5')} onMouseLeave={() => togglemenu('menu5')}>
                        <button>Màn hình</button>
                        {
                            isOpen.menu5 && (
                                <ul className="list-menu">
                                    <li className="list-item">13.3 inch</li>
                                    <li className="list-item">14 inch</li>
                                    <li className="list-item">15 inch</li>
                                    <li className="list-item">15.6 inch</li>
                                </ul>
                            )
                        }

                    </div>
                    <div className="menu1" onMouseEnter={() => togglemenu('menu6')} onMouseLeave={() => togglemenu('menu6')}>
                        <button>Dung lượng ổ cứng</button>
                        {
                            isOpen.menu6 && (
                                <ul className="list-menu">
                                    <li className="list-item">SSD 120GB-128GB</li>
                                    <li className="list-item">SSD 180GB -256GB</li>
                                    <li className="list-item">SSD 480GB-512GB</li>
                                    <li className="list-item">4T</li>
                                </ul>
                            )
                        }

                    </div>
                </div>

            </section>
            <h2>Danh sách sản phẩm Laptop</h2>
            {filteredProducts.map((laptop) => (
                <ItemSanPham
                    onClick={() => { showCT(laptop._id) }}
                    key={laptop._id}
                    {...laptop}

                />
            ))}
        </div>
    );
}

export default SanPham;