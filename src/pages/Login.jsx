import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { RxCrossCircled } from "react-icons/rx";

const Login = () => {
  const { login } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setErr(error.code);
      setTimeout(() => {
        setErr("");
      }, 1500);
    }
  };
  return (
    <>
      <div className="w-full h-[850px]">
        <div className="absolute w-full h-[850px] bg-gradient-to-b from-black from-0%% to-transparent to-80% z-[-1]"></div>
        <div className="absolute w-full h-[850px] bg-gradient-to-r from-black/60 from-0% to-transparent to-60% z-[-1]"></div>
        <div className="absolute w-full h-[850px] bg-gradient-to-l from-black/60 from-0% to-transparent to-60% z-[-1]"></div>
        <img
          className="absolute z-[-2] w-full h-[850px] object-cover"
          src="https://thefatork.store/cdn/shop/articles/netflix.jpg?v=1669877376"
          alt="/"
        />
        <div
          className="text-white px-5 w-full pt-36 md:pt-48 lg:pt-80 text-center space-y-4"
          style={{ fontFamily: "Overpass" }}
        >
          <h1
            className="text-3xl md:text-4xl lg:text-5xl"
            style={{
              fontWeight: "800",
            }}
          >
            Login to your account, happy watching :{")"}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl">
            Watch anytime, anywhere.
          </p>
          <p className="text-lg md:text-xl lg:text-xl px-5">
            Ready to watch? Enter your email and login.
          </p>
          <div className="w-full flex justify-center items-center">
            {err ? (
              <p className="text-red-500 flex justify-center items-center bg-white py-1 w-[300px] rounded-md text-md font-bold">
                <RxCrossCircled className="text-lg mr-2" /> {err}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="text-white flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center max-w-[450px]"
            >
              <input
                className="p-3 w-[300px] my-2 outline-none focus:outline-2 focus:outline-white bg-neutral-900 opacity-75 rounded border border-gray-500"
                type="email"
                placeholder="Email address"
                autoComplete="off"
                autoCorrect="false"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="p-3 w-[300px] my-2 outline-none hover:outline-2 focus:outline-white bg-neutral-900 opacity-75 rounded border border-gray-500"
                type="password"
                placeholder="Password"
                autoComplete="off"
                autoCorrect="false"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-red-600 my-6 p-3 pt-4 rounded-md font-bold w-full">
                Log in
              </button>
              <div className="flex items-center justify-between w-full">
                <p>
                  {" "}
                  <input type="checkbox" name="rememberMe" id="" /> Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="w-full mt-10 text-gray-300">
                New to Netflix?{" "}
                <span className="ml-10 text-white font-bold underline">
                  <Link to="/signup">Sign up</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
