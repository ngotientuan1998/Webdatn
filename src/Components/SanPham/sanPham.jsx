import { useEffect, useState } from "react";
import '../SanPham/sanPham.css';
import { Button } from '@mui/material';
import ProductDialog from "../DialogThemSP/ThemSP";
import SuaSP from "../DialogThemSP/SuaSP";

const SanPham = ({ token, showCT }) => {

    const [isOpen, setisOpen] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [listSP, setListSp] = useState([]);
    const [branList, setBranlist] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");  // Thêm state cho từ khóa tìm kiếm
    const [selectedBrand, setSelectedBrand] = useState(""); // Tên hãng được chọn
    const [openMenu, setOpenMenu] = useState(null); // Quản lý tên của menu đang mở

    const apiUrl = process.env.REACT_APP_API_URL;

    // các state để mở dialog sửa
    const [isOpenDialogUpdate, setisOpenDialogUpdate] = useState(false);
    const [dataUpdate, setdataUpdate] = useState({});

    // hàm mở dialog sửa sản phẩm
    const closeDialogSua = () => setisOpenDialogUpdate(!isOpenDialogUpdate);

    // Hàm mở dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Hàm đóng dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const getListSP = async () => {
        try {
            const res = await fetch(apiUrl + '/san-pham', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                throw new Error('Fetch failed');
            }
            const data = await res.json();
            const brandCount = {};
            data.data.forEach((item) => {
                brandCount[item.idHangSP.TenHang.toLowerCase()] = (brandCount[item.idHangSP.TenHang.toLowerCase()] || 0) + 1;
            });
            const brands = Object.entries(brandCount).map(([brand, count]) => ({
                brand,
                count,
            }));
            setBranlist(brands);
            setListSp(data.data);
        } catch (error) {
            console.log(error);
        }
    };
    // Hàm lọc sản phẩm theo tên và hãng
    const filteredProducts = listSP.filter((product) => {
        const matchesName = searchQuery ? product.tenSP.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        const matchesBrand = selectedBrand ? product.idHangSP.TenHang.toLowerCase() === selectedBrand : true;
        return matchesName && matchesBrand;
    });
    useEffect(() => {
        getListSP();
    }, []);
    return (
        <div>
            <h3>Danh sách sản phẩm</h3>
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên sản phẩm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}  // Cập nhật searchQuery mỗi khi người dùng gõ
                />
                <select 
                    value={selectedBrand} 
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="brand-select"
                >
                    <option value="">Chọn hãng</option>
                    {branList.map((brand, index) => (
                        <option key={index} value={brand.brand}>
                            {brand.brand} ({brand.count})
                        </option>
                    ))}
                </select>

                <button onClick={handleOpenDialog} className="add-product-btn">Thêm sản phẩm</button>
            </div>
            {isOpenDialogUpdate && <SuaSP data={dataUpdate} token={token} fetchSanPham={getListSP} onClose={closeDialogSua} />}
            {openDialog && <ProductDialog fetchSanPham={getListSP} open={openDialog} onClose={handleCloseDialog} token={token} />}
            {/* Bảng hiển thị sản phẩm */}
            <table className="product-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Hãng sản phẩm</th>
                        <th>Ảnh</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((laptop, index) => (
                        <tr key={laptop._id}>
                            <td>{index + 1}</td>
                            <td>{laptop.tenSP}</td>
                            <td>{laptop.idHangSP.TenHang}</td>
                            <td>
                                {laptop.anhSP.map((anh) => (
                                    <img 
                                        src={process.env.REACT_APP_API_URL + anh} 
                                        alt={laptop.tenSP} 
                                        className="product-image" 
                                    />
                                ))}
                            </td>
                            <td>
                                <button onClick={() => {
                                    setdataUpdate(laptop);
                                    closeDialogSua();
                                }}>Sửa</button>
                                <button onClick={()=>{showCT(laptop)}}>Xem chi tiết</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SanPham;
