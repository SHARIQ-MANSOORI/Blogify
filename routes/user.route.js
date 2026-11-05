const express = require('express');
const {User,matchPasswordAndGnerateToken} = require('../models/user.model');
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
   

    try {
    const token = await matchPasswordAndGnerateToken(email,password);
    console.log("token:",token);
    return res.cookie('token-cookie',token).redirect('/')
        
    } catch (error) {
        console.log(error);
        return res.render('signin')
        
    }


   
})

router.get('/signout',(req,res)=>{
    return res.clearCookie('token-cookie').redirect('/')
})

module.exports = router;