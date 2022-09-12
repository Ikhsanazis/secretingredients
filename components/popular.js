import React from "react";
import axios from "axios";
import style from "../styles/Home.module.css";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

function Popularmenu(props) {
  const [loadPopular, setLoadPopular] = React.useState(true);
  const [popularRecipe, setPopularRecipe] = React.useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = () => {
    axios
      .get("http://localhost:8000/popular")
      .then((res) => {
        setPopularRecipe(res?.data?.data);
        setLoadPopular(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadPopular(false);
      });
  };

  const [currentItems, setCurrentItems] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(popularRecipe.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(popularRecipe.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, popularRecipe]);
  // console.log(items);
  // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const itemsPerPage = 4;
  console.log(currentItems);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % popularRecipe.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  console.log(currentItems);

  return (
    <>
      <section className={`${style.popularRecipe} `}>
        <div className="d-flex justify-content-between">
          <h3>Popular Recipe</h3>
          <a href="/popularmenu">
            <p>more info</p>
          </a>
        </div>
        {currentItems?.map((item) => (
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
            key={item?.recipe_id}
          >
            <Link
              href={`/detail/${item?.recipe_id}`}
              className="text-decoration-none"
            >
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
                    <div className="d-flex gap-1 align-items-center">
                      <AiFillStar className="text-warning" />
                      <span>{`${item?.liked ? item?.liked : 0} Like`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
      <section className={style.marginbottom}>
        <ReactPaginate
          // className="pagination"
          breakLabel="..."
          nextLabel="next"
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