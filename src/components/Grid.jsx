import { useLocation } from "react-router";
import Card from "../commons/Card.jsx";
// import { Link } from "react-router-dom";

const Grid = ({ movies, tvShows, search }) => {
  const URL = useLocation().pathname.slice(1);
  let arr = [];
  if (URL === "movies") {
    movies.map((movie) => arr.push(movie));
  }
  if (URL === "tvShows") {
    tvShows.map((tvShow) => arr.push(tvShow));
  }

  return (
    <div>
      <div className="columns is-multiline layout">
        {arr.map((prop, i) => (
          <div className="column is-4" key={i}>
            {/* <Link to={`/single/${type}/${data.id}`}> */}
              <Card prop={prop} />
            {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
