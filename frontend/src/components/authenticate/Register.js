import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img2 from "../images/img2.jpg"
import { toast } from "react-toastify";
import "../styles/Register.css"

export default function Register() {

    const[name,setName]=useState()
    const[email,setEmail]=useState() 
    const[password,setPassword]=useState()
    const navigate=useNavigate();
 
    const submitHandler=async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        
        if(!name || !email || !password){
            toast.error('Please fill all the field', {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }


        try{
            // const config = {
            //     headers: {
            //         "Content-type": "application/json",
            //     },
            // };
            
            // const { data } = await axios.post('http://localhost:5000/api/user/register',{
            //     name,email,password
            // },config
            // );
            // console.log(data)
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name,email, password }),
            });
            if (!response.ok) {
                 throw new Error(`HTTP error! Status: ${response.status}`);
             }
            const data = await response.json();
            toast.success('Registration successfull!', {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/candidateqr")
            
        }catch(error){
            console.log(error,"Error occured")
            console.error('Error details:', error.message, error.stack);

            toast.error('Error', {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    }
    return (
        <>
            <div className="d-flex">
                <div className="p-5 flex-grow-1">
                    <p className="display-6 p-5 text-center fw-bold top-text">USER LOGIN</p>

                    <form className="d-flex flex-column ">
                        <div className="form-floating mb-3 ">
                            <input type="text" className="form-control"  placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} />
                            <label for="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-3 ">
                            <input type="email" className="form-control"  placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating ">
                            <input type="password" className="form-control"  placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div className="d-grid gap-2 p-5">
                        <button type="button" className="btn btn-dark btn-lg" onClick={(e)=>submitHandler(e)} >Submit</button>
                        </div>
                    </form>


                </div>
                <div className="box-2 ">
                    <img className="" src={img2} alt="" />
                </div>
            </div>
        </>
    )
}