"use client";

import { Method } from "@/utils/enum";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState("Method");
  const [url, setUrl] = useState("");
  const [backGround, setBackGround] = useState("bg-neutral-800");
  const [isload, setIsLoad] = useState(false);

  const sendRequest = async () => {
    try {
      if (method === "Method") {
        toast.info("Select Method first.");
        return;
      } else if (!url) {
        toast.info("Please fill url before send request.");
      } else {
        setIsLoad(true);
        const response = await axios({
          method,
          url,
        });
        console.log(response);
        setBackGround("bg-green-500");
        setIsLoad(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setBackGround("bg-red-500");
      setIsLoad(false);
    }
  };

  return (
    <div
      className={`${backGround} duration-300 w-full h-[100dvh] text-white flex justify-center items-center`}
    >
      <ToastContainer />
      <div className="w-1/3 border rounded-xl p-6 flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="inline-flex w-[7dvw] justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-neutral-700 duration-200 cursor-pointer"
              >
                {method.toUpperCase()}
                <svg
                  className={`-mr-1 size-5 text-gray-400 transition-transform duration-200 ${
                    open && "rotate-180"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`absolute z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition-all duration-200 transform ${
                open
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1 text-gray-700 text-sm w-full" role="none">
                <button
                  className="block px-4 py-2 text-left cursor-pointer w-full duration-200 hover:bg-gray-300"
                  role="menuitem"
                  onClick={() => {
                    setOpen(!open);
                    setMethod(Method.Get);
                  }}
                >
                  GET
                </button>
                <button
                  className="block px-4 py-2 text-left cursor-pointer w-full duration-200 hover:bg-gray-300"
                  role="menuitem"
                  onClick={() => {
                    setOpen(!open);
                    setMethod(Method.Post);
                  }}
                >
                  POST
                </button>
                <button
                  className="block px-4 py-2 text-left cursor-pointer w-full duration-200 hover:bg-gray-300"
                  role="menuitem"
                  onClick={() => {
                    setOpen(!open);
                    setMethod(Method.Put);
                  }}
                >
                  PUT
                </button>
                <button
                  className="block px-4 py-2 text-left cursor-pointer w-full duration-200 hover:bg-gray-300"
                  role="menuitem"
                  onClick={() => {
                    setOpen(!open);
                    setMethod(Method.Delete);
                  }}
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
          <button
            className="inline-flex cursor-pointer justify-center items-center gap-x-1.5 rounded-md w-20 bg-blue-500 px-3 py-2 hover:bg-blue-600  duration-200 text-sm text-white"
            type="button"
            onClick={async () => await sendRequest()}
          >
            {isload ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Send"
            )}
          </button>
        </div>
        <input
          type="text"
          className="bg-white rounded-md outline-none py-2 text-sm text-gray-700  px-2"
          placeholder="fill your endpoint"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
