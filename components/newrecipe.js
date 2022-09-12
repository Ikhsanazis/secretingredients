import React from "react";
import axios from "axios";
import style from "../styles/Home.module.css";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NewRecipe() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:8000/newrecipe`).then((res) => {
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
        <div
          className=""
          style={{
            display: "flex",
            overflowX: "auto",
          }}
        >
          {data.map((item) => (
            <a href="/DetailRecipe" key={item?.recipe_id}>
              <div
                key={item.recipe_id}
                className={`card d-flex border-0 me-1 ${style.cardrecipe} `}
              >
                <Image
                  src={`http://localhost:8000/images/${item?.image}`}
                  width="130px"
                  height="200px"
                  style={{ borderRadius: "15px" }}
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
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
export default NewRecipe;