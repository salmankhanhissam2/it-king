const { apiError } = require("../utils/apiError");
const User = require("../models/user.js");
const { ApiResponse } = require("../utils/apiRes");
const genrateAcessToken = async (userId)=>{
   try {
     const user = User.findById(userId);
     const AccessToken = await user.genrateAcessToken();
     return AccessToken;
   } catch (error) {
    console.log(error)
   }
}

const userRegister = async (req ,res)=>{
    const{username , email,password} = req.body;
    if(!(username&& email &&password)){
       throw new apiError(400,"All field are required")
    }
    const exituser = await User.findOne({email})
    if(exituser){
      throw new  apiError(400, "user Allready register")
    }
    const creatuser  = await User.create({
        username,
        email,
        password
    });
    creatuser.save()
    const options ={
        httpOnly:true,
        secure : true
    }
    const AccessToken = genrateAcessToken(creatuser._id)
    return res.status(201).cookie("AccessToken",AccessToken,options)
    .json( new ApiResponse(201,creatuser , "data  is sended successfuly"))

}

module.exports = {userRegister}