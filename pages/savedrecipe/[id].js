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
      .get(`https://sweettooth-app.herokuapp.com/savedrecipes/${user_id}`)
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
  // console.log(savedRecipe.length);
  return (
    <div id="home" className="container ">
      <div className="col-lg-4 mx-auto">
        {/* <MainLayout> */}
        <div>
          <div className="d-flex mt-3 mb-3">
            <div className="col-2">
              <Link href="/profile">
                <IoChevronBack className="fs-3 mt-1 bg-warning" />
              </Link>{" "}
            </div>
            <h3 className="col-8 text-center">Saved Recipe</h3>
          </div>
          {savedRecipe.length > 0 ? (
            <section className="">
              {savedRecipe?.map((item) => (
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
