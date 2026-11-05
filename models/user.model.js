// const { Timestamp } = require('bson');
const {createHmac , randomBytes} = require('crypto')
const {createTokenforUser} = require('../services/authentication')
const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
         type:String,
        require:true,
        unique:true,
    },
    salt:{
        type:String,
        // required:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImgUrl:{
         type:String,
         default:'public\images\avatar.jpg'
    },
    role:{
        type:String,
        enum:['USER','ADMIN'], // point
        default:'USER'
    }
},{timestamps:true});

// mongoose builtin middleware -- point
userSchema.pre('save',function(){

    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest('hex')


    this.salt = salt
    this.password = hashedPassword

    

})

userSchema.static('matchPasswordAndGnerateToken', async function(email , password){

    const user = await User.findOne({email});
    if(!user)  throw new Error("user not found");

    const salt = user.salt;
    const hashedPass = user.password

    const userProvidedHashPass = createHmac('sha256',salt).update(password).digest('hex')

    if(userProvidedHashPass !== hashedPass) throw new Error("hash not match")
    const token = createTokenforUser(user)

    return token;


})



const User = mongoose.model('user',userSchema);
module.exports = User;