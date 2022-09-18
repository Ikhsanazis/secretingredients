import React from "react";
import axios from "axios";
import style from "../styles/Home.module.css";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

function Popularmenu() {
  const [isLoading, setIsLoading] = useState({});
  const [popularRecipe, setPopularRecipe] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    axios
      .get("https://sweettooth-app.herokuapp.com/popular")
      .then((res) => {
        setPopularRecipe(res?.data?.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const itemsPerPage = 4;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(popularRecipe.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(popularRecipe.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, popularRecipe]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % popularRecipe.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <section className={`${style.popularRecipe} `}>
        <div
          className="d-flex justify-content-between"
          style={{ cursor: "pointer" }}
        >
          <h3>Popular Recipe</h3>
          <Link href="/popularmenu">
            <p>more info</p>
          </Link>
        </div>
        {isLoading ? (
          <>
            {[...Array(4)].map((index) => (
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
                key={index}
              >
                <div className="row">
                  {/* <p>test</p> */}
                  <div
                    className={`spinner-border  text-warning d-flex align-items-center`}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {" "}
            {currentItems?.map((item) => (
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
                        src={`http://localhost:8000/images/${item?.image}`}
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
                          <span>{`${item?.liked ? item?.liked : 0} Like`}</span>
                        </small>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
      </section>
      <section className={style.marginbottom}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          previousLabel={"Prev"}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName={`${style.pagination}`}
          pageLinkClassName={`${style.pagenum}`}
          previousLinkClassName={`${style.prev}`}
          nextLinkClassName={`${style.prev}`}
          activeLinkClassName={`${style.pageactive}`}
        />
      </section>
    </>
  );
}
export default Popularmenu;
