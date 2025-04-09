'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const [roomId , setRoomId] = useState("");
  const router = useRouter();
  return (
   <div style={{
    alignItems:"center",
    height:"100vh",
    width:"100vw",
    justifyContent:"center",
    display:"flex"
   }}>
    <input style={{
      padding:10,
      margin:10
    }} value={roomId} onChange={(e)=>{
      setRoomId(e.target.value)
    }} type="text" placeholder="Room ID"></input>
    <button style={{
      padding:10,
      margin:10
    }} onClick={()=>{
      router.push(`/room/${roomId}`)
    }}>Join Room</button>
   </div>
  );
}
