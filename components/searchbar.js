import React from "react";
import axios from "axios";
import style from "../styles/Home.module.css";
import { FiSearch } from "react-icons/fi";

function Search() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:8000/newrecipe`).then((res) => {
      setData(res?.data?.data ?? []);
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    });
  }, []);
  console.log(data);

  return (
    <>
      <div className="row mx-2 justify-content-lg-center px-1">
        <div className="col">
          <div className={`${style.search} mb-2 mt-1`}>
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Where you want to go?"
                required
              />
              <FiSearch className={style.icon} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Search;
