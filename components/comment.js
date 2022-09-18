import React from "react";
import Image from "next/image";

function Comment(props) {
  const { data } = props;
  const profdummy = `/image/profil.jpg`;
  console.log(data?.image);
  return (
    <>
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
          >
            <div className="row">
              <div className="col-3">
                <Image
                  crossOrigin="anonymous"
                  src={
                    item?.image
                      ? `http://localhost:8000/images/${item?.image}`
                      : profdummy
                  }
                  width="80px"
                  height="80px"
                  style={{ borderRadius: "50%" }}
                  alt="image"
                />
              </div>
              <div className="col-9">
                <div>
                  <h6>{item?.username}</h6>
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
    </>
  );
}
export default Comment;
