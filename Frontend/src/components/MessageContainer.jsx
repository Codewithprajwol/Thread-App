import React from "react";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import Message from "./Message";
import MessagingInput from "./MessagingInput";

const MessageContainer = () => {
  return (
    <div className="h-full w-full relative ">
      <div className="flex items-center justify-start gap-3">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img
            className="w-full h-full "
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
        </div>
        <div className="flex gap-2 items-center justify-center">
          <span className="text-xl font-semibold">Prajwol</span>{" "}
          <img className="w-6 h-6" src="./verified.png"></img>
        </div>
      </div>
      <Separator className="mt-2" orientation="horizontal" />
      <div className="w-full h-[400px] overflow-y-auto message-scroll pr-[8px]">
        {false && (
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
        <Message />
        <Message />
        <MessagingInput/>
      </div>
    </div>
  );
};

export default MessageContainer;
