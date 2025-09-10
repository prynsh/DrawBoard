'use client'

import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { WS_URL } from "@/config";
import Canvas from "./Canvas";

export function RoomCanvas({roomId}:{roomId:string}){
  
    const [socket,setSocket] =useState<WebSocket | null>(null);
    
    useEffect( () => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1M2UxZDE3ZC0wZDMzLTRlZWItYWQ1Zi02OTYwMGFiYjVjZDAiLCJpYXQiOjE3NTc0MjYyNTN9.RyNoyGipemFjroVX9Pu-1sbgywkR_jcLP8ECE5sBOQE`);
        ws.onopen= ()=>{
            setSocket(ws)
            ws.send(JSON.stringify({
                type:"join_room",
                roomId
            }))
        }
    },[])

   
    if(!socket){
        return <div>
            Connecting to server....
        </div>
    }
    return <div>
        <Canvas roomId={roomId} socket={socket}/>       
    </div>
    
}