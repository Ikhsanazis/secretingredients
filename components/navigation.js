import Link from "next/link";
import { BsChat, BsPerson } from "react-icons/bs";
import { AiOutlinePlusSquare, AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { decode } from "jsonwebtoken";
import Swal from "sweetalert2";
// import { useEffect } from "react";

function Navigationbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { auth } = useSelector((state) => state);
  const decodeUser = decode(auth?.token);
  const id = decodeUser?.id;

  const handleClik = () => {
    Swal.fire({
      icon: "Info",
      title: "Info",
      text: "Feature Coming Soon...",
    });
  };

  const handleNavAdd = () => {
    if (auth?.token == null) {
      Swal.fire({
        icon: "warning",
        title: "Login to Your Account",
        text: "You need to login to add recipe",
      });
    } else {
      router.replace(`/addrecipe`);
    }
  };

  const handleNavProfile = () => {
    if (auth?.token == null) {
      Swal.fire({
        icon: "warning",
        title: "Login to Your Account",
        text: "You have to login to access this page",
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "red",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          router.replace("/login");
        }
      });
    } else {
      router.replace(`/profile`);
    }
  };

  return (
    <>
      <div className="row justify-content-md-center justify-content-lg-center col-lg-4 mx-auto bg-white fixed-bottom">
        <div className=" d-flex justify-content-center">
          <nav
            className="navbar  navbar-expand navbar-light"
            style={{ height: "80px" }}
          >
            <ul className="navbar-nav   nav-justified w-100">
              <Link href="/">
                <li className={``}>
                  <AiOutlineHome className={`mx-4 fs-3`} />
                </li>
              </Link>
              {/* <Link href="/addrecipe"> */}
              <li className={``} onClick={handleNavAdd}>
                <AiOutlinePlusSquare className={`mx-4 fs-3`} /> <br />
              </li>
              {/* </Link> */}
              {/* <Link href="/chat"> */}
              <li className={``} onClick={handleClik}>
                <BsChat className={`mx-4 fs-3`} /> <br />
              </li>
              {/* </Link> */}
              {/* <Link href="/profile"> */}
              <li className={``} onClick={handleNavProfile}>
                <BsPerson className={`mx-4 fs-3`} /> <br />
              </li>
              {/* </Link> */}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
export default Navigationbar;
