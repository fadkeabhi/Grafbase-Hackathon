"use client";
import { useSession } from "next-auth/react";
import React, { FC, FormEvent, useState } from "react";

const ChatInput: FC = () => {
  const [text, setText] = useState<string>("");
  const { data: session } = useSession();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    await fetch("/api/AskQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session,
        text,
      }),
    })
      .then((res) => {
        console.log(res)
        setText("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex p-10 2xl:px-20 pr-2">
      <form
        onSubmit={(e) => submitHandler(e)}
        className="bg-[#dad9ab] flex w-full items-center justify-center rounded-lg"
      >
        <input
          className="w-full p-2 bg-[#dad9ab] shadow-lg outline-none rounded-lg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
        />
        <button type="submit" className="p-1">
          <img className="w-8 h-8 -rotate-45" src={"/images/send.svg"} alt="" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
