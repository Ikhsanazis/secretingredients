import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AiFillStar } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import axios from "axios";
import Link from "next/link";

export default function SavedRecipe() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const decodeUser = decode(auth?.token);
  const user_id = decodeUser?.id;

  const [savedRecipe, setSavedRecipe] = React.useState([]);
  const [loadSaved, setLoadsaved] = React.useState(true);

  useEffect(() => {
    getSavedRecipe();
  });

  const getSavedRecipe = () => {
    axios
      .get(`http://localhost:8000/savedrecipes/${user_id}`)
      .then((res) => {
        setSavedRecipe(res?.data?.data);
        setLoadsaved(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadsaved(false);
      });
  };
console.log(savedRecipe)
  return (
    <div id="home" className="container ">
      <div className="col-lg-4 mx-auto">
        {/* <MainLayout> */}
        <div>
          {savedRecipe ? (
            <section className="">
              <div className="d-flex">
                <div className="col-2">
                  <a href="/profile">
                    <IoChevronBack className="fs-3 mt-1 bg-warning" />
                  </a>{" "}
                </div>
                <h3 className="col-8 text-center">Saved Recipe</h3>
              </div>
              {savedRecipe?.map((item) => (
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
                  key={item?.save_id}
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
        </div>
        {/* </MainLayout> */}
      </div>
    </div>
  );
}
