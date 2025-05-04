import React, { useEffect, useRef } from "react";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import Message from "./Message";
import MessagingInput from "./MessagingInput";
import { useMessageStore } from "@/store/useMessageStore";
import { useSocket } from "@/context/SocketContext";
import { useAuthStore } from "@/store/useAuthStore";

const MessageContainer = () => {
    const {getMessages,setMessageAsEmpty, setLastSeenMessages,setLastSeenConversationMessages, selectedConversation:selectedconversation,setConversations,isUserMessageLoading,setMessages,isUserMessageError,messages,isUserMessageSuccess,setMockConversations}=useMessageStore()
    const scrollRef=useRef(null);
    const {socket}=useSocket();
    const user=useAuthStore((state=>state.user))
const selectedConversationRef = useRef(selectedconversation);

useEffect(() => {
  selectedConversationRef.current = selectedconversation;
}, [selectedconversation]);


useEffect(()=>{
  const lastMessageFromOtherUser=messages.length && messages[messages.length-1].sender!==user._id;
  if(lastMessageFromOtherUser){
    const latestSelectedConversation=selectedConversationRef.current;
    socket?.emit("markMessageAsSeen",{
      conversationId:latestSelectedConversation._id,
      userId:latestSelectedConversation.userId,
    })
  }
  socket?.on("messageSeen",({conversationId})=>{
    if(conversationId === selectedConversationRef.current._id){
      setLastSeenMessages(conversationId);
      setLastSeenConversationMessages(conversationId);
    }
  })
},[socket,selectedConversationRef.current,user._id,messages])


useEffect(() => {
  if (!socket || !socket.connected) return;

  const handleReceiverConversation = ({ senderId, conversationId, senderName, senderProfilePic }) => {
    console.log(senderId, conversationId, senderName, senderProfilePic);
    console.log("i came here too");

    const mockUser = {
      mock: true,
      participants: [
        {
          _id: senderId,
          name: senderName,
          profilePic: senderProfilePic,
        },
      ],
      lastMessage: {
        sender: senderId,
        text: "",
      },
      _id: conversationId,
    };

    setMockConversations(mockUser);
  };

  socket.on("ReceiverConversation", handleReceiverConversation);

  return () => {
    socket.off("ReceiverConversation", handleReceiverConversation);
  };
}, [setMockConversations, socket]);


    useEffect(()=>{
      socket?.on('messageReceived',(message)=>{
        if(message.conversationId ===selectedConversationRef.current._id){
          setMessages(message);
        }
        setConversations(message);
    })
    return ()=>{
        socket?.off('messageReceived');
    }
    },[socket,setMessages,setConversations,selectedConversationRef.current._id])

    useEffect(()=>{
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    },[messages])

    useEffect(()=>{
      setMessageAsEmpty();
      if (selectedconversation?.mock) return;
      if (selectedconversation?.userId) {
        getMessages(selectedconversation?.userId);
      }
    },[getMessages,selectedconversation?.userId,selectedconversation?.mock])

  return (
    <div className="h-full w-full relative">
      <div className="flex items-center justify-start gap-3">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover "
            src={selectedconversation?.userprofilePic}
            alt="@shadcn"
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <span className="text-xl font-semibold">{selectedconversation?.userName}</span>{" "}
          <img className="w-6 h-6" src="./verified.png"></img>
        </div>
      </div>
      <Separator className="mt-2" orientation="horizontal" />
      <div className="w-full h-[400px] overflow-y-auto message-scroll pr-[8px] pb-[8px]">
        {isUserMessageLoading && (
            [...Array(7)].map((_,index)=>{
                return(
                <div key={index} className={`flex items-start w-full gap-3 p-1 pt-3 rounded-md ${index%2===0 ?'justify-start pr-2':
                'justify-end'}`}>
                    {index%2===0 && <Skeleton className='w-8 h-8 rounded-full shrink-0'/>}
                      <div className="flex flex-col gap-2  ">
                      <Skeleton className="h-[8px] w-[250px]" />
                    <Skeleton className="h-[8px] w-[250px]" />
                    <Skeleton className="h-[8px] w-[250px]" />
                    <Skeleton className="h-[8px] w-[250px]" />
                      </div>
                    {index%2!==0 && <Skeleton className="w-8 h-8 rounded-full shrink-0"/>}
                </div>
                ) 
            })
        )}
        { messages?.map((message,index)=>(<Message key={message._id} seen={message.seen} message={message.text} ownMessage={message.sender !== selectedconversation.userId}/>))}
        <div className="w-0 h-0" ref={scrollRef}></div>
        <MessagingInput/>
      </div>

    </div>
  );
};

export default MessageContainer;
