
const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");



//@desc Get all users
//@route POST /api/users/register
//@access public
const registerUser=asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registred");

    }

//Hash password
const hashpassword=await bcrypt.hash(password,10);
console.log("Hash password" +hashpassword);

const user=await User.create({
    username,
    email,
    password:hashpassword
});

console.log(`user created  ${user}`);
if(user){
    res.status(201).json({_id:user.id,email:user.email});
}
else{
    res.status(400);
    throw new Error("User data is not valid");
}
    res.json({message:"Register the user"});
    });

//@desc current user
//@route POST /api/users/current
//@access public
const currentUser=asyncHandler(async (req,res)=>{
    res.json({messgae:"current user"});
    });

//@desc login user
//@route get /api/users/login
//@access public
const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400)
        throw new Error("All fields are mandaotry");

    }

    const user=await User.findOne({email});
    //compare password with hashed pwd


if(user && (await bcrypt.compare(password,user.password)))
{
    const accessToken=jwt.sign({
        user:{
            username:user.username,
            email:user.email,
            id:user.id,
       },

    },process.env.ACCESS_TOKEN_SECRETE,
    
    {expiresIn:"1m"}
    );
    res.status(200).json({accessToken});

}
else{
    res.status(401)
    throw new Error("email or password is not valid");
}
    });    

module.exports={registerUser,loginUser,currentUser};