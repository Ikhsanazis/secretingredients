import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import axios from "axios";
import Link from "next/dist/client/link";
import Navigation from "../components/navigation";
import { AiOutlineLike } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import style from "../styles/Popular.module.css";

export default function Home() {
  const [popularRecipe, setPopularRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState({});

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = () => {
    axios
      .get("https://sweettooth-app.herokuapp.com/popular")
      .then((res) => {
        setPopularRecipe(res?.data?.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  console.log(popularRecipe);

  return (
    <div id="home" className="container ">
      <div className="col-lg-4 mx-auto">
        <div>
          <section className="">
            <div className="d-flex mt-3 mb-3">
              <div className="col-2">
                <Link href="/profile">
                  <IoChevronBack className="fs-3 mt-1 bg-warning" />
                </Link>{" "}
              </div>
              <h3 className="col-8 text-center">Popular Recipes</h3>
            </div>
            {isLoading ? (
              <div className={style.item}>
                {[...Array(5)].map((index) => (
                  <div
                    className="card"
                    style={{
                      borderRadius: "15px",
                      padding: "10px",
                      border: "none",
                      height: "100px",
                      boxShadow: "2px 2px 5px 1px rgba(0,0,0,0.12)",
                      marginBottom: "20px",
                      cursor: "pointer",
                    }}
                    key={index}
                  >
                    <div className="row">
                      {/* <p>test</p> */}
                      <div
                        className={`spinner-border  text-warning d-flex align-items-center`}
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={style.item}>
                {popularRecipe.map((item) => (
                  <div
                    className="card"
                    style={{
                      borderRadius: "15px",
                      padding: "10px",
                      border: "none",
                      height: "100px",
                      boxShadow: "2px 2px 5px 1px rgba(0,0,0,0.12)",
                      marginBottom: "20px",
                      cursor: "pointer",
                    }}
                    key={item?.recipe_id}
                  >
                    <Link href={`/detail/${item?.recipe_id}`}>
                      <div className="row">
                        <div className="col-3">
                          <Image
                            src={`https://sweettooth-app.herokuapp.com/images/${item?.image}`}
                            width="80px"
                            height="80px"
                            style={{ borderRadius: "16px" }}
                            alt="image"
                          />
                        </div>
                        <div className="col-9">
                          <div style={{ marginLeft: "5px" }}>
                            <h6>{item?.name}</h6>
                            <p>{item?.category}</p>
                            <small
                              className="d-flex gap-1 align-items-center"
                              style={{ marginTop: "-10px" }}
                            >
                              <AiFillStar className="text-warning" />
                              <span>{`${
                                item?.liked ? item?.liked : 0
                              } Like`}</span>
                            </small>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
        <Navigation />
      </div>
    </div>
  );
}
