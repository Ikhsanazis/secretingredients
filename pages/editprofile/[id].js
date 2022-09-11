import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { decode } from "jsonwebtoken";
import Axios from "axios";
// import { useRouter } from "next/router";

const EditProfile = () => {
//   const { auth } = useSelector((state) => state);
//   const decodeUser = decode(auth?.token);
//   const id = decodeUser?.id;
  const [isloading, setIsloading] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setaAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [postCode, setPostCode] = React.useState("");
  const [placeholder, setPlaceholder] = React.useState([]);

//   const router = useRouter();

  React.useEffect(() => {
    getPlaceholder();
  }, []);
  const getPlaceholder = async (req, res) => {
    await Axios.get(
      `https://bug-hunter-squad.herokuapp.com/profile/`
    ).then((res) => {
      setPlaceholder(res?.data);
    });
  };

  const handleUpdate = () => {
    setIsloading(true);
    setTimeout(() => {
      Axios.patch(`https://bug-hunter-squad.herokuapp.com/profile/${id}`, {
        email: email,
        name: name,
        phoneNumber: phoneNumber,
        country: address,
        city: city,
        postCode: postCode,
      })
        .then(() => {
          Swal.fire({
            title: "Update success",
            width: 389,
            icon: "success",
          });
          router.push("/profile");
        })
        .catch((err) => {
          const msg = err?.data.message;
          Swal.fire({
            title: msg,
            width: 389,
            icon: "error",
          });
        })
        .finally(() => {
          setIsloading(false);
        });
    }, 3000);
  };

  return (
    <>
      <div className="container p-2 h-100 col-lg-4 mx-auto">
        <div className="container h-100">
          <div className="row row-cols-1 p-2">
            <div className="col w-100">
              <div className="row row-cols-2">
                {/* <Link href="/editprofile"> */}
                <a href="/profile" className="col-sm-8 fw-semibold back-button">
                  <IoChevronBack />
                </a>
                {/* </Link> */}
              </div>
            </div>
            <div className="col mt-3">
              <div>
                <p className="fw-bold fs-4">Edit Profile</p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                <div className="mb-3">
                  <input
                    type="email"
                    className=" input w-100"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder={
                      placeholder?.email ? placeholder.email : "Email"
                    }
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className=" input w-100"
                    placeholder={placeholder?.name ? placeholder.name : "Name"}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="phoneNumber"
                    className=" input w-100"
                    placeholder={
                      placeholder?.phoneNumber
                        ? placeholder.phoneNumber
                        : "Phone Number"
                    }
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className=" input w-100"
                    placeholder={placeholder?.city ? placeholder.city : "City"}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className=" input w-100"
                    placeholder={
                      placeholder?.country ? placeholder.country : "Country"
                    }
                    onChange={(e) => setaAddress(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className=" input w-100"
                    placeholder={
                      placeholder?.postCode ? placeholder.postCode : "Post Code"
                    }
                    onChange={(e) => setPostCode(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 p-2 clr-primer "
                >
                  {isloading ? "Updating" : "Update"}
                </button>
              </form>
              <div className="text-center p-2">
                <a href="/forgot" className="link">
                  Reset Password
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
