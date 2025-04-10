'use client'

import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { WS_URL } from "@/config";
import Canvas from "./Canvas";

export function RoomCanvas({roomId}:{roomId:string}){
  
    const [socket,setSocket] =useState<WebSocket | null>(null);
    
    useEffect( () => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ODIwZTI5NC0wMTk0LTQzNGQtODczZi0zMDkzMDlkMzg5YWUiLCJpYXQiOjE3NDQyMDY1NTh9.zmKMsyNUfjh7EWPibZ_5V556dgvxA_slR3sIGOWrSuI`);
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