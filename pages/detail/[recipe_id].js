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

export default function Detail() {
  const dispatch = useDispatch();
  const [change, setChange] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState("first");
  const [data, setData] = React.useState([]);
  const router = useRouter();
  const { auth } = useSelector((state) => state);
  const decodeUser = decode(auth?.token);
  const user_id = decodeUser?.id;
  console.log(user_id);

  const {
    query: { recipe_id },
  } = router;

  console.log(recipe_id);
  const [dataComment, setDataComment] = React.useState([]);
  const [comment, setComment] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    console.log(recipe_id);
    axios.get(`http://localhost:8000/recipes/${recipe_id}`).then((res) => {
      setData(res?.data?.data ?? []);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  console.log("ini", data)

  useEffect(() => {
    getComment();
  }, []);

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

  const handleSelect = (eventKey) => {
    setCurrentTab("second");
  };
  const handleClick = (e) => {
    e.preventDefault();
    setChange(false);
  };
  const handleClick2 = (e) => {
    e.preventDefault();
    setChange(true);
  };

  const handleComment = () => {
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
      })
      .catch((err) => {
        console.log(err);
      });
    getComment();
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(dataComment);

  return (
    <div id="home" className="container ">
      {data?.map((item) => (
        <div className="col-lg-4 mx-auto col-sm" key={item?.recipe_id}>
          <div className={`${style.container} `}>
            <Image
              className={style.imagebackground}
              src={`http://localhost:8000/images/${item?.image}`}
              width="100%"
              height="75px"
              // style={{ objectFit: "cover" }}
              alt="image"
              layout="responsive"
            />
            <div className={`${style.card}  w-100 `}>
              <Link href="/profile" passHref>
                <div className="mt-3 mx-3 text-white fs-5 ">
                  <BsArrowLeft />
                </div>
              </Link>
              <div
                className={`${style.margin} d-flex justify-content-between text-white `}
              >
                <div className=" ">
                  <h3 className="text-white mx-3">{item?.name}</h3>
                  <small className="mx-3">by {item?.username}</small>
                </div>
                <div className={`${style.like} d-flex mt-3 fs-2 mx-2`}>
                  <BsBookmark
                    className={`${style.icon} mx-2 bg-warning`}
                    onClick={handleSave}
                  />
                  <AiOutlineLike
                    className={`${style.icon}  bg-warning`}
                    onClick={handleLike}
                  />
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
                          {item?.ingredients}{" "}
                        </p>
                      </div>
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
                        <div className="d-flex justify-content-center">
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
                    <div className={`${style.video} mt-4 mx-4`}>
                      <div className="container">
                        <div className="row">
                          <div className="col-3 mt-2 mb-2">
                            <button type="button" className="btn btn-warning">
                              <BsPlay className="fs-2 text-white" />
                            </button>
                          </div>
                          <div className="col-8 mt-2 ">Step 1</div>
                        </div>
                      </div>
                    </div>
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
