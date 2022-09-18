import React, { useEffect } from "react";
import style from "../../styles/Detail.module.css";
import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsPlay } from "react-icons/bs";
import { Tab, Col, Nav, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import Link from "next/link";
import axios from "axios";
import Commentlist from "../../components/comment";
import Swal from "sweetalert2";

export default function Detail() {
  const dispatch = useDispatch();
  const [change, setChange] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState("first");
  const [data, setData] = React.useState([]);
  const router = useRouter();
  const [dataComment, setDataComment] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const [isLoading, setIsLoading] = React.useState([]);
  const { auth } = useSelector((state) => state);
  const decodeUser = decode(auth?.token);
  const user_id = decodeUser?.id;
  console.log("user_id", user_id);

  const {
    query: { recipe_id },
  } = router;

  console.log(recipe_id);

  useEffect(() => {
    // console.log(user_id);
    axios.get(`http://localhost:8000/${recipe_id}`).then((res) => {
      setData(res?.data?.data ?? []);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [recipe_id]);

  console.log("ini", auth?.token);
  console.log("profile", data?.image);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/comments/${recipe_id}`)
      .then((res) => {
        setDataComment(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [recipe_id]);

  const getComment = () => {
    axios
      .get(`http://localhost:8000/comments/${recipe_id}`)
      .then((res) => {
        setDataComment(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleComment = () => {
    //   Swal.fire({
    //     icon: "warning",
    //     title: "Login to Your Account",
    //     text: "You have to login to access this page",
    //     showCancelButton: true,
    //     confirmButtonColor: "blue",
    //     cancelButtonColor: "red",
    //     confirmButtonText: "Login",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       router.replace("/login");
    //     }
    //   });
    setIsLoading(true);
    axios
      .post(`http://localhost:8000/comments/add/${user_id}/${recipe_id}`, {
        comment,
        user_id,
        recipe_id,
      })
      .then((res) => {
        setIsLoading(false);
        getComment();
        Swal.fire({
          icon: "success",
          title: "Comment Added",
          text: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "warning",
          title: "failed",
          text: "You Need To Login",
        });
      });
    getComment();
    // }
  };

  const handleLike = () => {
    setIsLoading(true);
    axios
      .post(`http://localhost:8000/like/${user_id}/${recipe_id}`, {
        user_id,
        recipe_id,
      })
      .then((res) => {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "You Liked this Recipe",
          text: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSave = () => {
    setIsLoading(true);
    axios
      .post(`http://localhost:8000/save/${user_id}/${recipe_id}`, {
        user_id,
        recipe_id,
      })
      .then((res) => {
        setIsLoading(false);
        Swal.fire({
          icon: "success",
          title: "You Saved this Recipe",
          text: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("test", dataComment);
  console.log(data);

  return (
    <div id="home" className="">
      {data?.map((item) => (
        <div className="col-lg-4 mx-auto col-sm" key={item?.recipe_id}>
          <div className={`${style.container} `}>
            <Image
              className={style.imagebackground}
              src={`http://localhost:8000/images/${item?.image}`}
              width="100%"
              height="75px"
              alt="image"
              layout="responsive"
            />
            <div className={`${style.card}  w-100 `}>
              <Link href="/" passHref>
                <button type="button" className="btn btn-warning mt-3 mx-3">
                  <BsArrowLeft className="fs-4 text-white" />
                </button>
              </Link>
              <div
                className={`${style.margin} d-flex justify-content-between `}
              >
                <div
                  className=" "
                  style={{
                    justifyContent: "start",
                    marginLeft: "15px",
                    color: "#fff",
                    textShadow: "1px -1px 7px rgba(0,0,0,1)",
                  }}
                >
                  <h3 className=" ">{item?.name}</h3>
                  <small className=" ">By {item?.username}</small>
                </div>
                <div className={`d-flex mt-3 fs-2 mx-2`}>
                  <button
                    type="button"
                    className="btn btn-warning mt-1 "
                    style={{ borderRadius: "50%" }}
                    onClick={handleSave}
                  >
                    <BsBookmark className={`fs-3 text-white`} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning mt-1 mx-2"
                    style={{ borderRadius: "50%" }}
                    onClick={handleLike}
                  >
                    <AiOutlineLike className={`fs-3 text-white  `} />
                  </button>
                </div>
              </div>
            </div>
            <div className={`${style.background} `}>
              <Tab.Container
                defaultActiveKey="first"
                activeKey={currentTab}
                onSelect={(key) => setCurrentTab(key)}
              >
                <Nav variant="" className="nav" align="left">
                  <Nav.Item>
                    <Nav.Link className={style.tabs} eventKey="first">
                      Ingredients
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className={style.tabs} eventKey="second">
                      video
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className={`${style.ingredients} mt-4 mb-3 mx-4 `}>
                      <div className="mx-2 row">
                        <p className={`${style.text} mt-3 `}>
                          {item?.ingredients}
                        </p>
                      </div>
                      {user_id == item?.user_id ? (
                        <div className="text-end">
                          <Link href={`/editrecipe/${recipe_id}`} passHref>
                            <small style={{ cursor: "pointer" }}>
                              Edit Recipe
                            </small>
                          </Link>
                        </div>
                      ) : null}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleComment();
                        }}
                      >
                        <textarea
                          type="text"
                          className="form-control form-control-lg mt-3"
                          id="inputEmail"
                          placeholder="Comment"
                          rows="3"
                          onChange={(e) => setComment(e.target.value)}
                          required
                        ></textarea>
                        <div className="d-flex justify-content-center mt-2">
                          <button
                            type="submit"
                            className="btn btn-warning  mt-2 mb-3 col-6 "
                            onClick={handleComment}
                            disabled={isLoading}
                          >
                            {isLoading ? "Sending" : "Send"}
                          </button>
                        </div>
                      </form>
                      <Commentlist data={dataComment} />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    {[item?.video].map((e) => (
                      <div className={`${style.video} mt-4 mx-4`} key={e}>
                        <div className="container">
                          <div className="row">
                            <div className="col-3 mt-2 mb-2">
                              <Link href={`/video/${e}`}>
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                >
                                  <BsPlay className="fs-2 text-white" />
                                </button>
                              </Link>
                            </div>
                            <div className="col-8 mt-2 ">Step 1</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
