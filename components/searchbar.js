import React from "react";
import style from "../styles/Home.module.css";
import { useRouter } from "next/router";

function Search() {
  const router = useRouter();
  const [name, setName] = React.useState("");

  const handleSearch = () => {
    router.push(`/search/${name}`);
  };
  return (
    <>
      <section className="mt-3 mb-3">
        <div className={style.searchBar}>
          <form
            // className={style.searchbar}
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
              className={`form-control  ${style.searchbar}`}
              placeholder="Search Pasta, Bread, etc"
              aria-label="Search Pasta, Bread, etc"
              aria-describedby="basic-addon1"
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </div>
      </section>
    </>
  );
}
export default Search;
