import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const SavedMovies = () => {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft -= 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteMovie = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedMovies: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 shadow-lg rounded-full absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies
            ? movies.map((item) => (
                <div
                  key={item.id}
                  className="w-[210px] h-[118px] sm:h-auto md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative m-2"
                >
                  <img
                    className="w-full h-[118px] sm:h-auto block rounded-md"
                    src={
                      item?.backdrop_path !== null
                        ? `https://image.tmdb.org/t/p/w500/${item?.img}`
                        : "../../images/couldnt_load.png"
                    }
                    alt={item?.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 text-white text-center">
                    <p className="whitespace-normal flex items-center justify-center h-full text-xs md:text-sm font-bold">
                      {item?.title}
                    </p>
                    <p
                      onClick={() => deleteMovie(item.id)}
                      className="absolute top-3 right-4"
                    >
                      <IoMdClose size={22} />
                    </p>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 shadow-lg rounded-full absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
};

export default SavedMovies;
