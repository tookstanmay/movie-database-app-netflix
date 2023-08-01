import React, { useState } from "react";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { RxCrossCircled } from "react-icons/rx";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Signup = () => {
  const auth = getAuth();
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
    } catch (loginErr) {
      if (loginErr.code === "auth/user-not-found") {
        try {
          createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              setDoc(doc(db, "users", email), {
                savedMovies: [],
              }).then(() => {
                signInWithEmailAndPassword(auth, email, password)
                  .then(() => {
                    navigate("/");
                  })
                  .catch((error) => {
                    setErr(error.code);
                  });
              });
            })
            .catch((error) => {
              setErr(error.code);
            });
        } catch (signupErr) {
          setErr(signupErr.code);
          navigate("/signup");
        }
      } else {
        setErr(loginErr.code);
        setTimeout(() => {
          setErr("");
        }, 1500);
      }
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
            Sign up to Netflix, and access unlimited binge.
          </h1>
          <p className="text-lg md:text-xl lg:text-xl px-5">
            Ready to watch? Enter your email to create your membership.
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
                Get Started
              </button>
              <div className="flex items-center justify-between w-full">
                <p>
                  {" "}
                  <input type="checkbox" name="rememberMe" id="" /> Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="w-full mt-10 text-gray-300">
                Already Subscribed?{" "}
                <span className="ml-10 text-white font-bold underline">
                  <Link to="/login">Sign in</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
