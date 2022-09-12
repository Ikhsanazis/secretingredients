import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Searchbar from "../../components/searchbar";

function Search() {
  const router = useRouter();
  const { name } = router.query;

  const [resultSearch, setResultSearch] = useState([]);
  const [countData, setCountData] = useState([]);
  const [loadResult, setLoadResult] = useState(true);

  useEffect(() => {
    handleSearch();
  });

  const handleSearch = () => {
    axios
      .post("http://localhost:8000/find", { name })
      .then((res) => {
        setCountData(res?.data.jumlahData);
        setResultSearch(res?.data?.data);
        setLoadResult(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(resultSearch.length);
  console.log(loadResult);

  return (
    <>
      <div className="container">
        <div className="col-lg-4 mx-auto">
          <Searchbar />
          {resultSearch.length > 0 ? (
            <div className="row">
              <div className="col mb-5">
                <div className="mt-5">
                  {resultSearch?.map((item) => (
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
                      <div className="row">
                        <div className="col-3">
                          {/* <Image
                        src={`http://localhost:8000/images/${item?.image}`}
                        width="80px"
                        height="80px"
                        style={{ borderRadius: "16px" }}
                        alt="image"
                      /> */}
                        </div>
                        <div className="col-9">
                          <div>
                            <h6>{item?.name}</h6>
                            <p>{item?.category}</p>
                            <div
                              style={{ marginTop: "-10px" }}
                              className="d-flex gap-1 align-items-center"
                            >
                              {/* <AiFillStar className="text-warning" /> */}
                              <span>{item?.liked ? item?.liked : 0} Like</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p> Thres no Result </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
