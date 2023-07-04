import React, { useContext, useRef, useState } from "react";
import tempImage from "../../assets/temperature.svg";
import happyImage from "../../assets/happy.svg";
import InputForm from "./InputForm";
import { AuthContext } from "../Stack";

function Form({ children, signInHandler, registerSetter }) {
  //Para ver si se desloguea al usar signOff. Ver boton Register. Ln 66
  // const [currentUser, authState] = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const myBtn = useRef(null);

  function kbBtnClick(event) {
    if (event.keyCode === 13) {
      myBtn.current.click();
    }
  }

  return (
    <div className="relative bg-gray-800 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 mx-auto sm:max-w-lg sm:rounded-lg rounded-md sm:px-10">
      <div className="flex justify-center mb-2">
        <h1 className="text-3xl sm:text-5xl font-semibold text-gray-50">
          Comfort++
        </h1>
        <img className="w-10 ml-2" src={tempImage} alt="" />
        <img className="w-10 ml-2" src={happyImage} alt="" />
      </div>
      <div className="flex justify-center text-center">
        <h1 className="font-medium text-lg text-gray-100 mt-4">
          Welcome Back! Please enter your details to get comfort
        </h1>
      </div>
      <InputForm
        label="Username or email:"
        type="text"
        placeholder="Enter username or email"
        kbAction={kbBtnClick}
        valueSetter={setUserName}
      />
      <InputForm
        label="Password:"
        type="password"
        placeholder="Enter your password"
        kbAction={kbBtnClick}
        valueSetter={setPassword}
      />
      <div className="mt-8 flex flex-col gap-y-4">
        <button
          disabled={userName && password ? false : true}
          ref={myBtn}
          className={
            "py-3 rounded-xl text-lg font-bold " +
            (userName && password
              ? "bg-emerald-400 active:scale-[.97] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
              : "bg-emerald-200")
          }
          onClick={(event) => {
            event.preventDefault();
            signInHandler(userName, password);
          }}
        >
          Sign In
        </button>
        {/* <button
          className=" py-3 rounded-xl bg-emerald-400 text-lg font-bold active:scale-[.97] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
          onClick={() => registerSetter(true)}
        >
          Register
        </button> */}
      </div>
      {children}
    </div>
  );
}

export default Form;
