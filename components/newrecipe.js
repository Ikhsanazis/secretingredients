import React from "react";
import axios from "axios";
import style from "../styles/Home.module.css";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

function NewRecipe() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    axios.get(`https://sweettooth-app.herokuapp.com/newrecipe`).then((res) => {
      setData(res?.data?.data ?? []);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  return (
    <>
      <section className={style.newRecipe}>
        <h3>New Recipes</h3>
        {isLoading ? (
          <div
            className="row"
            // role="status"
            style={{
              display: "flex",
              overflowX: "auto",
            }}
          >
            <div
              className={`card bg-light w-100 d-flex justify-content-center align-items-center  border-0 me- ${style.cardrecipe} `}
            >
              <div
                className={`spinner-border  text-warning d-flex align-items-center`}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className=""
            style={{
              display: "flex",
              overflowX: "auto",
            }}
          >
            {data.map((item) => (
              <div key={item?.recipe_id}>
                <Link href={`/detail/${item?.recipe_id}`}>
                  <div
                    key={item.recipe_id}
                    className={`card d-flex border-0 me-1 ${style.cardrecipe} `}
                  >
                    <Image
                      crossOrigin="anonymous"
                      src={`https://sweettooth-app.herokuapp.com/images/${item?.image}`}
                      width="130px"
                      height="200px"
                      style={{ borderRadius: "15px", backgroundSize: "cover" }}
                      alt="image"
                      className={`card-img `}
                    />
                    <div
                      style={{ width: "130px" }}
                      className={`card-img-overlay row d-flex align-items-end `}
                    >
                      <h6
                        className=""
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          marginLeft: "-5px",
                          color: "#fff",
                          textShadow: "1px -1px 7px rgba(0,0,0,1)",
                        }}
                      >
                        {item?.name}
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
export default NewRecipe;
