import { useAuthStore } from '@/store/useAuthStore';
import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socketContext=createContext();


export const SocketContextProvider=({children})=>{
    // const socket=io('http://localhost:3000')
    const user=useAuthStore((state)=>state.user);
    const [socket,setSocket]=useState(null);
    useEffect(()=>{
        const newSocket=io('http://localhost:4000',{
            query:{
                userId:user?._id
            }
        })
        setSocket(newSocket)
        return () => newSocket && newSocket.close();
    },[user?._id])


    return (
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )

}

export const useSocket=()=>{
    return useContext(socketContext);
}

export default socketContext;