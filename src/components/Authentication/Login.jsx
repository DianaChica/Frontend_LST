import React from "react";
import chillManBg from "../../assets/young-man-sitting-nobg.png";

function Login() {

  return (
    <>
      <div className="flex flex-col w-full h-screen justify-center bg-gray-700 px-8">
        <img
          className="absolute top-1/2 left-1/2 sm:max-w-none max-h-full -translate-x-1/2 -translate-y-1/2 blur-sm"
          src={chillManBg}
          alt=""
        />
        <div>
          Welcome to Comfort++
        </div>
      </div>
    </>
  );
}

export default Login;
