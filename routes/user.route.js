const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

router.get('/signup' , (req,res)=>{
    return res.render("signup")
})

router.get('/signin',(req,res)=>{
    return res.render("signin")
})

router.post('/signup', async(req,res)=>{
    const {fullName , email , password} = req.body;

    const newUser = await User.create({
        fullName,
        email,
        password
    })
    console.log(fullName,email,password)
    console.log("NewUser:",newUser)

    return res.redirect('/')
})

router.post('/signin', async(req,res)=>{
    const {email , password} = req.body;
    const user = await User.matchPassword(email,password);

    console.log(user);
    return res.redirect('/')
})
module.exports = router;