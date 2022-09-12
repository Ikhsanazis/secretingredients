import React from "react";
import style from "../styles/Login.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import Navigation from "../components/navigation";
import Swal from "sweetalert2";

function AddRecipe() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { auth } = useSelector((state) => state);
  const decodeUser = decode(auth?.token);
  const id = decodeUser?.id;
  console.log(id);

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

  // const id = 1;
  const handleAddRecipe = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("ingredients", ingredients);
    bodyFormData.append("category", category);
    bodyFormData.append("image", image);
    bodyFormData.append("video", video);
    setIsLoading(true);
    setTimeout(() => {
      axios({
        method: "post",
        url: `http://localhost:8000/recipes/addimage/${id}`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          setMessage(response?.data);
          Swal.fire({
            icon: "success",
            title: "Sukses",
            text: "Recipe Berhasil ditambah",
          });
        })
        .catch(({ response }) => {
          setMessage(response?.data?.message);
          setError({ isError: true, errorMsg: message });
          Swal.fire({
            icon: "warning",
            title: "failed",
            text: "Recipe gagal ditambah",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  };

  console.log(message);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 mx-auto col-xs-12">
          <h3 className="text-center">Add Your Recipe </h3>
          <div className={` mt-3 mb-5 h-100`}>
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
                      required
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
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <div className={style.formControl}>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      placeholder="category"
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </div>
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
                <div className="mb-3">
                  <label className="form-label">Video</label>
                  <div className={style.formControl}>
                    <input
                      type="file"
                      className="form-control form-control-lg"
                      id="name"
                      placeholder="video"
                      onChange={(e) => setVideo(e.target.files[0])}
                      required
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
        <Navigation />
      </div>
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
      class="form-control mb-3"
      id="title"
      placeholder="Title"
    />
    <input
      type="text"
      class="form-control mb-3"
      id="Category"
      placeholder="Category"
    />
    <textarea
      class="form-control mb-3"
      id="exampleFormControlTextarea1"
      rows="6"
      placeholder="Ingredients"
    ></textarea>
    <div class="mb-3">
      <label for="formFile" class="form-label">
        Upload Image
      </label>
      <input class="form-control" type="file" id="formFile" />
    </div>
    <div class="mb-3">
      <label for="formFileMultiple" class="form-label">
        Upload Video
      </label>
      <input class="form-control" type="file" id="formFileMultiple" multiple />
    </div>
    <div class=" w-100 ">
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
