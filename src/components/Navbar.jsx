import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { log, success, error } from "../utils/logs";
import Grid from "./Grid";
import axios from "axios";

const Navbar = () => {
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, toggleAuth, user } = useContext(AuthContext);
  const logoutUser = (e) => {
    e.preventDefault();
    toggleAuth(null);
    localStorage.removeItem("user");
    navigate("/");
  };
  const goToLogin = (e) => {
    e.preventDefault();
    navigate("login");
  };

  const searched = useInput("searched");
  console.log(searched);

  const handleSubmit = async (e) => {
    e.preventDefault();
    log("search attempt...");
    try {
      const results = await axios.get(
        "https://api.themoviedb.org/3/search/multi",
        {
          params: {
            api_key: "fbd5e795f2c301d012b62e7b9f1fdde7",
            query: searched.value,
          },
        }
      );
      setSearch(results.data.results);
      success(`results available`);
       navigate("/movies");
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      <nav className="navbar has-background-link-dark mb-4">
        <div className="navbar-item navbar-brand">
          <a href="http://localhost:3000/" className="button is-link">
            <h3 className="navbar-item has-text-white">TMDB</h3>
          </a>
        </div>
        <div className="navbar-item navbar-end">
          <Link to="movies">
            <button className="button is-ghost has-text-white">Movies</button>
          </Link>
          <Link to="tvShows">
            <button className="button is-ghost has-text-white">TV Shows</button>
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
              <div className="control">
                <input
                  {...searched}
                  className="input"
                  type="text"
                  placeholder={`Find movies and TV shows`}></input>
              </div>
              <div className="control">
                <button className="button is-link">Search</button>
              </div>
            </div>
          </form>
        </div>
        <div className="navbar-item navbar-end">
          <button
            onClick={(e) => (!isAuthenticated ? goToLogin(e) : logoutUser(e))}
            className="button is-link">
            <h3>{isAuthenticated ? "Log out" : "Log in"}</h3>
          </button>
        </div>
      </nav>
       {search[0]? <Grid movies={search} />: <div></div>}
    </div>
  );
};

export default Navbar;
