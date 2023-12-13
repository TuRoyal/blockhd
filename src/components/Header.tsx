import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {};


const Header = (props: Props) => {
  const menu = [
    { value: 1, label: "Products" },
    { value: 2, label: "Protocols" },
    { value: 3, label: "Tokens" },
    { value: 4, label: "Use Cases" },
  ];

  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<any>()
  const router = useRouter()

  const getPertra =async ()=>{
    try {
      let data =  await (window as any).aptos.account();
      return data
    } catch (error) {
      router.push("https://chromewebstore.google.com/detail/petra-aptos-wallet/ejjladinnckdgjemekebdpeokbikhfci")
    }
   
  }

  const getUserInfo = async ()=>{
    try {
       let data =  await axios.get('/api/auth/user')
       setUserInfo(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    if(session?.user?.email){
      getUserInfo()
    }
  },[session])

  const handleConnect = async () => {
    if (window) {
      const isPetraInstalled = (window as any).aptos;
      if (isPetraInstalled) {
        let data =  await getPertra();
        await axios.patch('/api/auth/user', { address: data.address })
        getUserInfo()
      } else {
        window.open("https://petra.app/", `_blank`);
      }
    }
  };
  return (
    <div className="grid grid-cols-12 items-center px-[36px]">
      <div className="col-span-4">
        <img className="w-[260px]" src="./snapedit_1702395005543.png" alt="" />
      </div>

      <div className="bg-[#F7BDCC] col-span-8 rounded-[12px] pl-[32px] pr-[14px] py-[8px]">
        <div className="flex items-center text-[#596F78] font-bold text-[14px] justify-between">
          {menu.map((value: any) => {
            return <div key={value.label}>{value.label}</div>;
          })}
          <button
            onClick={handleConnect}
            className="flex items-center justify-center shadow1 rounded-[32px] bg-white px-[34px] py-[5px] text-[#17344F] text-[16px]"
          >
            {userInfo?.address ? <div className="flex items-center  max-w-[200px] whitespace-nowrap overflow-hidden overflow-ellipsis">
              <img className="w-[27px] mr-1" src="./Ellipse.png" alt="" /> {userInfo.address}
            </div> : <div className="flex items-center justify-center">
            Connect Wallet{" "}
            <img className="w-[15px] ml-1" src="./btnicon.png" alt="" />

              </div>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
