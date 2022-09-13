import React from "react";
import style from "../styles/Login.module.css";
import Link from "next/link";
import axios from "axios";

function Register() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState({
    isError: false,
    errorMsg: "",
  });

  const handleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .post("/api/auth/register", { username, email, password })
        .then((respose) => {
          dispatch({
            type: Type.SET_AUTH,
            payload: {
              token: respose?.data?.token,
              user: respose?.data?.user,
            },
          });

          router.replace("/home");
        })
        .catch(({ response }) => {
          const message = response?.data?.message;
          setError({ isError: true, errorMsg: message });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  };

  return (
    <div className="container" style={{backgroundColor:"#F8F8F8"}}>
      <div className="row">
        {/* Side Right */}
        <div className="col-md-4 mx-auto col-xs-12">
          <div className={`${style.margin} mx-2`}>
            {/* Login Title */}
            <div className="mt-5 mb-5">
              <h4 className="text-center">Let’s Get Started !</h4>
              <p className="text-center">Create new account to access all feautures </p>
            </div>

            {/* Error Alert */}
            {error?.isError && (
              <div className={style.alert}>
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <strong></strong>
                  <br />
                  <span>{error?.errorMsg ?? "Something wrong !"}</span>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() =>
                      setError({
                        isError: false,
                        errorMsg: "",
                      })
                    }
                  ></button>
                </div>
              </div>
            )}
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
              >
                {/* Username Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Username
                  </label>
                  <div className={style.formControl}>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="username"
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                  <div className={style.formControl}>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      placeholder="Your Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className={style.formControl}>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Your password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid ">
                  <button
                    type="submit"
                    className="btn btn-warning btn-lg"
                    onClick={handleRegister}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Register"}
                  </button>
                </div>

                <div className="mx-auto mt-2 text-center">
                  <p>
                    Already have an account ?{" "}
                    <Link href="/login" passHref>
                      <a>Sign In</a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
