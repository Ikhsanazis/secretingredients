import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
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
    <div id="home" className="container ">
      <div className="col-lg-4 mx-auto">
        <div>
          <section className="">
            <div className="d-flex  mt-3">
              <div className="col-2">
                <Link href="/profile">
                  <IoChevronBack className="fs-3 mt-1 bg-warning" />
                </Link>{" "}
              </div>
              <h3 className="col-8 text-center">Edit Profile</h3>
            </div>
            <div className={`row  mx-4`}>
              <Link href="/edit/editprofile" passHref>
                <div className="row mt-3 " style={{ cursor: "pointer" }}>
                  <p className="">Edit Profile</p>
                </div>
              </Link>
              <hr className=""></hr>
              <Link href="/edit/editpicture" passHref>
                <div className="row mt-3 " style={{ cursor: "pointer" }}>
                  <p className="">Edit Image</p>
                </div>
              </Link>
              <hr className=""></hr>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
