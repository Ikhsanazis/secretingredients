import React from "react";
import style from "../../../styles/Profile.module.css";
import Navigation from "../../../components/navigation";
import { BsChevronRight, BsPerson } from "react-icons/bs";
import { FiBookmark } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { auth } = useSelector((state) => state);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    errorMsg: "",
  });

  const userName = auth?.profile?.username;
  const id = auth?.profile?.id;
  const profile = auth?.profile?.image;
  const profpict = `https://sweettooth-app.herokuapp.com/images/${profile}`;
  const profdummy = `/image/profil.jpg`;

  const handleEditProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .patch(`https://sweettooth-app.herokuapp.com/user/edit/${id}`, {
          username,
          email,
          password,
        })
        .then((response) => {
          // setMessage(response?.data);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Recipe Berhasil diedit",
          });
        })
        .catch(({ response }) => {
          // setMessage(response?.data?.message);
          // setError({ isError: true, errorMsg: message });
          Swal.fire({
            icon: "warning",
            title: "failed",
            text: "Terjadi Error",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  };
  console.log(username, email, password);

  const [modalOpen, setModalOpen] = useState(false);
  function closeModal() {
    setModalOpen(false);
  }

  const handleprofile = (file) => {
    Swal.fire({
      title: "Select image",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Swal.fire({
          title: "Your uploaded picture",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
        });
        setImage(e.target.result);
        console.log(image);
      };
    }
  };
  console.log("image", image);

  const handleSubmit = () => {
    axios
      .patch(`https://sweettooth-app.herokuapp.com/user/editimage/${id}`, {
        image,
      })
      .then((response) => {
        // setMessage(response?.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile picture Berhasil diedit",
        });
      })
      .catch(({ response }) => {
        setMessage(response?.data?.message);
        setError({ isError: true, errorMsg: message });
        Swal.fire({
          icon: "warning",
          title: "failed",
          text: "Terjadi Error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
    closeModal();
  };

  return (
    <>
      <div id="home" className="container ">
        <div className="col-lg-4 mx-auto col-sm">
          <div className={style.container}>
            <div className="h-100 ">
              <div className="d-flex flex-column  h-100 justify-content-center align-items-center ">
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
                <h5 className="text-center">
                  {userName ? userName : "username"}
                </h5>
              </div>
            </div>
          </div>
          <div
            className={`container`}
            style={{ backgroundColor: "#F8F8F8", height: "100vh" }}
          >
            <div className="row">
              <div className=" mx-auto col-xs-12">
                <h3 className="text-center mt-5 ">Edit Profile </h3>
                <div className={` mt-5 mb-5 h-100`}>
                  {/* <div className="row d-flex">
                  <form
                    className="mb-3 d-flex"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleprofile();
                    }}
                  >
                    {" "}
                    <div className="col-9 me-1">
                      <input
                        className="form-control "
                        type="file"
                        id="formFile"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                    <div className="col-3  d-flex justify-content-end">
                      <button
                        type="submit"
                        id={1}
                        className="btn btn-warning w-100 "
                        onClick={handleprofile}
                        disabled={isLoading}
                      >
                        {isLoading ? "Adding..." : "Edit"}
                      </button>
                    </div>
                  </form>
                </div> */}
                  <div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleEditProfile();
                      }}
                    >
                      {/*  Input */}
                      <div className="mb-3">
                        <div className={style.formControl}>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="name"
                            placeholder="userame"
                            onChange={(e) => setUsername(e.target.value)}
                            // required
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className={style.formControl}>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            id="email"
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className={style.formControl}>
                          <input
                            type="Password"
                            className="form-control form-control-lg"
                            id="Password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="d-grid ">
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg"
                          id={2}
                          onClick={handleEditProfile}
                          disabled={isLoading}
                        >
                          {/* {isLoading ? "Adding..." : "Edit"} */}
                          Edit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Navigation />
          </div>
        </div>
        <Navigation />
      </div>
    </>
  );
}
