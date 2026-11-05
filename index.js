// dotenv.config()
const express  = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express();
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8000
const userRouter = require('./routes/user.route')
const {checkForAuthenticationCookie} = require('./middlewares/auth')


try {
    mongoose.connect('mongodb://localhost:27017/blogify').then((e)=>{
    console.log("Mongo is Connected Successfully")
})
    
} catch (error) {

    console.log("MongoDB connection fail")
    
}


app.set("view engine","ejs");
app.set("views",path.resolve('./views'))

app.use(express.json()) // parse json data coming from frontend
app.use(express.urlencoded({extended:true})) // parse html form data coming from frontend
app.use(cookieParser()) // parse cookies coming from frontend
app.use(checkForAuthenticationCookie('token-cookie')) // check for authentication cookie

app.use('/user',userRouter)

app.get('/',(req,res)=>{
    res.render("home" , {
        user:req.user
    })
})



app.listen(PORT,()=>{
    console.log(`Server is started on port http://localhost:${PORT}/ `)
})