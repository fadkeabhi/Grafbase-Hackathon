import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

type Props = {
  chats: any;
  setSelectedChatId: React.Dispatch<React.SetStateAction<string>>;
  selectedChatId: string;
};

const SideBar: FC<Props> = ({
  chats,
  setSelectedChatId,
  selectedChatId,
}: Props) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const AddNewChat = async () => {
    const res = await fetch("/api/createChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session,
        chatName: "chat",
      }),
    });
    setSelectedChatId(await res.json());
  };

  return (
    <div className="flex relative items-center justify-center">
      {open && (
        <div className="flex flex-col gap-2 sm:gap-4 items-center relative z-0 justify-center h-full">
          <div className="flex flex-col bg-[#213555] shadow-xl p-2 sm:p-3 sm:px-4 items-center justify-center h-[50%] rounded-r-xl overflow-hidden rounded-br-xl">
            <div className="flex gap-1 items-center justify-center flex-col scrollbar-hide overflow-y-auto overflow-x-hidden">
              {chats.map((chat: any, index: any) => (
                <button
                  className={`${
                    selectedChatId === chat.node.id ? "border rounded-md" : null
                  } sm:p-2`}
                  onClick={() => {
                    setSelectedChatId(chat.node.id);
                    router.push({
                      pathname: "/chat",
                      query: { id: chat.node.id },
                    });
                  }}
                  key={chat.node.id}
                >
                  <img className="sm:w-8 sm:h-8 w-5 h-5" src={"/images/chat1.svg"} alt="" />
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              AddNewChat();
              router.push({
                pathname: "/chat",
                query: {
                  id: selectedChatId,
                },
              });
            }}
          >
            <img
              className="sm:w-10 sm:h-10 w-8 h-8 animate-pulse"
              src={"/images/add.svg"}
              alt=""
            />
          </button>
        </div>
      )}
      <button onClick={()=>setOpen(!open)} className="absolute animate-pulse -right-10">
        {
          !open && <img className="w-8 h-8 sm:w-12 sm:h-12" src={'/images/right.svg'} alt="" />
        }
        {
          open && <img className="sm:w-12 sm:h-12 w-8 h-8" src={'/images/left.svg'} alt="" />
        }
      </button>
    </div>
  );
};

export default SideBar;
