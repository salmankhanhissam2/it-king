

const mongoose = require("mongoose")

const db =  ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/user").then(()=>console.log("database is conected"))
}

module.exports = db;