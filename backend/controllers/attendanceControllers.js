const User=require("../modals/candidateModal")
const asynchandler=require("express-async-handler")
const generateToken=require("../config/generateToken")
const Attendance=require("../modals/Attendance")
const axios = require('axios');

const userlocation = asynchandler(async(req,res)=>{
    const result = req.body;
    console.log(result)
    res.status(200).send({ result });
})
const recordAttendance=asynchandler(async(req,res)=>{
    
    const userId =req.body.userId;
    if (!userId) {
        return res.status(400).json({ success: false, message: 'Invalid request body' });
    }
    try{
        // const userLocation =await userlocation();
        
    const attendance = new Attendance({ userId });
    // Associate the attendance record with the user
    
    const user = await User.findById(userId);
    
    user.attendance.push(attendance); 
    
    await Promise.all([attendance.save(), user.save()]);

    res.status(200).json({ success: true, message: 'Attendance recorded successfully' });
    }catch(error){ 
        console.error(error);
        res.status(500).json({ success: false, message: error});
    }

})

module.exports={recordAttendance,userlocation}