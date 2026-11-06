const express = require('express')
const router = express.Router();
const multer  = require('multer')
const path = require('path')
const Blog = require('../models/blog.model')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`
    cb(null,filename);
   
  }
})

const upload = multer({ storage: storage })



router.get('/add',(req,res)=>{
    res.render('addBlog' , {
        user:req.user
    })
})

router.post('/add',upload.single('coverImgUrl'),async(req,res)=>{
    const {title , body } = req.body;
    console.log(req.body)

    try {
        const newBlog = await Blog.create({
        title:title,
        body : body,
        coverImgUrl:`/uploads/${req.file.filename}`,
        createdBy:req.user._id,

    });

    console.log("new blog added!!!",newBlog);
    return res.json("blog added successfully").status(201);
        
    } catch (error) {

        console.log("error from add blog", error);
        
    }
    
})


module.exports = router;