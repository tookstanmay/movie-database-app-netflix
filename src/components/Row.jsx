import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";

const Row = ({ title, fetchUrl, rowID }) => {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);
  const [dbMovies, setDBMovies] = useState([]);
  const [like, setLike] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    };
    getMovies();
  }, [fetchUrl]);

  const slideLeft = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft -= 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft += 500;
  };

  const toggleLike = () => {
    setLike(!like);
  };
  const movieID = doc(db, "users", `${user?.email}`);
  const saveMovie = async (item) => {
    if (user?.email) {
      if (like === true) {
        await updateDoc(movieID, {
          savedMovies: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
            saved: true,
          }),
        });
      } else {
        try {
          const result = dbMovies.filter(
            (itemMovie) => itemMovie.id !== item.id
          );
          await updateDoc(movieID, {
            savedMovies: result,
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("Login first, to save a show!");
    }
    toggleLike();
  };

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setDBMovies(doc.data()?.savedMovies);
    });
  }, [user?.email]);

  return (
    <>
      <h2 className="text-white font-bold md:text-xl px-4 pt-2">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 shadow-lg rounded-full absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => {
            return (
              <Movie
                key={id}
                item={item}
                saveMovie={saveMovie}
                like={like}
                dbMovies={dbMovies}
                toggleLike={toggleLike}
              />
            );
          })}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 shadow-lg rounded-full absolute opacity-50 hover:opacity-100 z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default Row;
