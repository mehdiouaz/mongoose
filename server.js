const express= require('express');
const mongoose = require ("mongoose");
require("dotenv").config("./.env")
mongoose.connect(process.env.MONGO_URL,
(err)=> err ? console.log(err) : console.log("Data base is connected"))
const app=express();
app.use('/', require('./routes/userRoutes.js'))
const port = 3000;
app.listen(port , ()=> console.log("im listening to port :"+port));





