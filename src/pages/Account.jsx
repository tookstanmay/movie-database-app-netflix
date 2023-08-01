import React from "react";
import SavedMovies from "../components/SavedMovies";

const Account = () => {
  return (
    <div className="w-full">
      <img
        className="absolute top-0 left-0 object-cover w-full h-[500px] z-[-1]"
        src="https://wallpapercave.com/wp/wp11523756.jpg"
        alt="/"
      />
      <div className="absolute w-full h-[500px] bg-black/100 opacity-30 z-[0]"></div>
      <div className="pt-56">
        <div
          className="text-white font-extrabold text-4xl md:5xl w-full my-32 px-5"
          style={{ fontFamily: "Overpass" }}
        >
          My Watchlist.
        </div>
        <div className="w-full">
          <SavedMovies />
        </div>
      </div>
    </div>
  );
};

export default Account;
