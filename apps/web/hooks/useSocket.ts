import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading,setLoading]= useState(true);
    const [ socket, setSocket] = useState<WebSocket>()
     useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ODIwZTI5NC0wMTk0LTQzNGQtODczZi0zMDkzMDlkMzg5YWUiLCJpYXQiOjE3NDQyMDY1NTh9.
            zmKMsyNUfjh7EWPibZ_5V556dgvxA_slR3sIGOWrSuI`);
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws)
        }
     },[]);

     return {
        socket,
        loading 
     }


}