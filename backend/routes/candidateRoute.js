const express=require("express")
const {registerUser,allUser,qrUser,authUser,userLogout}=require("../controllers/candidateControllers")
const {recordAttendance,userlocation}=require("../controllers/attendanceControllers")
const router=express.Router();

router.post("/register",registerUser)
router.post("/userLocation",userlocation)
router.get("/:userId/qrcode",qrUser)
router.post("/recordAttendance",recordAttendance)
router.post("/logout",userLogout)
router.post("/signup",authUser)
// router.post("/scan/:userId",scanUser)
// router.get("/register",allUser)


module.exports=router; 