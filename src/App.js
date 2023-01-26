import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Grid from "./components/Grid";
import Content from "./components/Content"
import { Route, Routes } from "react-router";
import { useEffect, useState, useContext } from "react";
import getMovies from "./utils/getMovies";
import getTVShows from "./utils/getTVShows";
import Register from "./components/Register";
import Login from "./components/Login";
import AuthContextProvider from "./contexts/AuthContext";
import SearchContextProvider, { SearchContext } from "./contexts/SearchContext";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    getMovies().then((movies) =>
      setMovies(movies));
  }, []);

  useEffect(() => {
    getTVShows().then((tvShows) => {setTVShows(tvShows)
    });
  }, []);

  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <div>
          <Navbar />
          <div className="container is-fluid columns">
            <Sidebar />
            <Routes>
              <Route path="/" element={<p>Welcome to TMDB!</p>} />
              <Route path="/secret" element={<p>Hope you enjoy the site!</p>} />
              <Route
                path=":type"
                element={
                  <Grid movies={movies} tvShows={tvShows} search={search}/>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="single/:type/:id" element={<Content />} />
            </Routes>
          </div>
        </div>
      </SearchContextProvider>
    </AuthContextProvider>
  );
};

export default App;
