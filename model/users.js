import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true
    } ,
    email : {
        type : String , 
        required : true , 
        unique : true
    } ,
    mobile : {
        type : Number ,
        required : true
    } ,
    gender : {
        type : String ,
        required : true
    } ,
    media : [
        {
            type : String ,
            required : true
        }
    ] ,
    state : {
        type : String ,
        required : true
    } ,
    password : {
        type : String ,
        required : true
    } 
} ,
{
    timestamps : true
})
export default mongoose.models.User || mongoose.model('User' , userSchema)