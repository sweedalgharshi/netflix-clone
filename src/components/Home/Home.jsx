import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const API_KEY = `78b99e174ee07a830e10dd2163bb7149`;
const URL = `https://api.themoviedb.org/3/`;
const IMAGE_URL = `https://image.tmdb.org/t/p/original`;

const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ image }) => {
  return <img className="card" src={image} alt="cover" />;
};

const Row = ({ title, arr = [] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>

      <div>
        {arr.map((item, index) => (
          <Card key={index} image={`${IMAGE_URL}/${item.poster_path}`} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${URL}movie/${upcoming}?api_key=${API_KEY}&language=en-US&page=3`);

      setUpcomingMovies(results);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${URL}movie/${nowPlaying}?api_key=${API_KEY}&language=en-US&page=6`);

      setNowPlayingMovies(results);
    };

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${URL}movie/${popular}?api_key=${API_KEY}&language=en-US&page=1`);

      setPopularMovies(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${URL}movie/${topRated}?api_key=${API_KEY}&language=en-US&page=8`);

      setTopRatedMovies(results);
    };

    const fetchAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${URL}genre/movie/list?api_key=${API_KEY}&language=en-US`);

      setGenre(genres);
      console.log(genres);
    };

    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    fetchAllGenre();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${IMAGE_URL}/${popularMovies[0].poster_path})`
            : "rgb(16,16,16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button>
            <BiPlay /> Play
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>

      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Now Playing Movies"} arr={nowPlayingMovies} />
      <Row title={"Popular Movies"} arr={popularMovies} />
      <Row title={"Top Rated Movies"} arr={topRatedMovies} />

      <div className="genre-box">
        {genre.map((item, id) => {
          return (
            <Link key={id} to={`/genre/${item.name}`}>
              {item.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Home;

//https://api.themoviedb.org/3/movie/now_playing?api_key=78b99e174ee07a830e10dd2163bb7149&language=en-US&page=1

//https://api.themoviedb.org/3/movie/popular?api_key=78b99e174ee07a830e10dd2163bb7149&language=en-US&page=1

//https://api.themoviedb.org/3/genre/tv/list?api_key=78b99e174ee07a830e10dd2163bb7149&language=en-US

//https://api.themoviedb.org/3/movie/top_rated?api_key=78b99e174ee07a830e10dd2163bb7149&language=en-US&page=1
