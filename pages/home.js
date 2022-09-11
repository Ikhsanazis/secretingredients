import React from "react";
import { useRouter } from "next/router";
import Navigation from "../components/navigation";
import Newrecipe from "../components/newrecipe";
import Popularmenu from "../components/popular";
import Category from "../components/category";
import style from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [keyword, setKeyword] = React.useState("");

  const handleSearch = () => {
    router.push(`/search/${keyword}`);
  };
  return (
    <div id="home" className="container">
      <div className="col-lg-4 mx-auto">
        <div className={style.searchBar}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            {/* <span className="input-group-text test" id="basic-addon1">
              <FiSearch />
            </span> */}
            <input
              type="text"
              className="form-control"
              placeholder="Search Pasta, Bread, etc"
              aria-label="Search Pasta, Bread, etc"
              aria-describedby="basic-addon1"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
        </div>
        <Newrecipe />
        <Category />
        <Popularmenu />
      </div>
      <Navigation />
    </div>
  );
}
