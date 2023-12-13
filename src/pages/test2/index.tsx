import LayoutComponent from "@/components/LayoutComponent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};

const Test2 = (props: Props) => {
  const content = [
    {
      value: 1,
      label:
        "Nút ‘connect wallet': connect with Petra wallet (ví trên blockchain network Aptos)",
    },
    { value: 2, label: "Nút ‘Log in’: allow users to log in using Google" },
    {
      value: 3,
      label:
        "Nút ‘Launch App':  once users log in, send them to the #test2 page (this page). if users haven't logged in, don't let them see the second page",
    },
    {
      value: 4,
      label:
        "Photoshop phần white part out ‘testX’ logo và dùng chữ test X => cho phần ‘Explore and Earn on testX’ ",
    },
    { value: 5, label: "The next step is to deploy your work on vercel. " },
    { value: 6, label: "Block access for IP from Japan." },
    {
      value: 7,
      label:
        "Share the vercel link along with your code (github link to the repo).",
    },
  ];

  const { data: session, status } = useSession();
  const [checking, setChecking] = useState(false)
  const router  = useRouter()
  useEffect(()=>{
    console.log(status);
    if(status === "unauthenticated"){
      router.push("/")
    }else{
      if(status !== "loading" && session?.user?.email){
        setChecking(true)
      }
    }
   
  },[session])

  if(!checking){
    return null
  }
  
  return (
    <LayoutComponent>
      <div className="w-full bgGradient h-screen text-white text-[28px] font-bold flex items-start pt-[176px] justify-center  px-[130px]">
        <div>
          <ul className="list-decimal w-[945px]">
            {content.map((value: any) => {
              return <li key={value.value}>{value.label}</li>;
            })}
          </ul>
          <h1 className="mt-[80px] -translate-x-8">
            CONGRATS ON PASSING THE CODING INTERVIEW!
          </h1>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Test2;
