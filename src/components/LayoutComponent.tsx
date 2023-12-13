import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

const LayoutComponent = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const checkingIP = async () => {
    let data: any = await axios.get("https://geolocation-db.com/json/");
    if (data?.data.country_code === "JP") {
      return router.push("/block/blocked");
    }else{
      setLoading(false)
    }
  };
  useEffect(() => {
    checkingIP();
  }, []);
  console.log(loading);
  return (
    <div>
      {loading ? (
        null
      ) : (
        <>
          <Header />
          {children}
        </>
      )}
    </div>
  );
};

export default LayoutComponent;
