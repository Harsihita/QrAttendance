import React from "react";
import { Link } from "react-router-dom";
import {img3} from "../images/istockphoto-1425196463-612x612.jpg"

export default function Frontpage() {
    return (
        <>
            <div className="">
                
                <div className="position-absolute bottom-50 start-0 text-center">
                <p className="display-1 text-start px-2  fw-bolder text-success ">Let's </p>
                <p className="display-1 text-start px-2 fw-medium text-success">Get Started</p>
                </div>
                
                <div className=" d-flex position-absolute top-50 start-30 ">
                <div className="p-2 text-center">
                    <Link to="/candidateLogin"><button className="btn btn-success btn-lg" >Signin</button></Link>
                    
                </div>
                <div className="p-2 text-center">
                    <Link to="/candidateSignup"><button className="btn btn-outline-success btn-lg">Signup</button></Link>
                    
                </div>
                </div>
                
            </div></>
    )
}