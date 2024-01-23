const mongoose=require("mongoose")
const bcrypt = require('bcryptjs');


const candidateSchema=mongoose.Schema({
    name:{type:"String",required:true},
    email: { type:"String", unique:true, required:true },
    password: { type:"String", required:true },
    qrCode:{type:"String"},
    
    attendance:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attendance',
    }]
},
  { timestamps: true }
  )

  candidateSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
  };
  candidateSchema.pre("save", async function (next){
    if(!this.isModified){
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
  });
  

const User = mongoose.model("User", candidateSchema);

module.exports=User;