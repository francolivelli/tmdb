import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Content = () => {
  const { type, id } = useParams();
  const [data, setData] = useState({});

  const fetchContent = () => {
    axios
      .get(`https://api.themoviedb.org/3/${type}/${id}`, {
        params: {
          api_key: "fbd5e795f2c301d012b62e7b9f1fdde7",
        },
      })
      .then((res) => res.data)
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error);
      });
  };

  let name;
  if (data.name) {
    name = data.name;
  } else {
    name = data.title;
  }

  useEffect(() => {
    fetchContent();
  }, [id]);

  if (!data.id) return <p>No hay datos</p>;

  return (
    <section className="layout">
      <header className="has-background-link p-6 has-text-white">
        <p className="is-size-5">{data.name ? "TV Show" : "Movie"}</p>
        <div className="is-flex">
          <img
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt="Poster"
            style={{ width: "auto", height: "256px" }}
          />
          <div className="p-4 is-flex is-flex-direction-column is-justify-content-space-around">
            <p className="is-size-1">{name}</p>
            <p>{data.overview}</p>
            <br/>
            <div>
              {data.genres.map((genre, i) => {
                return (
                  <div key={i}>
                    <p>{genre.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Content;
