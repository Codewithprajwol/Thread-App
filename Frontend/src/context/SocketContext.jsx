import { useAuthStore } from '@/store/useAuthStore';
import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socketContext=createContext();


export const SocketContextProvider=({children})=>{
    // const socket=io('http://localhost:3000')
    const user=useAuthStore((state)=>state.user);
    const [socket,setSocket]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    useEffect(()=>{
        if(!user?._id) return;
        const socket=io('http://localhost:4000',{
            query:{
                userId:user?._id
            }
        })
        setSocket(socket)

        socket.on('connect',()=>{
            
            socket.on('userOnlineStatus',(userIds)=>{
                setOnlineUsers(userIds);
            })
        })
        return () => socket && socket.close();
    },[user?._id])


    return (
        <socketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </socketContext.Provider>
    )

}

export const useSocket=()=>{
    return useContext(socketContext);
}
