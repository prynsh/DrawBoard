import express  from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleWare } from "./middleware";
import { UserSchema, SingInSchema, CreateRoomSchema } from  "@repo/common/config"
import { prismaClient  } from "@repo/db/client";


const app = express();
app.use(express.json());
dotenv.config();



app.get("/signup", async (req,res)=>{

    const parsedData = UserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs "
        })
        return;
    }
    try{
        const user = await prismaClient.user.create({
            data:{
                email:parsedData.data?.username,
                password:parsedData.data.password,
                //hash the pw 
                name:parsedData.data.name
            }
            
        })
        res.json({
            userId:user.id
        })
    }catch(e){
        res.status(411).json({
            message:"User already exists"
        })
    }

})


app.post("/signin", async (req,res)=>{
    const parsedData = SingInSchema.safeParse(req.body);

    if(!parsedData.success){
        res.json({
            message: "Incorrect inputs"
        })
        return 
    }

    //comapre the hashed pw
    const user = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if(!user){
        res.status(403).json({
            message:"Not authorised"
        })
        return;
    }

    const token = jwt.sign({
        userId : user?.id
    },JWT_SECRET);

    res.json({
        token
    })

})

app.get("room", middleWare ,async (req,res)=>{
    const parsedData = CreateRoomSchema.safeParse(req.body);

    if(!parsedData.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    //check this in db whether it is present or not and then let them create a room
    //@ts-ignore:TODO 
    const userId = req.userId;
    try{

        const room = await prismaClient.room.create({
            data:{
                slug: parsedData.data.name,
                adminID : userId
            }
        })
        
        res.json({
            roomId : room.id
        })
    }catch(e){
        res.status(411).json({
            message:"Room already exists"
        })
    }
})

app.listen(3001);