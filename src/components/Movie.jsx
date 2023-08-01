import React, { useCallback, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Movie = (props) => {
  const { item, saveMovie, dbMovies } = props;

  const [like, setLike] = useState(false);

  const findMovie = useCallback(() => {
    for (let i = 0; i < dbMovies.length; i++) {
      if (dbMovies[i].id === item?.id) {
        setLike(true);
        return;
      }
    }
    setLike(false);
  }, [dbMovies, item]);

  useEffect(() => {
    if (dbMovies) {
      findMovie(item);
    }
  }, [findMovie, item, dbMovies]);

  return (
    <div className="w-[210px] h-[118px] sm:h-auto md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative m-2">
      <img
        className="w-full h-[118px] sm:h-auto block rounded-md"
        src={
          item?.backdrop_path !== null
            ? `https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`
            : "../../images/couldnt_load.png"
        }
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 text-white text-center">
        <p className="whitespace-normal flex items-center justify-center h-full text-xs md:text-sm font-bold">
          {item?.title ? item?.title : item?.name}
        </p>
        <p
          onClick={() => {
            saveMovie(item);
          }}
          className="absolute top-4 left-4 text-gray-300"
        >
          {like ? <FaHeart color="red" size={18} /> : <FaRegHeart size={18} />}
        </p>
      </div>
    </div>
  );
};

export default Movie;
