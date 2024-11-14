import { useEffect, useState } from "react";
import '../SanPham/sanPham.css'
import ItemSanPham from "./ItemSanPham";
const SanPham = ({token}) => {
    const [isOpen, setisOpen] = useState({})
    
     const [listSP,setListSp] = useState([])
     const apiUrl = process.env.REACT_APP_API_URL
    
    
    
    
    
    // if(user) {
    //   setToken(resUser.AccessToken)      
    // }
    
     useEffect(()=>{
        const getListSP = async () => {
            try {
                const res = await fetch(apiUrl+'/san-pham',
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
        getListSP()
     },[])
    const togglemenu = (menu) => {
        setisOpen((prev) => ({
            ...prev,
            [menu]: !prev[menu]
        }))

    }
    
   

    return (
        <div>
            <section>
            <h3>Chào mừng bạn đến với trang sản phẩm</h3>
                <input type="text" placeholder="Tìm kiếm" />
                <p>Tùy chọn</p>

                <div className="tuychon">
                    <div className="menu1" onMouseEnter={() => togglemenu('menu1')} onMouseLeave={() => togglemenu('menu1')}>
                        <button>hãng máy</button>
                        {
                            isOpen.menu1 && (
                                <ul className="list-menu">
                                    <li className="list-item">dell</li>
                                    <li className="list-item">dell</li>
                                    <li className="list-item">dell</li>
                                    <li className="list-item">dell</li>
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
            {listSP.map((laptop) => (
                <ItemSanPham
                    key={laptop._id}
                    {...laptop}
                    
                />
            ))}
        </div>
    );
}

export default SanPham;