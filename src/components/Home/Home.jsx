import React from "react";
import "./Home.scss";

const Card = ({ image }) => {
  return <img className="card" src={image} alt="cover" />;
};

const Row = ({
  title,
  arr = [
    {
      img: "https://images-cdn.ubuy.co.in/639d26c59c29847e8e377f83-the-last-of-us-part-ii-gaming-poster.jpg",
    },
  ],
}) => {
  return (
    <div className="row">
      <h2>{title}</h2>

      <div>
        {arr.map((item) => (
          <Card image={item.img} />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <section className="home">
      <div className="banner"></div>

      <Row title={"Popular on Netflix"} />
      <Row title={"Movies"} />
      <Row title={"Tv Shows"} />
      <Row title={"Recently Viewed"} />
      <Row title={"My List"} />
    </section>
  );
};

export default Home;
