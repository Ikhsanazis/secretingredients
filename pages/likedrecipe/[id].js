import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AiFillStar } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import { useState } from "react";
import axios from "axios";
// custom components
import Link from "next/link";

export default function LikedRecipe() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const decodeUser = decode(auth?.token);
  const user_id = decodeUser?.id;

  const [likedRecipe, setLikedRecipe] = useState([]);
  const [loadLiked, setLoadLiked] = useState(true);

  useEffect(() => {
    getLikedRecipes();
  });
  const getLikedRecipes = () => {
    axios
      .get(`https://sweettooth-app.herokuapp.com/likedrecipes/${user_id}`)
      .then((res) => {
        setLikedRecipe(res?.data?.data);
        setLoadLiked(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadLiked(false);
      });
  };

  console.log(likedRecipe);
  return (
    <div id="Liked" className="container ">
      <div className="col-lg-4 mx-auto">
        {/* <MainLayout> */}
        <div>
          <div className="d-flex mt-3 mb-3">
            <div className="col-2">
              <Link href="/profile">
                <IoChevronBack className="fs-3 mt-1 bg-warning" />
              </Link>{" "}
            </div>
            <h3 className="col-8 text-center">Liked Recipe</h3>
          </div>
          {likedRecipe.length > 0 ? (
            <section className="">
              {likedRecipe?.map((item) => (
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
                          src={`${item?.image}`}
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
            </section>
          ) : (
            <section>
              <div className="text-center bg-light">
                <p>No Data Yet</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
