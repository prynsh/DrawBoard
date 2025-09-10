import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1M2UxZDE3ZC0wZDMzLTRlZWItYWQ1Zi02OTYwMGFiYjVjZDAiLCJpYXQiOjE3NTc0MjYyNTN9.RyNoyGipemFjroVX9Pu-1sbgywkR_jcLP8ECE5sBOQE`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}