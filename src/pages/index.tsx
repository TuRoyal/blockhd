import LayoutComponent from "@/components/LayoutComponent";
import NotificationCpn, { TypeNotification } from "@/components/Notification";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [notification, setnotification] = useState({ type: "", mess: "" });
  const [show,setShow] = useState(false)
  const footerlist = [
    { value: "$1.80B", label: "30 Day Volume" },
    { value: "$0.84B", label: "Managed on testX.fi" },
    { value: "$21.43M", label: "Total Collateral Automated" },
  ];
  const { data: session, status } = useSession();
  const router = useRouter();


  const handleLogin = () => {
    if (session?.user?.email) {
      router.push("/");
    } else {
      signIn("google", {
        redirect: true,
        callbackUrl: router.query.callbackUrl?.toString() || "/",
      });
    }
  };

  const handleLaunch =()=>{
    if(session?.user?.email){
      router.push("/test2")
    }else{
      setShow(true)
      setnotification({ type: TypeNotification.ERROR, mess: "Bạn chưa đăng nhập" })
    }
  }

  const handlelogout = async ()=>{
    await signOut({ callbackUrl: "/" });
  }

  return (
    <LayoutComponent>
      <div className="bgGradient relative pt-[80px] w-full grid grid-cols-2 px-[36px] h-screen ">
        {show  ?  <NotificationCpn notification={notification} setnotification={setnotification}/> : null}
        
        <div className="col-span-1">
          <h1 className="text-[69px] mb-[14px] text-white w-[585px] relative  leading-[80px] tracking-[1.52px]">
            Explore and Earn on{" "}
            <img
              className="w-[135px] absolute top-[100px] left-[100px]"
              src="./snapedit_1702395005543.png"
              alt=""
            />{" "}
          </h1>
          <div className="w-[423px]">
            <div className="relative mb-[22px]">
              <input
                type="text"
                className="bg-[#F2F5FA] rounded-[32px] focus:outline-none border-none w-full  px-4 py-[8px]"
              />
              <button className="text-[#17344F] top-1 left-[316px] absolute rounded-[32px] px-[24px] py-[4px] text-[16px] bg-[#F5B4BB] shadow1">
                Sign up
              </button>
            </div>
            <div className="flex items-center justify-between">
              {status === "unauthenticated" ?    <button
                onClick={handleLogin}
                className="text-[18px] font-bold bg-[#7BB8F1] rounded-[32px] w-[174px] py-[8px] text-white"
              >
                Log in
              </button> :   <button
                onClick={handlelogout}
                className="text-[18px] font-bold bg-[#7BB8F1] rounded-[32px] w-[174px] py-[8px] text-white"
              >
                Log out
              </button>}
            
              <button onClick={handleLaunch} className="text-[18px] font-bold bg-white shadow1 rounded-[32px] w-[204px] py-[8px] text-[#17344F]">
                Launch App
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-start justify-end pr-[46px]">
          <div className="flex items-center justify-center shadow2 bg-white rounded-[20px] w-fit px-[60px] py-[32px] flex-col">
            <img
              className="w-[104px]"
              src="./snapedit_1702395005543.png"
              alt=""
            />
            <p className="text-[#8795AF] text-[12px]">
              test Front end interview 1
            </p>
          </div>
        </div>
        <div className="bggr rounded-[20px] col-span-2 h-[190px] flex items-center justify-between px-[107px] border border-white">
          {footerlist.map((value: any) => {
            return (
              <div key={value.label} className="flex items-center flex-col">
                <h1 className="text-[#17344F] text-[50px]">{value.value}</h1>
                <p className="text-[#596F78] text-[16px] mt-[14px]">
                  {value.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </LayoutComponent>
  );
}
