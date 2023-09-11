import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true , 'please provide a username'],
        unique : true
    },
    password: {
        type: String,
        required: [true, 'please provide a password']
    },
    email: {
        type: String,
        required: [true, 'please provide an email'],
        unique : true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerfied: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry: Date,
    verifyToken : String,
    verifyTokenExpiry: Date,
})

const User = mongoose.model.users || mongoose.model('user' , userSchema)

export default User