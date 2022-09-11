import React from "react";
import axios from "axios";
import style from "../styles/Home.module.css";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image"

function Fixedmenu() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:8000/popular`).then((res) => {
      setData(res?.data?.data ?? []);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, []);
  // console.log(data);

  return (
    <>
          <section className={`${style.popularRecipe} mb-5`}>
            <div className="d-flex justify-content-between">
              <h3>Popular Recipe</h3>
              <Link href="/popularmenu" passHref>
                <p>more info</p>
              </Link>
            </div>
            {data?.map((item) => (
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
                <Link
                  href={`/detail/${item?.recipe_id}`}
                  className="text-decoration-none"
                >
                  <div className="row">
                    <div className="col-3">
                    <Image
                      src={`http://localhost:8000/images/${item?.image}`}
                      width="80px"
                      height="80px"
                      style={{ borderRadius: "16px" }}
                      alt="image"
                    />
                      {console.log(data)}
                    </div>
                    <div className="col-9">
                      <div style={{ marginLeft: "5px" }}>
                        <h6>{item?.name}</h6>
                        <p>{item?.category}</p>
                        <div className="d-flex gap-1 align-items-center">
                          <AiFillStar className="text-warning" />
                          <span>{`${item?.liked?item?.liked:0} Like`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </section>
    </>
  );
}
export default Fixedmenu;
