const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

require('dotenv').config();



exports.registerUser = async(req,res)=>{
    const{username,email,password}=req.body;
    try{

        //find if the info is already in use
        let user = await User.findOne({email});
        if(user){
            return res.status(401).json({message:'email aleady exist, try another'})
        }
       
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // const token =  jwt.sign({userId:user.id,username:user.username},process.env.JWT_SECKRETKEY,{expiresIn:'1hr'});

        newuser = new User({username,email,password:hashedPassword});
        await newuser.save();
        res.status(201).json({message:'User created successfully'})
    }catch(error){
        res.status(401).json({message:'error registering'})
    }
};

exports.loginUser = async(req,res)=>{
  
    const{email,password}=req.body;
    
    try{
        //find user if exist
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"user not found"})
        }
        //compare password
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(401).json({message:"invalid passsword"})
        }
        //jwt token
        const token =  jwt.sign({userId:user._id,username:user.username},process.env.JWT_SECKRETKEY,{expiresIn:'1hr'});
        res.json({username:user.username,token});
    
    }catch(error){
        res.status(401).json({message:"error logging in"})
    }
};


exports.getUser  = async(req,res)=>{
    try{
        const user = await User.findById(req.user.userId);
        res.json({mesaage:`welcome ${user.username} to the home page`})
    }catch(error){
        res.status(401).json({message:"error getting informations"})
    }
};

exports.getUserinfo  = async(req,res)=>{
    try{
        const user = await User.find().select('-password');
        res.json(user)
    }catch(error){
        res.status(401).json({message:"error getting informations"})
    }
};


