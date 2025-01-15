import React, { useEffect, useState } from 'react'
import '../Doitra_HoanTien/DoiTra_HoanTien.css';
import DialogListSP from './DialogListSP';
const DoiTra_HoanTienComponent = ({ token }) => {
    const [listSPRD, setlistSPRD] = useState([])
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [isOpenDialog, setisOpenDialog] = useState(false);
    const [SPRD, setSPRD] = useState({})
    console.log(isOpenDialog);
    

    const handleOpenDialog = () => {
        setisOpenDialog(!isOpenDialog);
    }
    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleFilterStatusChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const filteredList = listSPRD.filter(item => {
        return (filterType ? item.Type === filterType : true) && (filterStatus ? item.TrangThai === filterStatus : true);
    });

    const uniqueTypes = [...new Set(listSPRD.map(item => item.Type))];
    const uniqueStatuses = [...new Set(listSPRD.map(item => item.TrangThai))];

    const getListSPRD = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/san-pham-rui-do/admin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message);
                throw new Error(errorData.message);
            }
            const data = await res.json();
            console.log(data.data);

            setlistSPRD(data.data);
            // alert(data.message);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }
    const handleHuySPRD = async (id) => {
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/san-pham-rui-do/admin/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message);
                throw new Error(errorData.message);
            }
            const data = await res.json();
            alert(data.message);
            getListSPRD();
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }
    const handleHoanTien = async (id) => {
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + '/san-pham-rui-do/admin/xu-ly/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message);
                throw new Error(errorData.message);
            }
            const data = await res.json();
            alert(data.message);
            getListSPRD();
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    }
    useEffect(() => {
        getListSPRD()
    }, [isOpenDialog])
    return (
        <div className="table-container">
            {isOpenDialog && <DialogListSP token={token} SPRD = {SPRD} onClose={()=>handleOpenDialog()}/>}
            <div>
                <label>
                    Lọc theo loại:
                    <select value={filterType} onChange={handleFilterTypeChange}>
                        <option value="">Tất cả</option>
                        {uniqueTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Lọc theo trạng thái:
                    <select value={filterStatus} onChange={handleFilterStatusChange}>
                        <option value="">Tất cả</option>
                        {uniqueStatuses.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                </label>
            </div>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Khách hàng</th>
                        <th>Hình ảnh</th>
                        <th>Lý Do</th>
                        <th>Loại</th>
                        <th>Trạng Thái</th>
                        <th>Ngày Yêu Cầu</th>
                        <th>Ngày Xử Lý</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList && filteredList.length > 0 ? (
                        filteredList.map((item) => (
                            <tr key={item._id}>
                                <td>{item.idDonHangCT.idDonHang.idKhachHang.HoTen} <br /> ({item.idDonHangCT.idDonHang.idKhachHang.Sdt})</td>
                                <td>
                                    {item.HinhAnhMinhHoa && item.HinhAnhMinhHoa.length > 0 ? (
                                        item.HinhAnhMinhHoa.map((url, index) => (
                                            <img
                                                key={index}
                                                src={process.env.REACT_APP_API_URL+url}

                                                style={{ width: '30px', height: '30px', marginRight: '5px' }}
                                            />
                                        ))
                                    ) : (
                                        'Không có hình ảnh'
                                    )}
                                </td>
                                <td>{item.LyDo}</td>
                                <td>{item.Type}</td>
                                <td>{item.TrangThai}</td>
                                <td>{new Date(item.NgayYeuCau).toLocaleDateString()}</td>
                                <td>{item.NgayXuLy ? new Date(item.NgayXuLy).toLocaleDateString() : 'Chưa xử lý'}</td>
                                <td>
                                    {item.TrangThai === 'Chờ xử lý' && (
                                        <>
                                            <button className='button' onClick={() => handleHuySPRD(item._id)}>Từ chối</button>
                                            {item.Type === 'Đổi trả' &&  (<button className='button' onClick={()=> {
                                                setSPRD(item)
                                                handleOpenDialog()
                                            }}>Đổi hàng</button>)}
                                            {item.Type === 'Hoàn tiền' &&  (<button className='button' onClick={()=> handleHoanTien(item._id)}>Hoàn tiền</button>)}
                                        </>
                                    )}

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DoiTra_HoanTienComponent

