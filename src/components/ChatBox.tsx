"use client";
import React, { FC, useEffect, useState } from "react";
import TimeAgo from 'react-timeago'

type Props = {
  chatId: string | string [] | undefined;
  loader:boolean;
};

const ChatBox: FC<Props> = ({ chatId,loader }: Props) => {
  const [conversation,setConversation] = useState<any>([]); 
 

  const getData = async() => {
    const res = await fetch("/api/getConversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId
      }),
    });
    const result = await res.json();
    setConversation(result.chat.conversations.edges);
  }

  useEffect(()=>{
    getData()
  },[chatId,loader]);

  return (
    <div className="flex-1 flex flex-col h-full p-2 px-5 sm:p-4 overflow-x-hidden items-start justify-start scrollbar-hide overflow-y-auto">
      {
        conversation.map((con:any,index:any)=>(
          <div className="flex flex-col w-full" key={con.node.id}>
            <div className="flex flex-col items-start justify-start gap-1">
              <h1 className="bg-[#D8C4B6] font-semibold text-sm sm:text-base shadow-xl rounded-2xl drop-shadow-md p-1 px-3">{con.node.request}</h1>
              <TimeAgo date={con.node.createdAt} className="text-xs pl-1" />
            </div>
            <div className="flex items-end justify-end">
              <h1 className="bg-[#F5EFE7] text-sm sm:text-base max-w-[200px] sm:max-w-[400px] p-2 px-3 rounded-xl font-semibold drop-shadow-md shadow-xl">{con.node.response}</h1>
            </div>
          </div>
        ))
      }
      {
        conversation.length === 0 && (
          <div className="flex flex-col text-white font-semibold tracking-[4px] gap-3 text-lg items-center justify-center w-full h-full">
            <h1>TYPE HERE</h1>
            <img src={"/images/down.svg"} alt="" className="w-9 h-9 animate-bounce" />
          </div>
        )
      }
    </div>
  );
};

export default ChatBox;
