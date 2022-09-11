import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import * as Type from "../../redux/auth/type";
import { useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import axios from "axios";

// custom components
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const decodeUser = decode(auth?.token);
  const user_id = decodeUser?.id;

  const [likedRecipe, setLikedRecipe] = React.useState([]);
  const [loadLiked, setLoadLiked] = React.useState(true);

  useEffect(() => {
    getLikedRecipes();
  }, []);

  const getLikedRecipes = () => {
    axios
      .get(`http://localhost:8000/likedrecipes/${user_id}`)
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
  
console.log(likedRecipe)
  return (
    <div id="home" className="container ">
      <div className="col-lg-4 mx-auto">
        {/* <MainLayout> */}
        <div>
          {likedRecipe ? (
            <section className="">
              <div className="d-flex">
                <div className="col-2">
                  <Link href="/profile" passHref>
                    <IoChevronBack className="fs-3 mt-1 bg-warning" />
                  </Link>{" "}
                </div>
                <h3 className="col-8 text-center">Liked Recipe</h3>
              </div>
              {likedRecipe?.map((item) => (
                <div
                  className="card"
                  style={{
                    borderRadius: "15px",
                    padding: "10px",
                    border: "none",
                    "box-shadow": "2px 2px 5px 1px rgba(0,0,0,0.12)",
                    "-webkit-box-shadow": "2px 2px 5px 1px rgba(0,0,0,0.12)",
                    "-moz-box-shadow": "2px 2px 5px 1px rgba(0,0,0,0.12)",
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
                        <div className="d-flex gap-1 align-items-center">
                          <AiFillStar className="text-warning" />
                          <span>{item?.liked ? item?.liked : 0} Like</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <section>
              <div>
                <p>No Data Yet</p>
              </div>
            </section>
          )}
          {/* End Of Popular Recipes */}
        </div>
        {/* </MainLayout> */}
      </div>
    </div>
  );
}
