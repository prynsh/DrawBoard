import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import "dotenv/config";
import { JWT_SECRET } from "./config";

console.log(process.env.JWT_SECRET); // Should print "HELLO"


export function middleWare(req:Request,res:Response,next:NextFunction){
    const token = req.headers["authorization"] ||"";

    const decoded = jwt.verify(token, JWT_SECRET )

    if(decoded){
        //@ts-ignore
        req.userId = decoded.userId;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not authorized to access this resource"
        })
    }

}