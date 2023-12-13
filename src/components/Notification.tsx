import React, { useEffect } from "react";

type Props = {};
export enum TypeNotification {
    ERROR = "error",
    SUCCESS = "success",
  }
const NotificationCpn = ({notification , setnotification}: any) => {

    useEffect(() => {
        let time = 3;
        if (notification.type) {
          const timeRunning = setInterval(function () {
            time -= 1;
            if (time === 0) {
              setnotification({ type: "", mess: "" });
              clearInterval(timeRunning);
            }
            return time;
          }, 1000);
        }
      }, [notification]);
  return (
    <div
      className={`w-[200px] h-[36px] flex  items-center justify-center duration-300 text-white font-medium bg-black z-[999999999] ${
        notification.type !== "" ? "opacity-100" : "opacity-0"
      } absolute right-0 -top-[110px]  rounded-lg shadow-lg ${
        notification.type === TypeNotification.SUCCESS
          ? "bg-green-400"
          : "bg-red-400"
      }`}
    >
      {notification.mess}
    </div>
  );
};

export default NotificationCpn;
