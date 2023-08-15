import React, { FC, useEffect } from "react";
import Navbar from "./Navbar";
import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";
import { useSession } from "next-auth/react";

const Dashboard: FC = () => {
  const { data: session } = useSession();

  const setEmail = async () => {
    const res =  await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session,
      }),
    })
    console.log(await res.json())
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
    })
    console.log(await res.json());
  };


  useEffect(() => {
    setEmail();
    getData();
  }, []);
  return (
    <div className="flex bg-[#51557E] flex-col w-screen h-screen">
      <Navbar />
      <ChatBox />
      <ChatInput />
    </div>
  );
};

export default Dashboard;
