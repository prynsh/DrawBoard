import express  from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleWare } from "./middleware";
import { UserSchema, SingInSchema, CreateRoomSchema } from  "@repo/common/config"


const app = express();
app.use(express.json());
dotenv.config();



app.get("/signup", (req,res)=>{
 
    
    const email = req.body.email;
    const password = req.body.password ;

    

    //db call to put this in db


    
    
    console.log("Hi there");

})


app.post("/signin",(req,res)=>{
    const data = SingInSchema.safeParse(req.body);

    if(!data.success){
        res.json({
            message: "Incorrect inputs"
        })
        return 
    }
    //check this in db whether it is present or not and then let them in
    const userId=1;
    if(userId){
        const token = jwt.sign({
        userId
    },JWT_SECRET)
    }

})

app.get("room", middleWare ,(req,res)=>{
    const data = CreateRoomSchema.safeParse(req.body);

    if(!data.success){
        res.json({
            message: "Incorrect inputs"
        })
        return 
    }
    //check this in db whether it is present or not and then let them create a room
})

app.listen(3001);