import React from "react";
import axios from "axios";
import style from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

function Category() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState([]);

  React.useEffect(() => {
    axios.get(`https://sweettooth-app.herokuapp.com/newrecipe`).then((res) => {
      setData(res?.data?.data ?? []);
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    });
  }, []);
  console.log(data);

  return (
    <>
      <section className={style.popularForYou}>
        <h3 className="mb-3">Popular for You</h3>

        <div className="row">
          {[
            {
              name: "Soup",
              image: "/image/icon1.png",
              link: "/category/Soup",
            },
            {
              name: "Chicken",
              image: "/image/icon2.png",
              link: "/category/Chicken",
            },
            {
              name: "Seafood",
              image: "/image/icon3.png",
              link: "/category/Seafood",
            },
            {
              name: "Dessert",
              image: "/image/icon4.png",
              link: "/category/Dessert",
            },
          ].map((item) => (
            <Link href={item.link} passHref key={item.name}>
              <div className="col-3" key={item.name}>
                <div className="d-flex justify-content-center">
                  <Image
                    src={item?.image}
                    alt="icon"
                    width="70px"
                    height="70px"
                  />
                </div>
                <p className="text-center">{item?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
export default Category;
