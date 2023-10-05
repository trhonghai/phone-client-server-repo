const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const generateToken = (id) =>{ 
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}


const createUser = asyncHandler(async (req, res) =>{
    // const email = req.body.email;
    // const findUser  = await User.findOne({email: email});
    // if(!findUser){
    //     const newUser = await User.create(req.body);
    //     res.json("Success");
    // }else{
    //     //User already exists
    //     throw new  Error('User Already Exists');
    // }

    const {name, email, password} = req.body;

    //validation
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill in  all required fields");
    }
    if(password.length < 6){
        res.status(400);
        throw new Error("Password must be up to 6 characters ");
    }
    // check if user exists

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("Email has already been registered");
    }

    // Create new user

    const user = await User.create({
        name,
        email,
        password
    })

    //Generate token
    const token = generateToken(user._id);

    if(user){
        const {_id, name, email, role} = user
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: true,
        }) 

        res.status(201).json({
            _id, name , email, role, token
        })
    } else{
        res.status(400);
        throw new Error("Invalid user data");
    }

    res.send( )
})

// Login User

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    // const findUser = await User.findOne({email});
    // //&& (await findUser.isPasswordMatched(password))
    // if(findUser && ( findUser.isPasswordMatched(password))){
    //     res.json("Success");
    // } else{
    //     throw new Error ("Invalid Credential");
    // }

    // Validate Request
    if(!email || !password){
        res.status(400);
        throw new Error("Please add email and password.");
    }
    //check id user exists
    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("User does not exist.")
    }
    // User exists, check if the password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    //Generatoken
    const token = generateToken(user._id);
    if(user && passwordIsCorrect){
        const newUser = await User.findOne({email}).select("-password");
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            // secure: true,
            // sameSite: true,
        }) 

        res.status(201).json(newUser);
    } else{
        res.status(400);
        throw new Error("Invalid email or password.")
    }
})

const logout = asyncHandler( async (req, res) =>{
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        // secure: true,
        // sameSite: true,
    });
    return res.status(200).json({message: "Successfully Logged Out"})

})

const getUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    
    if(user){
        res.status(200).json(user);
    } else{
        res.status(400);
        throw new Error("User Not Found");
    }
    
})

const getLoginStatus = asyncHandler( async (req, res) =>{
    const token = req.cookies.token;
    if(!token){
        res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(verified){
        res.json(true);
    } else{
        res.json(false);
    }
})


const updateUser = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.user._id);

    if(user){
        const {name, phone, address} = user;
        user.name = req.body.name || name;
        user.phone = req.body.phone || phone;
        user.address = req.body.address || address;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } else{
        res.status(404);
        throw new Error("User not found");
    }
})

// update Photo

const updatePhoto = asyncHandler( async(req, res)=>{
    const {photo} = req.body;
    const user = await User.findById(req.user._id);
    user.photo = photo;
    const updatedPhoto = await user.save();
    res.status(200).json(updatedPhoto);
   
})

module.exports = {
    createUser,
    loginUser,
    logout,
    getUser,
    getLoginStatus,
    updateUser,
    updatePhoto
}