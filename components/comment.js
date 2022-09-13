import React from "react";
// import axios from "axios";
// import style from "../styles/Home.module.css";
// import { FiSearch } from "react-icons/fi";
// import { useRouter } from "next/router";
import Image from "next/image";

function Search(props) {
  const { data } = props;
  const profdummy = `/image/profil.jpg`;
  const profpict = `http://localhost:8000/images/${data?.image}`;
  return (
    <>
      {/* {data.length > 0 ? ( */}
        <div>
          <h4>Comment</h4>
          {data?.map((item) => (
            <div
              className="card"
              key={item?.comment_id}
              style={{
                borderRadius: "15px",
                padding: "10px",
                border: "none",
                boxShadow: "5px 5px 5px 5px #FAF7ED",
                marginBottom: "20px",
                cursor: "pointer",
              }}
              // key={item?.recipe_id}
            >
              <div className="row">
                <div className="col-3">
                  <Image
                    crossOrigin="anonymous"
                    src={data.image ? profpict : profdummy}
                    width="80px"
                    height="80px"
                    style={{ borderRadius: "50%" }}
                    alt="image"
                  />
                </div>
                <div className="col-9">
                  <div>
                    <h6>{item?.user_id}</h6>
                    <p>{item?.comment}</p>
                    <div
                      style={{ marginTop: "-10px" }}
                      className="d-flex gap-1 align-items-center"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      {/* ) : (
        <div className="text-center w-100">
          <small >No Comment Yet</small>
        </div>
      )} */}
    </>
  );
}
export default Search;
