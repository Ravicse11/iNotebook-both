const mongoose = require('mongoose');

const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone_no:{
       type:Number,
        required:true
    },

    dob: {
        type: String,
        required: true,
        
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    gender:{
        type:String,
        enum:{
            values:["Male","male","MALE","Female","female","FEMALE","other"],
            message:"fill correct gender",
        },
       
    }
    
});
const User = mongoose.model('User', UserSchema);
//User.createIndexes();
module.exports = User;