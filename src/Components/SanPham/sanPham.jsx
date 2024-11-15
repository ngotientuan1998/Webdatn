import { useEffect, useState } from "react";
import '../SanPham/sanPham.css'
import ItemSanPham from "./ItemSanPham";
import { Button } from '@mui/material';
import ProductDialog from "../DialogThemSP/ThemSP";
const SanPham = ({ token, showCT }) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [listSP, setListSp] = useState([])
    const apiUrl = process.env.REACT_APP_API_URL


    // Hàm mở dialog
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    // Hàm đóng dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


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
                }
            )
            if (!res.ok) {
                throw new Error('Fetch failed');
            }

            const data = await res.json();
            // console.log(data);

            setListSp(data.data)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {

        getListSP()
    }, [])

    return (
        <div>
            <section>
                <h3>Chào mừng bạn đến với trang sản phẩm</h3>
                <input type="text" placeholder="Tìm kiếm" />
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>Thêm sản phẩm</Button>

                {/* Hiển thị ProductDialog khi openDialog = true */}
                {openDialog && <ProductDialog fetchSanPham={getListSP} open={openDialog} onClose={handleCloseDialog} token={token} />}
            </section>
            <h2>Danh sách sản phẩm Laptop</h2>
            {listSP.map((laptop) => (
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