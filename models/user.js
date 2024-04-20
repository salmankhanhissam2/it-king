const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSechema = new mongoose.Schema({
    username : {
        type :String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type : String,
        required: true
    }
});
userSechema.pre("save", async function(next) {

    if (!this.isModified("password")) {
      return next();
    }
  
  
    try {
      const salt = await bcryptjs.genSalt(10);
      let hashedPassword = await bcryptjs.hash(this.password, salt);
      this.password = hashedPassword;
      return next();
    } catch (error) {
      return next(error);
    }
  });
const ACCESS_TOKEN_SECRET = "abcdfgher";
const ACCESS_TOKEN_EXPIRY = "10d";
userSechema.methods.genrateAcessToken = function(){
    return jwt.sign({
        _id : this._id,
        email: this.email,
        username: this.username,
        password: this.password
    },
ACCESS_TOKEN_SECRET,ACCESS_TOKEN_EXPIRY);
};

User = mongoose.model("user",userSechema);
module.exports = User;