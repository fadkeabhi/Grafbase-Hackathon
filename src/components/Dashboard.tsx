import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import SideBar from "./SideBar";

const Dashboard = ({children}:{children: React.ReactNode}) => {
  const { data: session } = useSession();
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState("");
  
  
  const setEmail = async () => {
    const res = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session,
      }),
    });
    console.log(await res.json());
  };

  const getData = async () => {
    const res = await fetch("/api/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session,
      }),
    });
    const data = await res.json();
    if(data.data.user.chats.edges.length > 0){
      setChats(data.data.user.chats.edges);
    }
  };

  useEffect(() => {
    setEmail();
    getData();
  }, [selectedChatId]);

  return (
    <div className="flex bg-[#4F709C] flex-col w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 w-full h-full">
        <SideBar chats={chats} selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId} />
        <div className="flex flex-1 flex-col px-2 2xl:px-40 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
