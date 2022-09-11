import React from "react";
import style from "../styles/Login.module.css";
import Link from "next/link";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import * as Type from "../redux/auth/type";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState({
    isError: false,
    errorMsg: "",
  });

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      axios
        .post("http://localhost:8000/login", { email, password })
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
    <div className="container">
      <div className="row">
        <div className="col-md-4 mx-auto col-xs-12">
          <div className={`${style.margin} mx-2`}>
            <div className="mt-5 mb-5">
              <h4 className="text-center">Welcome</h4>
              <p className="text-center">Log in into your exiting account</p>
            </div>

            {error?.isError && (
              <div className={style.alert}>
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Cannot Login</strong>
                  <br />
                  <span>
                    {error?.errorMsg ?? "Something wrong with our server"}
                  </span>
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

            {/* Login Form */}
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
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

                {/* Forget Password */}
                <div className="mb-3 form-check">
                  <p className="text-end">Forget Password ?</p>
                </div>

                {/* Submit Button */}
                <div className="d-grid ">
                  <button
                    type="submit"
                    className="btn btn-warning btn-lg"
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Log in"}
                  </button>
                </div>

                <div className="mx-auto mt-2 text-center">
                  <p>
                    Don’t have an account ?
                    <Link href="/register" passHref>
                      <a>Sign Up</a>
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

export default Login;
