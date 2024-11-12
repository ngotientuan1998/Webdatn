import { useState,useEffect } from 'react';
import './singin.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
const Singin = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassWord] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // useEffect(() => {
  //   // Thay đổi CSS cho body
  //   document.body.style.cssText = `
  //   font-family: "Sora", sans-serif;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   min-height: 100vh;
  //   background-color: rgb(239, 240, 255);
  //   scroll-behavior: smooth;
  //   text-rendering: optimizeSpeed;
  //   line-height: 1.5;
  //   padding: 1rem 2rem;
  //   font-size: 1.15rem;
  // `;
    
  //   // Clean up để hủy bỏ các thay đổi khi component bị hủy
  //   return () => {
  //       document.body.style.cssText = `display: contents; `
        
  //       ; // Hủy bỏ các thuộc tính đã thiết lập
      
  //   };
  // }, []); // Chạy một lần khi component mount
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      password: "",
      email: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("required").min(4, "Không được nhỏ hơn 4 kí tự"),
      email: Yup.string().required("required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Plesea emter a valid email address"),
      password: Yup.string().required("required").matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Please enter 8 characters,a-A,0-9"),
      confirmPassword: Yup.string().required("required").oneOf([Yup.ref("password"), null], "Password must match "),
      phone: Yup.string().required("Required").matches(/^[0-9\-\+]{9,15}$/, "Phone valid")
    }),
    onSubmit: (a) => {
      console.log(a)
    }

  })
  

  // const handleSumbit=(e)=>{

  //     e.preventDefault();
  //     const newUser={
  //         email: email,
  //         phone: phone,
  //         name: name,
  //         password: password
  //     }
  //     console.log(newUser)
  // }
  // console.log(formik.values)
  return (
    <div className='.sigincontiner'>
    <section className='App'>
      <header> Sign up </header>
      <form action="" className="infoform" onSubmit={formik.handleSubmit}>
        <label> Your Name</label>
        <input type='text'
          id='name'
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder='Enter your name' />
        {formik.errors.name && (
          <p className='errorMsg'>{formik.errors.name}</p>
        )}
        <label> Your Email</label>
        <input type='email'
          id='email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder='Enter your email' />
        {formik.errors.email && (
          <p className='errorMsg'>{formik.errors.email}</p>
        )}
        <label> Your Password</label>
        <input type='password'
          id='password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder='Enter your password' />
        {formik.errors.password && (
          <p className='errorMsg'>{formik.errors.password}</p>
        )}
        <label>Confirm Your Password</label>
        <input type='text'
          id='confirmPassword'
          name='confirmPassword'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          placeholder='Confirme your password' />
        {formik.errors.confirmPassword && (
          <p className='errorMsg'>{formik.errors.confirmPassword}</p>
        )}
        <label>Your Phone</label>
        <input type='text'
          id='phone'
          name='phone'
          value={formik.values.phone}
          onChange={formik.handleChange}
          placeholder='Your Phone' />
        {formik.errors.phone && (
          <p className='errorMsg'>{formik.errors.phone}</p>
        )}
        <button type='submit'>Sumbit</button>
      </form>
    </section>
    </div>
  );
}

export default Singin;