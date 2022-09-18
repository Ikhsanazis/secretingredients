import React from "react";
import style from "../../../styles/Profile.module.css";
import Navigation from "../../../components/navigation";

import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as Type from "../../../redux/auth/type";
import { useState } from "react";
import Image from "next/image";
import AddCard from "../../../components/AddCard";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";

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
  const profpict = `http://localhost:8000/images/${profile}`;
  const profdummy = `/image/profil.jpg`;

  const handleEditProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .patch(`http://localhost:8000/user/edit/${id}`, {
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

  const handleSubmit = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("image", image);

    if (!image) {
      Swal.fire({
        icon: "warning",
        title: "failed",
        text: "Complete Your Input",
      });
    } else {
      setIsLoading(true);
      setTimeout(() => {
        axios({
          method: "patch",
          url: `http://localhost:8000//user/editimage/${id}`,
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((response) => {
            // setMessage(response?.data);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Recipe Berhasil ditambah",
            });
          })
          .catch(({ response }) => {
            // setMessage(response?.data?.message);
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
      }, 1000);
    }
  };
  console.log("image", image);

  const handleSubmited = () => {
    axios
      .patch(`http://localhost:8000/user/editimage/${id}`, {
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
                      ? `http://localhost:8000/images/${profile}`
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
                  <div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {/*  Input */}
                      <div className="mb-3">
                        <div className="">
                          <input
                            className="form-control "
                            type="file"
                            id="formFile"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <div className="d-grid ">
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg"
                          onClick={handleSubmit}
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
