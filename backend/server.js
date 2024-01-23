const express = require('express')
const dotenv=require("dotenv");
const candidateRoute=require("../backend/routes/candidateRoute")
const bodyParser = require('body-parser');
const mongodb=require("./config/db")

const cors = require('cors');
const port=0;
dotenv.config()
mongodb()
const app = express();
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
app.use("/api/user",candidateRoute)

const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started port ${PORT}`))
