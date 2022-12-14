import React from "react";
import style from "../styles/Login.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import Navigation from "../components/navigation";
import Swal from "sweetalert2";
import { useEffect } from "react";

function AddRecipe() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { auth } = useSelector((state) => state);
  const decodeUser = decode(auth?.token);
  const id = decodeUser?.id;

  useEffect(() => {
    if (auth?.token == null) {
      Swal.fire({
        icon: "warning",
        title: "Login to your Accouunt",
        text: "You Have To Lpgin First",
      });
      router.replace("/");
    }
  });

  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("Soup");
  const [image, setImage] = React.useState("");
  const [video, setVideo] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState({
    isError: false,
    errorMsg: "",
  });
  const [message, setMessage] = React.useState("");

  console.log("category", category);

  const categoryoption = [
    { name: "Soup" },
    { name: "Chicken" },
    { name: "Seafood" },
    { name: "Dessert" },
  ];

  const handleAddRecipe = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("ingredients", ingredients);
    bodyFormData.append("category", category);
    bodyFormData.append("image", image);
    bodyFormData.append("video", video);

    const isValid = name && ingredients && category;
    if (!isValid) {
      Swal.fire({
        icon: "warning",
        title: "failed",
        text: "Complete Your Input",
      });
    } else {
      setIsLoading(true);
      setTimeout(() => {
        axios({
          method: "post",
          url: `https://sweettooth-app.herokuapp.com/recipes/add/${id}`,
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((response) => {
            // setMessage(response?.data);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Recipe Berhasil ditambah",
            });
          })
          .catch(({ response }) => {
            // setMessage(response?.data?.message);
            setError({ isError: true, errorMsg: message });
            Swal.fire({
              icon: "warning",
              title: "failed",
              text: "Terjadi Error",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 1000);
    }
  };
  console.log(name, ingredients, category, image, video);
  console.log(message);

  return (
    <div
      className={`container`}
      style={{ backgroundColor: "#F8F8F8", height: "100vh" }}
    >
      <div className="row">
        <div className="col-lg-4 col-md-4  mx-auto col-xs-12">
          <h3 className="text-center mt-3 ">Add Your Recipe </h3>
          <div className={` mt-4 mb-3 h-100`}>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddRecipe();
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
                      placeholder="title"
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
                      placeholder="Your ingredients"
                      onChange={(e) => setIngredients(e.target.value)}
                      // required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Category
                  </label>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control form-control-lg"
                    aria-label="Default select "
                    placeholder="Your ingredients"
                  >
                    {categoryoption.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
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
                <div className="mb-4">
                  <label className="form-label">Video</label>
                  <div className={style.formControl}>
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      id="name"
                      placeholder="video"
                      onChange={(e) => setVideo(e.target.files[0])}
                      // required
                    />
                  </div>
                </div>
                <div className="d-grid ">
                  <button
                    type="submit"
                    className="btn btn-warning btn-lg"
                    onClick={handleAddRecipe}
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
}

export default AddRecipe;

{
  /* <section className="">
  <div className="d-flex ">
    <Link href="/home" passHref>
      <IoChevronBack className="fs-3 mt-1 " />
    </Link>
    <h3 className="mx-5">Add Recipe</h3>
  </div>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      addRecipe();
    }}
  >
    <input
      type="text"
      className="form-control mb-3"
      id="title"
      placeholder="Title"
    />
    <input
      type="text"
      className="form-control mb-3"
      id="Category"
      placeholder="Category"
    />
    <textarea
      className="form-control mb-3"
      id="exampleFormControlTextarea1"
      rows="6"
      placeholder="Ingredients"
    ></textarea>
    <div className="mb-3">
      <label for="formFile" className="form-label">
        Upload Image
      </label>
      <input className="form-control" type="file" id="formFile" />
    </div>
    <div className="mb-3">
      <label for="formFileMultiple" className="form-label">
        Upload Video
      </label>
      <input className="form-control" type="file" id="formFileMultiple" multiple />
    </div>
    <div className=" w-100 ">
      <button
        type="submit"
        className="btn btn-warning btn-lg w-100"
        onClick={handleLogin}
        disabled={isLoading}
      >
        Send
      </button>
    </div>
  </form>
</section>; */
}
