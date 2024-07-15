"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Dashboard from "@/components/Dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Dashboard>
        <div className="flex items-center flex-col text-white text-center tracking-[5px] font-semibold justify-center w-full h-full">
        <Image
              src={
                "/images/robot.gif"
              }
              width={600}
              height={600}
              alt=""
            />
          <h1 className="text-base sm:text-lg">
            SELECT CHAT OR CREATE NEW CHAT
          </h1>
        </div>
      </Dashboard>
    );
  }
  return (
    <>
      <div className="flex flex-col h-screen w-screen bg-[#726A95] items-center justify-center">
        <h1 className="p-5 tracking-[5px] uppercase font-semibold text-lg animate-pulse">
          Sign-In Now
        </h1>
        <button
          className="flex gap-5 bg-[#351F39] items-center justify-center p-2 ring-[#A0C1B8] px-5 text-white hover:ring-2 shadow-sm rounded-md"
          onClick={() => signIn()}
        >
          <Image src={"/images/google.png"} alt="" width={20} height={20} />
          Sign In
        </button>
      </div>
    </>
  );
}
