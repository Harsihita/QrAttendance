import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";
import img2 from "../images/img2.jpg";
import "../styles/Register.css"

export default function Login(){

    
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const navigate=useNavigate()
    const submitHandler=async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        try{
            const response=await fetch("http://localhost:5000/api/user/signup",{
                 method:'POST',
                 headers:{
                    'Content-type':'application/json',
                 },
                 body: JSON.stringify({email, password }),
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/candidateqr")

        }catch(error){
            console.log(error,"Error occured")
            console.error('Error details:', error.message, error.stack);

            
        }
    }

    return(
        <>
             <div className="d-flex">
                <div className="p-5 flex-grow-1">
                    <p className="display-6 p-5 text-center fw-bold top-text">WELCOME BACK</p>

                    <form className="d-flex flex-column ">
                        
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