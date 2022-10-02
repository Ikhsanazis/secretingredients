import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Searchbar from "../../components/searchbar";
import Navigation from "../../components/navigation";
import Link from "next/link";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

function Search() {
  const router = useRouter();
  const { keyword } = router.query;
  const [filter, setFilter] = useState("DESC");
  const [resultSearch, setResultSearch] = useState([]);
  const [loadResult, setLoadResult] = useState(true);

  useEffect(() => {
    setLoadResult(true);
    axios
      .get(
        `https://sweettooth-app.herokuapp.com/recipe/search?keyword=${keyword}&filter=${filter}`
      )
      .then((res) => {
        setResultSearch(res?.data?.data);
        setLoadResult(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [keyword, filter]);

  function handleSort(e) {
    setFilter(e.target.value);
  }

  return (
    <>
      <div className="container">
        <div className="col-lg-4 mx-auto">
          <Searchbar />
          <div className="d-flex justify-content-end mb-2">
            <label>Sort By : </label>
            <select
              defaultValue={filter}
              onChange={handleSort}
              className="Default select example mx-1 border-0"
            >
              <option defaultValue value="DESC">
                Newest
              </option>
              <option value="ASC">Latest</option>
            </select>
          </div>
          <div className="row">
            <div className="col ">
              <div className="">
                {resultSearch.length > 0 ? (
                  <>
                    {resultSearch?.map((item) => (
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
                  </>
                ) : (
                  <>
                    <div className="text-center bg-light">
                      <p>There is no match result</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </>
  );
}

export default Search;
