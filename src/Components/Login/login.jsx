import '../Login/login.css'
import { FaEye,FaEyeSlash ,FaUser   } from "react-icons/fa";
import React, { useState ,useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';    
const Login = () => {
    const [eye, seteye] = useState(false)
    const navigate = useNavigate();
    
    
    const handleClick=()=>{
        seteye(a=>!a);
    }
    const handleSignup = () => {
        navigate('/signin'); // Chuyển hướng đến trang Signup
    }
    const handleHome=()=>{
        navigate('/home');
    }
    return ( 
        <div >
        <form action="" id="form-login">
            <h1 className="form-heading">Login</h1>
            <div className="form-group">
                <FaUser />
                <input type="text" className="form-input" placeholder="Tên đăng nhập" />
            </div>
            <div className="form-group">
                
                <input type={eye? "text" : "password"} className="form-input" placeholder="Mật khẩu" />
                <div>
                  {eye ? (
                    <FaEye onClick={handleClick}/>
                  ) : (
                    <FaEyeSlash onClick={handleClick}></FaEyeSlash>
                  )}
                </div>
                
            </div>
            <div className="button">
                <input type="button" value="Đăng nhập" className="form-submit"  onClick={handleHome}/>
                <input type="button" value="Đăng ký" className="form-submit" onClick={handleSignup} />
            </div>
        </form>
    </div>
     );
}
 
export default Login;