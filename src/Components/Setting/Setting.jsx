import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
export const Setting = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        newPasswordagain: ''
    });
    const apiUrl = process.env.REACT_APP_API_URL
    const token = localStorage.getItem('token');
    const openDialog = () => {
        setIsDialogOpen(true);
    };

    // Đóng dialog
    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    // Xử lý sự kiện khi người dùng thay đổi giá trị trong form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // Xử lý xác nhận thay đổi mật khẩu
    // Xử lý xác nhận thay đổi mật khẩu
    const handleConfirm = async () => {
        // Kiểm tra nếu mật khẩu mới và mật khẩu xác nhận không khớp
        if (formData.newPassword !== formData.newPasswordagain) {
            alert('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }
        if (!token) {
            alert('Token không hợp lệ hoặc chưa đăng nhập');
            return;
        }

        try {
            const response = await fetch(apiUrl + '/auth/user/doi-mat-khau', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Nếu có sử dụng JWT
                },
                body: JSON.stringify({
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword
                })
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                alert('Đổi mật khẩu thành công');
                closeDialog(); // Đóng dialog sau khi thành công
            } else {
                alert(data.message || 'Đã xảy ra lỗi trong quá trình đổi mật khẩu');
            }
        } catch (error) {
            alert('Có lỗi kết nối đến server');
        }
    };
    return ( 
    <div className="sidebar" style={{ width: '70%' , display: 'block'}}> 
        {!isDialogOpen && (<ul>
          <li onClick={openDialog}><i class="fa-solid fa-key"></i> Đổi mật khẩu</li>
          <li><i className="fas fa-tags"></i> Đổi giao diện</li>
        </ul>)}
        {isDialogOpen && (
                <div>
                    <div className="dialog-content">
                        <h3>Đổi mật khẩu</h3>
                        <form>
                            <div>
                                <label>Nhập mật khẩu cũ</label>
                                <input 
                                    type="password" 
                                    name="oldPassword" 
                                    value={formData.oldPassword} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                            <div>
                                <label>Nhập mật khẩu mới</label>
                                <input 
                                    type="password" 
                                    name="newPassword" 
                                    value={formData.newPassword} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div> 
                            <div>
                                <label>Nhập lại mật khẩu mới</label>
                                <input 
                                    type="password" 
                                    name="newPasswordagain" 
                                    value={formData.newPasswordagain} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>
                            <div className="dialog-actions">
                                <button type="button" onClick={handleConfirm}>Xác nhận</button>
                                <button type="button" onClick={closeDialog}>Hủy</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
    </div> 
    );
}