import Link from "next/link";
import { TbBrandBooking } from "react-icons/tb";
import { BsChat,BsPerson } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePlusSquare, AiOutlineHome} from "react-icons/ai";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Navigationbar() {
  return (
    <>
      <div
        className={`col-lg-4 container mobile px-1 text-center fixed-bottom bg-white`}
      >
        <div className="row  justify-content-md-center justify-content-lg-center">
          <div className=" d-flex justify-content-center">
            <nav
              className="navbar  navbar-expand navbar-light"
              style={{ height: "80px" }}
            >
              <ul className="navbar-nav  nav-justified w-100">
                <Link href="/home">
                  <li className={` `}>
                    <AiOutlineHome className={`mx-4 fs-3`} />
                  </li>
                </Link>
                <Link href="/addrecipe">
                  <li className={``}>
                    <AiOutlinePlusSquare className={`mx-4 fs-3`}/> <br />
                  </li>
                </Link>
                <Link href="/chat">
                  <li className={``}>
                    <BsChat className={`mx-4 fs-3`}/> <br />
                  </li>
                </Link>
                <Link href="/profile">
                  <li className={``}>
                    <BsPerson className={`mx-4 fs-3`} /> <br />
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navigationbar;
