const express=require("express")
const User=require("../modals/candidateModal")
const asynchandler=require("express-async-handler")
const generateToken=require("../config/generateToken")
const qrcode = require('qrcode');
const Attendance = require("../modals/Attendance");

const scanUser=asynchandler(async(req,res)=>{
    const userId = req.userId;
    // Perform attendance recording logic using the userId
    res.json({ message: 'Attendance recorded successfully', userId });
})
const registerUser=asynchandler(async(req,res)=>{
    
    const {name,email,password,userId}=req.body;
    const currentTime = new Date().toLocaleString();
    if (!email || !password ||!name) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
 //     res.redirect(`/${user._id}/qrcode`);
    }
    
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 525960);
    const apiLink=`http://localhost:5000/api/user/recordAttendance`;
    const qrCodeData = JSON.stringify({ email, name ,currentTime,expirationTime: expirationTime.toLocaleString(),action: 'recordAttendance',apiLink});
    const qrCodeImage = await qrcode.toDataURL(qrCodeData);
    const user = await User.create({
        name,
        email,
        password,
        qrCode: qrCodeImage,
        qrCodeExpiration: expirationTime,
    });
    
    
    if (user) {
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email: user.email,
            qrCode: user.qrCode,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create");
    }
})

const qrUser=asynchandler(async(req,res)=>{
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
        }else{
            const currentTimestamp = new Date();
            if(user.qrCodeExpiration && user.qrCodeExpiration < currentTimestamp){
                await user.remove()
                res.status(400).json({ error: 'QR code has expired' });
            }else{
                res.send(user.qrCode)
            }
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
const authUser=asynchandler(async(req,res)=>{
    const {email,password} = req.body;
    console.log(email)
    const user = await User.findOne({email});
    console.log(User)
    if(user && (await user.matchPassword(password))){
        console.log(user)
        res.json({
            _id: user._id,
            email:user.email,
            token:generateToken(user._id),
        });
    }else{
        res.status(401);
        throw new Error('Invalid Email or Password');
    }

})
const userLogout=asynchandler(async(req,res)=>{
    
    const UserId=req.body.userId;
    try{
        await Attendance.deleteMany({UserId})
        await User.findByIdAndDelete(UserId)

        res.json({ message: 'Logout successful' });
    }catch(error){
        res.status(401)
        throw new Error('Something Wrong');
        
    }

    
})
module.exports={registerUser,qrUser ,authUser,userLogout}

