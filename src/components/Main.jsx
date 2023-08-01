import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../Requests";
import { IoMdPlay } from "react-icons/io";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { VscAdd } from "react-icons/vsc";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const Main = () => {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(requests.requestPopular);
      setMovies(response.data.results);
    };
    getData();
  }, []);

  const movieID = doc(db, "users", `${user?.email}`);

  const saveMovie = async () => {
    if (user?.email) {
      await updateDoc(movieID, {
        savedMovies: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
          saved: true,
        }),
      });
    } else {
      alert("Login first, to save a show!");
    }
  };

  return (
    <div className="w-full h-[600px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[600px] bg-gradient-to-r from-black/80 from-0% to-transparent to-100%"></div>
        <div className="absolute w-full h-[600px] bg-gradient-to-b from-black from-0% to-transparent to-30%"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title ? movie?.title : movie?.name}
        />
        <div className="absolute w-full top-[45%] md:top-[30%] p-4 md:p-8 flex items-center md:items-start justify-center flex-col">
          <h1
            className="text-4xl md:text-5xl my-2"
            style={{
              fontFamily: "Staatliches",
              textShadow: "2px 2px 2px 2px black",
            }}
          >
            {movie?.title}
          </h1>
          <div
            className={`my-2 text-amber-300 flex items-center justify-center`}
            style={{ fontFamily: "Anton" }}
          >
            {movie?.vote_average} IMDb
          </div>
          <p className="hidden md:block md:w-[70%] lg:w-[50%] py-3 text-sm">
            {movie?.overview}
          </p>
          <div className="my-3 flex w-full ml-[-20px] md:ml-[-10px] flex-row-reverse md:flex-row items-center justify-center md:justify-start">
            {/* info button */}
            <button className="mx-2 md:hidden px-5 flex flex-col items-center text-lg">
              <AiOutlineInfoCircle />
              <span className="md:ml-1 text-xs">info</span>
            </button>
            {/* Play button */}
            <button className="mx-2 border bg-gray-300 text-black border-gray-300 py-2 md:py-1 px-5 rounded-md flex items-center justify-center">
              <IoMdPlay />
              <span className="pl-1">Play</span>
            </button>
            {/* Add button */}
            <button
              onClick={saveMovie}
              className="mx-2 px-5 flex flex-col items-center text-lg md:border md:bg-neutral-700 md:text-gray-300 border-neutral-700 md:py-2 md:rounded-md md:ml-3 md:flex-row"
            >
              <VscAdd />
              <span className="md:ml-1 text-xs">My List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
