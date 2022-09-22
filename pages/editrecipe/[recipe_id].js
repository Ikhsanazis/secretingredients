import React from "react";
import style from "../../styles/Login.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import Navigation from "../../components/navigation";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";

function EditRecipe() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { auth } = useSelector((state) => state);
  const decodeUser = decode(auth?.token);
  const id = decodeUser?.id;
  console.log(id);
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState("");
  const [video, setVideo] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState({
    isError: false,
    errorMsg: "",
  });
  const [message, setMessage] = React.useState("");
  const {
    query: { recipe_id },
  } = router;
  console.log("ini", recipe_id);

  useEffect(() => {
    axios
      .get(`https://sweettooth-app.herokuapp.com/${recipe_id}`)
      .then((res) => {
        setData(res?.data?.data ?? []);
        setIsLoading(false);
      });
  }, [recipe_id]);

  console.log("test data", data[0]?.name);
  const handleEditRecipe = (data) => {
    console.log("coba", data);
    setIsLoading(true);
    setTimeout(() => {
      axios
        .patch(`https://sweettooth-app.herokuapp.com/edit/${recipe_id}`, {
          name: name ? name : data[0]?.name,
          ingredients: ingredients ? ingredients : data[0]?.ingredients,
        })
        .then((response) => {
          setMessage(response?.data);
        })
        .catch(({ response }) => {
          setMessage(response?.data?.message);
          setError({ isError: true, errorMsg: message });

        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  };
  console.log("lookname", name, ingredients, data);

  return (
    <div
      className={`container`}
      style={{ backgroundColor: "#F8F8F8", height: "100vh" }}
    >
      {data.map((item) => (
        <div className="row" key={item.recipe_id}>
          <div className="col-md-4  mx-auto col-xs-12">
            <div className="d-flex">
              <div className="col-2">
                <Link href={`/detail/${item?.recipe_id}`} passHref>
                  <IoChevronBack className="fs-3 mt-1 bg-warning" />
                </Link>
              </div>
              <h3 className="col-8 text-center">My Recipe</h3>
            </div>{" "}
            <div className={` mt-5 mb-5 h-100`}>
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditRecipe();
                  }}
                >
                  {/*  Input */}
                  <div className="mb-3">
                    <label className="form-label">Title Recipe</label>
                    <div className={style.formControl}>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="name"
                        placeholder={item.name}
                        onChange={(e) => setName(e.target.value)}
                        // required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Ingredients
                    </label>
                    <div className={style.formControl}>
                      <input
                        type="ingredients"
                        className="form-control form-control-lg"
                        id="ingredients"
                        placeholder={item.ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <div className="mb-3">
                  <label className="form-label">Image</label>
                  <div className={style.formControl}>
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      id="name"
                      placeholder="Image"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Video</label>
                  <div className={style.formControl}>
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      id="name"
                      placeholder="video"
                      onChange={(e) => setVideo(e.target.files[0])}
                    />
                  </div>
                </div> */}
                  <div className="d-grid ">
                    <button
                      type="submit"
                      className="btn btn-warning btn-lg"
                      onClick={handleEditRecipe}
                      disabled={isLoading}
                    >
                      {isLoading ? "Adding..." : "Edit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Navigation />
    </div>
  );
}

export default EditRecipe;
