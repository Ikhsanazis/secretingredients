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
import { decode } from "jsonwebtoken";
import * as Type from "../../redux/auth/type";
// custom component
import Link from "next/link";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: Type.REMOVE_AUTH });
        router.replace("/home");
      }
    });
  };
  return (
    <div id="home" className="container ">
      <div className="col-lg-4 mx-auto col-sm">
        <div className={style.container}>
          <div className={style.card}>
            <div
              className=" text-white fs-5 d-flex justify-content-end me-3 w-100"
              onClick={handleLogout}
            >
              <FiLogOut className="mt-3 mx-3" />
            </div>
            <div className="d-flex justify-content-center">
              <img
                className={`${style.profpict} mt-4`}
                style={{ backgroundSize: "cover" }}
                src={"/image/profil.jpg"}
                alt=""
                width={100}
                height={100}
              />
            </div>
            <h5 className="text-center">Username</h5>
          </div>
        </div>
        <div className={`${style.background} mx-3`}>
          <div className={`row justify-content-center `}>
            <Link href="/editprofile/id" passHref>
              <div className="row mt-4 cursor">
                <div className="col-2 text-center">
                  <div className="">
                    <BsPerson className="fs-3 text-warning" />
                  </div>
                </div>
                <div className="col-8 mt-2">
                  <p className="{profileStyle.titleContent}">Edit Profile</p>
                </div>
                <div className={`col-2 `}>
                  <BsChevronRight />
                </div>
              </div>
            </Link>
            <Link href="/myrecipe/id" passHref>
              <div className="row mt-4 cursor">
                <div className="col-2 text-center">
                  <div className="">
                    <FiAward className="fs-3 text-warning" />
                  </div>
                </div>
                <div className="col-8 mt-2">
                  <p className="">My Recipe</p>
                </div>
                <div className={`col-2 `}>
                  <BsChevronRight />
                </div>
              </div>
            </Link>
            <Link href="/savedrecipe/id" passHref>
              <div className="row mt-4 cursor">
                <div className="col-2 text-center">
                  <div className="{profileStyle.icon}">
                    <FiBookmark className="fs-3 text-warning" />
                  </div>
                </div>
                <div className="col-8 mt-2">
                  <p className="{profileStyle.titleContent}">Saved Recipe</p>
                </div>
                <div className={`col-2 `}>
                  <BsChevronRight />
                </div>
              </div>
            </Link>
            <Link href="/likedrecipe/id" passHref>
              <div className="row mt-4 cursor">
                <div className="col-2 text-center">
                  <div className="">
                    <AiOutlineLike className="fs-3 text-warning" />
                  </div>
                </div>
                <div className="col-8 mt-2">
                  <p className="">Liked Recipe</p>
                </div>
                <div className={`col-2`}>
                  <BsChevronRight />
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
