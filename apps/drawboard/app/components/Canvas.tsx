// import { useEffect, useRef } from "react"
// import { initDraw } from "../draw";

// export default function Canvas({roomId, socket}:{
//     roomId :string,
//     socket: WebSocket
// }){
//       const canvasRef = useRef<HTMLCanvasElement>(null);
//     useEffect(()=>{
//         if(canvasRef.current){
//             initDraw(canvasRef.current,roomId,socket)
//         }
//     },[canvasRef])


//     return <div>
//         <canvas ref={canvasRef} width={2000} height={2000}></canvas>
//     </div>
// }


import { useEffect, useRef } from "react";
import { initDraw } from "../draw";

export default function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas=()=>{

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Call your drawing initializer
      initDraw(canvas, roomId, socket);
    }
    resizeCanvas()
    window.addEventListener("resize",resizeCanvas);

    return ()=>{
      window.removeEventListener("resize",resizeCanvas)
    }
    // Optional: clean up if initDraw has side effects
  }, [ roomId, socket]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block',width:"100vw",height:"100vh" }}
    />
  );
}

