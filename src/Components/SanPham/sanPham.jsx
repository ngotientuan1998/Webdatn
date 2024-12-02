import { useEffect, useState } from "react";
import '../SanPham/sanPham.css'
import ItemSanPham from "./ItemSanPham";
import { Button } from '@mui/material';
import ProductDialog from "../DialogThemSP/ThemSP";
import SuaSP from "../DialogThemSP/SuaSP";
const SanPham = ({ token, showCT }) => {

    const [isOpen, setisOpen] = useState({})
    const [openDialog, setOpenDialog] = useState(false);
    const [listSP, setListSp] = useState([])
    const [branList, setBranlist] = useState([])
    const [searchQuery, setSearchQuery] = useState("");  // Thêm state cho từ khóa tìm kiếm

    const [selectedBrand, setSelectedBrand] = useState(null); // Tên hãng được chọn
    const [openMenu, setOpenMenu] = useState(null); // Quản lý tên của menu đang mở

    // các state để mở dialog sửa
    const [isOpenDialogUpdate, setisOpenDialogUpdate] = useState(false)
    const [dataUpdate, setdataUpdate] = useState({})

    // hàm mở dialog sửa sản phẩm

    const closeDialogSua = () => setisOpenDialogUpdate(!isOpenDialogUpdate)



    const apiUrl = process.env.REACT_APP_API_URL


    // Hàm mở dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Hàm đóng dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleBrandClick = (a) => {
        if (openMenu == "menu1") {
            setSelectedBrand(a)
        } else return
    }

    // if(user) {
    //   setToken(resUser.AccessToken)      
    // }

    const getListSP = async () => {
        try {
            const res = await fetch(apiUrl + '/san-pham',
                {
                    method: 'GET',  // Hoặc 'POST' nếu bạn gửi dữ liệu
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,  // Thêm token vào header
                    },
                })

            if (!res.ok) {
                throw new Error('Fetch failed');
            }
            const data = await res.json();
            // console.log(data.data);
            // Đếm số lượng sản phẩm của mỗi hãng
            const brandCount = {};


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

    //Hàm lọc sản phẩm theo tên
    const filteredProducts = listSP.filter((product) => {
        const matchesName = searchQuery ?
            product.tenSP.toLowerCase().includes(searchQuery.toLowerCase())
            : true
        //  // Lọc theo tên sản phẩm nếu có searchQuery
        const matchesBrand = selectedBrand
            ? product.idHangSP.TenHang.toLowerCase() === selectedBrand
            : true;

        return matchesName && matchesBrand
    });
    // console.log(selectedBrand)
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
    useEffect(() => {

        getListSP()
    }, [])



    return (
        <div>
            <section>
                <h3>Chào mừng bạn đến với trang sản phẩm</h3>

                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên sản phẩm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}  // Cập nhật searchQuery mỗi khi người dùng gõ
                />
                <div className="menu1" onMouseEnter={() => togglemenu('menu1')} onMouseLeave={() => togglemenu('menu1')}>
                    <button>Hãng máy</button>
                    {
                        isOpen.menu1 && (
                            <ul className="list-menu">
                                {/* Hiển thị các hãng máy và số lượng của từng hãng */}
                                {branList.length > 0 ? (
                                    branList.map((brandObj, index) => (
                                        <li key={index} className="list-item" onClick={() => handleBrandClick(brandObj.brand.toLowerCase())}>
                                            {brandObj.brand.toUpperCase()} ({brandObj.count}) {/* Hiển thị tên hãng và số lượng */}
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-item">Đang tải...</li>
                                )}
                            </ul>
                        )
                    }

                </div>
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>Thêm sản phẩm</Button>
                {/* Hiển thị ProductDialog khi openDialog = true */}
                {isOpenDialogUpdate && <SuaSP data={dataUpdate} token={token} fetchSanPham={getListSP} onClose={closeDialogSua} />}
                {openDialog && <ProductDialog open={openDialog} onClose={handleCloseDialog} />}
                {openDialog && <ProductDialog fetchSanPham={getListSP} open={openDialog} onClose={handleCloseDialog} token={token} />}
            </section>
            <h2>Danh sách sản phẩm Laptop</h2>
            {filteredProducts.map((laptop) => (
                <ItemSanPham
                    closeDialogSua={closeDialogSua}
                    updateProduct={(item) => { setdataUpdate(item) }}
                    onClick={() => { showCT(laptop) }}
                    key={laptop._id}
                    {...laptop}

                />
            ))}
        </div>
    );
}

export default SanPham;