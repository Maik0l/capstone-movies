import { createContext, useContext, useEffect, useState } from "react";
import api from "../../Services/api";
import { ReactNode } from "react";
import { useAuth } from "../Auth";

import jwtDecode, { JwtPayload } from "jwt-decode";

import axios from "axios";
interface IMovies {
  children: ReactNode;
}
interface IMoviesList {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  review?: string[];
}

interface IMoviesContext {
  getMovies: (page: number) => void;
  setMovies: any;
  searchMovies: (searchText: string) => void;
  movies: IMoviesList[];
  searchedMovies: IMoviesList[];
  getSpecificMovie: (specifcMovie: IMoviesList) => void;
  aboutMovie: IMoviesList;
  AddToFavorites: (data: IMoviesList) => void;
}

const MoviesContext = createContext({} as IMoviesContext);
export const MoviesProvider = ({ children }: IMovies) => {
  const TMDBapi =
    "https://api.themoviedb.org/3/search/movie?api_key=4b5de5fed14a8cc95ec876f973db1f9c&query=";
  const token = JSON.parse(localStorage.getItem("@movies: token") || "null");
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [aboutMovie, setAboutMovie] = useState({});
  // const decode = jwtDecode<JwtPayload>(token);
  // console.log(decode.sub);
  const getMovies = (page: number) => {
    api
      .get(`movies?page=${page}`)
      .then((response) => {
        console.log(response.data[0].results);
        setMovies(response.data[0].results);
      })
      .catch((err) => console.log("Grupos não podem ser carregados"));
  };
  const getSpecificMovie = (specifcMovie: IMoviesList) => {
    setAboutMovie(specifcMovie);
  };
  const AddToFavorites = (data: IMoviesList) => {
    const Addedmovie = {
      userId: Number(1),
      ...data
    };

    api
      .post("favorites", Addedmovie)
      .then((_) => console.log("filme adicionado"));
  };
  const searchMovies = (searchText: string) => {
    axios
      .get(TMDBapi + searchText)

      .then((response) => {
        setSearchedMovies(response.data.results);
      })
      .catch((err) => console.log("Grupo não podem ser carregados"));
  };

  return (
    <MoviesContext.Provider
      value={{
        searchMovies,
        getMovies,
        movies,
        setMovies,
        searchedMovies,
        getSpecificMovie,
        aboutMovie,
        AddToFavorites,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
export const useMovies = () => useContext(MoviesContext);
