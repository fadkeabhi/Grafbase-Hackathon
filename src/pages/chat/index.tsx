import ChatBox from '@/components/ChatBox';
import ChatInput from '@/components/ChatInput';
import Dashboard from '@/components/Dashboard';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const ChatPage = () => {
  const [loader,setLoader] = useState(false); 
    const {query} = useRouter();
    const id = query.id;
  return (
    <Dashboard>
        <ChatBox loader={loader} chatId={id} />
        <ChatInput loader={loader} setLoader={setLoader} chatId={id} />
    </Dashboard>
  )
}

export default ChatPage;