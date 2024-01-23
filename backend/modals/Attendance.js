const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  checkin:{type:Date,
  default:Date.now},
  
  checkout:{type:Date,
  default:Date.now},
  location:{
    type:String
  },
  
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Present',
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;