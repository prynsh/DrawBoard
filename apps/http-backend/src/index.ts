import express  from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleWare } from "./middleware";
import { UserSchema, SingInSchema, CreateRoomSchema } from  "@repo/common/config"
import { prismaClient  } from "@repo/db/client";
import bcrypt  from "bcrypt"


const app = express();
app.use(express.json());
const saltRounds= 5;

app.post("/signup", async (req,res)=>{
    const parsedData = UserSchema.safeParse(req.body);

    if(!parsedData.success){
        res.json({
            message:"Incorrect Inputs "
        })
        return;
    }
    try{
        const hashedPassword = await bcrypt.hash(parsedData.data.password, saltRounds)
        const user = await prismaClient.user.create({
            data:{
                email:parsedData.data?.username,
                password:hashedPassword,
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
        }
    })

    if(!user){
        res.status(403).json({
            message:"User Not found"
        })
        return;
    }
    const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password)
    if(!isPasswordValid){
        res.status(403).json({
            message:"Incorrect Password"
        })
    }

    const token = jwt.sign({
        userId : user?.id
    },JWT_SECRET);

    res.json({
        token
    })

})

app.get("/room", middleWare ,async (req,res)=>{
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
    const isUserIdValid = await prismaClient.user.findFirst({
        where:{
            id:userId
        }
    })
    if(!isUserIdValid){
         res.status(403).json({
            message:"Invalid User Id "
        })
    }
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

app.get("/chats/:roomId", async (req,res)=>{
    const roomId = Number(req.params.roomId);

    const roomExists = await prismaClient.room.findUnique({
        where: { id: roomId }
    });

    if (!roomExists) {
         res.status(404).json({
            message: "Room not found"
        });
    }

    const messages = await prismaClient.chat.findMany({
        where:{
            roomId:roomId
        },
        orderBy:{
            id: "desc"
        },
        take:50
        //order by descending here and display top 50 messages only 
        
    })
    res.json({
        messages
    })
})

app.get("/room/:slug", async(req,res) =>{
    const slug = req.params.slug;
    const room = await prismaClient.room.findMany({
        where:{
            slug: slug
        }
    });
    res.json({
        room
    })
})

app.listen(3001);