import '../Login/login.css'
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const apiUrl = process.env.REACT_APP_API_URL
    const [eye, seteye] = useState(false)
    const [UserName, setUserName] = useState('')
    const [Password, setPassword] = useState('')
    const navigate = useNavigate();



    const handleClick = () => {
        seteye(a => !a);
    }
    const handleSignup = () => {
        navigate('/signin'); // Chuyển hướng đến trang Signup
    }
    const handleHome = async () => {
        if (UserName === "" || Password === "") return alert('Không để trống')
        try {
            // console.log("đã vào 1")
            const res = await fetch(apiUrl + `/auth/login/admin`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ UserName, Password })
                }
            )

            if (!res.ok) {
                const errorData = await res.json();
                return alert(errorData.message)
            }
            const data = await res.json()
            if (data) {
                // localStorage.setItem('token',data.AccessToken),
                localStorage.setItem('user', JSON.stringify(data))
            }
            // console.log(data);

            alert(data.message || 'Đăng nhập thành công')
            navigate('/home');
        } catch (error) {
            alert(error.message)
            console.log(error.message);

        }
    }
    return (
        <div>
            <form action="" id="form-login">
                <h1 className="form-heading">Đăng nhập</h1>
                <div className="form-group">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            value={UserName}
                            onChange={(txt) => setUserName(txt.target.value)}
                            className="form-input"
                            placeholder="Tên đăng nhập"
                        />
                        <FaUser className="input-icon" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-wrapper">
                        <input
                            type={eye ? 'text' : 'password'}
                            value={Password}
                            onChange={txt => setPassword(txt.target.value)}
                            className="form-input"
                            placeholder="Mật khẩu"
                        />
                        <span className="icon" onClick={handleClick}>
                            {eye ? <FaEyeSlash className='input-icon' /> : <FaEye className='input-icon' />}
                        </span>
                    </div>
                </div>
                <div className="button">
                    <input type="button" value="Đăng nhập" className="form-submit" onClick={handleHome} />
                </div>
            </form>
        </div>
    );
}

export default Login;