import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ChatState } from "../Context/ChatProvider";
import "../components/styles/qrhome.css"
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Qrhome() {
  const [qrCode, setQRCode] = useState(null);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
        'Content-Type': 'application/json',
      }

      await axios.post("http://localhost:5000/api/user/logout", { userId: user._id }, config)
      localStorage.removeItem('token');
      navigate("/candidateLogin")
    } catch (error) {
      console.log(error)
    }

  }
  const getData = async (latitude, longitude) => {
    const promise = await fetch(`http://api.weatherapi.com/v1/search.json?key=e6945ac524814eb19d9114327241501&q=${latitude},${longitude}&aqi=yes`)
    return await promise.json()
  }
  const userLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const result = await getData(latitude, longitude);

        fetch('http://localhost:5000/api/user/userLocation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ result }),
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    const intervalId = setInterval(userLocation, 5000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  // const{user,setUser}=ChatState();

  const fetchqr = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.get(`http://localhost:5000/api/user/${user._id}/qrcode`, config);

      setQRCode(data);
      //await axios.post(`http://localhost:5000/api/user/scan/${user._id}`,{userId:user._id},config);
      // Record attendance by sending a POST request to the server
      //const response = await axios.post('http://localhost:5000/api/user/recordAttendance', { userId: user._id }, config);
      //alert("Attendance Recorded")
      
      
      

    } catch (error) {
      console.log(error)
      toast.error('error', {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }
  useEffect(() => {

    fetchqr();
    // eslint-disable-next-line
  }, []);
  const recordAttendance = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      };

      // Record attendance by sending a POST request to the server
      await axios.post('http://localhost:5000/api/user/recordAttendance', { userId: user._id }, config);
      alert('Attendance Recorded');
    } catch (error) {
      console.log(error);
      toast.error('error', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <>
      <div className="container">
        <div>

          <ul className="nav justify-content-end ">
            <li className="nav-item py-4 ">
              <a className="" href="calendar"><FaRegCalendarCheck /></a>
            </li>
            <li className="nav-item ">
              <button className="nav-link fs-6 text-secondary py-4" aria-current="page" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
        <div className="py-3">
          <div className="">
            <img className="img-fluid rounded-circle qr-img p-2" src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" />
          </div>

          <p className="text-success fs-4 p-0 m-0">{user.name}</p>
          <p className="text-success text-opacity-75">{user.email}</p>
          <div className="" onClick={recordAttendance}>
            <img className="" src={qrCode}/>
          </div>

        </div>

      </div>
    </>
  )
}