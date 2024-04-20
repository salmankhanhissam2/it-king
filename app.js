const express = require("express")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//define route
const userRoute = require("./routes/user.route.js")
app.use("/",userRoute);




module.exports= app

