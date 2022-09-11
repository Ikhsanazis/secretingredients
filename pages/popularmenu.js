import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";

// custom components
import Link from "next/link";

export default function Home() {
  const [popularRecipe, setPopularRecipe] = React.useState([]);
  const [loadPopular, setLoadPopular] = React.useState(true);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = () => {
    axios
      .get("http://localhost:8000/popular")
      .then((res) => {
        setPopularRecipe(res?.data?.data);
        setLoadPopular(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadPopular(false);
      });
  };
  console.log(popularRecipe);

  return (
    <div id="home" className="container ">
      <div className="col-lg-4 mx-auto">
        <div>
          <section className="">
            <div className="d-flex ">
              <Link href="/home" passHref>
                <IoChevronBack className="fs-3 mt-1 " />
              </Link>
              <h3 className="mx-5">Popular Recipe</h3>
            </div>
            {popularRecipe.map((item) => (
              <div
                className="card"
                style={{
                  borderRadius: "15px",
                  padding: "10px",
                  border: "none",
                  boxShadow: "2px 2px 5px 1px rgba(0,0,0,0.12)",
                  marginBottom: "20px",
                  cursor: "pointer",
                }}
                key={item?.recipe_id}
              >
                <div className="row">
                  <div className="col-3">
                    <Image
                      // loader={(src)=>{
                      //   return `http://localhost:8000/images/${item?.image}`;
                      // }}
                      src={`http://localhost:8000/images/${item?.image}`}
                      width="80px"
                      height="80px"
                      style={{ borderRadius: "16px" }}
                      alt="image"
                    />
                  </div>
                  <div className="col-9">
                    <div>
                      <h6>{item?.name}</h6>
                      <p>{item?.category}</p>
                      <div
                        style={{ marginTop: "-10px" }}
                        className="d-flex gap-1 align-items-center"
                      >
                        <AiFillStar className="text-warning" />
                        <span>{item?.liked ? item?.liked : 0} Like</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
        <Navigation />
      </div>
    </div>
  );
}
