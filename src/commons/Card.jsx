import { Link } from "react-router-dom";

const Card = ({ prop }) => {
  let name;
  if (prop.name) {
    name = prop.name;
  } else {
    name = prop.title;
  }

  return (
    <div className="card">
      <Link to={prop.name?`/single/tv/${prop.id}`:`/single/movie/${prop.id}`}>
        <div className="card-image">
          <figure className="image">
            <img
              src={`https://image.tmdb.org/t/p/w500/${prop.poster_path}`}
              alt="Poster"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <div className="media-content">
                <p className="title is-6">{name.slice(0, 30)}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
