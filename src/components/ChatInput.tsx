"use client";
import { useSession } from "next-auth/react";
import React, { FC, FormEvent, useState } from "react";

type Props = { 
  chatId: string | string [] | undefined;
  setLoader:React.Dispatch<React.SetStateAction<boolean>>;
  loader:boolean;
}

const ChatInput: FC<Props> = ({chatId,setLoader,loader}:Props) => {
  const [text, setText] = useState<string>("");
  const { data: session } = useSession();


  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    // const message : 
    
    await fetch("/api/AskQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session,
        text,
        chatId
      }),
    })
      .then((res) => {
        setText("");
      })
      .catch((err) => console.log(err));
      setLoader(false);
  };

  return (
    <div className="flex items-center justify-center p-10 2xl:px-20  sm:pr-2">
      {
        !loader && (
          <form
            onSubmit={(e) => submitHandler(e)}
            className="bg-[#213555] flex w-full sm:w-[60%] mb-5 sm:mb-10 drop-shadow-lg items-center justify-center rounded-lg"
          >
            <input
              className="w-full sm:p-2 text-white sm:px-3 bg-[#213555] outline-none rounded-lg"
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
            />
            <button type="submit" className="p-2">
              <img className="w-8 h-8 -rotate-45" src={"/images/send.svg"} alt="" />
            </button>
          </form>
        )
      }
      {
        loader && (
          <div className="flex items-center text-[#F5EFE7] drop-shadow-lg p-5 rounded-xl mb-5 sm:mb-10 bg-[#213555] justify-center animate-pulse text-xs ring-1 ring-[#F5EFE7] sm:text-lg font-bold tracking-[4px]">
            <h1>CHATGPT is thinking...</h1>
            <img className="w-10 h-10" src={'/images/sun.svg'} alt="" />
          </div>
        )
      }
    </div>
  );
};

export default ChatInput;
