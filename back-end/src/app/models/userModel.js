const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema(
    {
       name:{
        type:String,
        required: [true, "Please add a name"],
       },
       email:{
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
       },
       password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
       },
       role: {
        type: String, 
        required: [true],
        default: "customer",
        enum: ["customer", "admin"],
       },
       photo:{
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png",
       },
       phone:{
        type:String,
        default: "+84",
       },
       address: {
        type: Object,
       }
    },

)

userSchema.pre('save', async function (next){

    if(!this.isModified('password')){
        next();
    }   
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema);