import initDB from "@/helpers/initDB";
import users from "@/model/users";
import bcrypt from 'bcryptjs';


initDB();

export default async (req , res)=>{
    const { Name , Email , Mobile , Gender , Media , State , Password} = req.body;
    try{
        if(!Name || !Email || !Mobile || !Gender || !Media || !State || !Password){
            return res.status(422).json({error : "Please Add all Fields"});
        }
        const user = await users.findOne({email : Email})
        if(user){
            return res.status(422).json({error : "user already exists"})
        }
        const hashedPassword = await bcrypt.hash(Password , 12)
        const newUser = await new users({
            name : Name , 
            email : Email , 
            mobile : Mobile ,
            gender : Gender ,
            media : Media , 
            state : State , 
            password : hashedPassword
        }).save();
        console.log(newUser)
        res.status(201).json({message : "SignUp Success"})
    }catch(err){
        console.log(err);
    }
}