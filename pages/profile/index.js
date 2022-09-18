import React from "react";
import style from "../../styles/Profile.module.css";
import Navigation from "../../components/navigation";
import { BsChevronRight, BsPerson } from "react-icons/bs";
import { FiBookmark } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import * as Type from "../../redux/auth/type";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { auth } = useSelector((state) => state);
  const username = auth?.profile?.username;
  const profile = auth?.profile?.image;
  const profdummy = `/image/profil.jpg`;
  console.log(username, profile);

  const handleLogout = () => {
    Swal.fire({
      title: "Are You Sure to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "blue",
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: Type.REMOVE_AUTH });
        router.replace("/");
      }
    });
  };

  return (
    <div id="home" className="">
      <div className={style.container}>
        <div className="col-lg-4 h-100 mx-auto bg-warning">
          <div
            className=" text-white fs-5 d-flex justify-content-end me-3 w-100"
            onClick={handleLogout}
          >
            <FiLogOut className="mt-3 mx-3" />
          </div>
          <div className="d-flex justify-content-center align-items-center ">
            <Image
              // crossOrigin="anonymous"
              className={`${style.profpict} `}
              style={{ objectFit: "cover" }}
              src={
                profile
                  ? `https://sweettooth-app.herokuapp.com/images/${profile}`
                  : profdummy
              }
              alt=""
              width={100}
              height={100}
            />
          </div>
          <h5 className="text-center mt-2">
            {username ? username : "username"}
          </h5>
        </div>
      </div>
      <div className="col-lg-4 mx-auto">
        <div className={`${style.background} mx-3`}>
          <div className={`row justify-content-center `}>
            <Link href="/edit" passHref>
              <div className="row mt-4 " style={{ cursor: "pointer" }}>
                <div className="col-2 text-center">
                  <div className="">
                    <BsPerson className="fs-3 text-warning" />
                  </div>
                </div>
                <div className="col-8 mt-2">
                  <p className="">Edit Profile</p>
                </div>
                <div className={`col-2 `}>
                  <BsChevronRight className="mt-1" />
                </div>
              </div>
            </Link>
            <Link href="/myrecipe/id" passHref>
              <div className="row mt-4 " style={{ cursor: "pointer" }}>
                <div className="col-2 text-center">
                  <div className="">
                    <FiAward className="fs-3 text-warning" />
                  </div>
                </div>
                <div className="col-8 mt-2">
                  <p className="">My Recipe</p>
                </div>
                <div className={`col-2 `}>
                  <BsChevronRight className="mt-1" />
                </div>
              </div>
            </Link>
            <Link href="/savedrecipe/id" passHref>
              <div className="row mt-4 " style={{ cursor: "pointer" }}>
                <div className="col-2 text-center">
                  <div className="{profileStyle.icon}">
                    <FiBookmark className="fs-3 text-warning" />
                  </div>
                </div>
                <div className="col-8 mt-2">
                  <p className="">Saved Recipe</p>
                </div>
                <div className={`col-2 `}>
                  <BsChevronRight className="mt-1" />
                </div>
              </div>
            </Link>
            <Link href="/likedrecipe/id" passHref>
              <div className="row mt-4 " style={{ cursor: "pointer" }}>
                <div className="col-2 text-center">
                  <div className="">
                    <AiOutlineLike className="fs-3 text-warning" />
                  </div>
                </div>
                <div className="col-8 mt-2">
                  <p className="">Liked Recipe</p>
                </div>
                <div className={`col-2`}>
                  <BsChevronRight className="mt-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
}
