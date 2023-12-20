import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginAPI, RegisterAPI } from "../Api/services/auth";
import { validateLogin, validateRegister } from "../utils/validation";
import {setLogin} from "../Redux/userStore"
import { useDispatch } from "react-redux";
const Register = ({ page }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setErrorMessage = (msg) => {
    setErrMsg(msg);

    setTimeout(() => {
      setErrMsg("");
    }, 3000);
  };

  console.log(errMsg, " the message");

  const handleLogin = async (e) => {
    e.preventDefault();
    const validate = validateLogin({ setErrMsg, password, email });
    console.log(validate, "Validation");
    if (!validate) return;
    try {
      const response = await LoginAPI({ email: email, password: password });
      console.log(response, " the response");
      if (response.status === 201) {
        const result = response.data;
        // message.success(`welcome ${result.dispatch.name}`);
        dispatch(setLogin(result?.dispatch));
        navigate("/");
      } else {
        setUsername("");
        setPassword("");
        setErrorMessage(response.msg);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.msg)
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validate = validateRegister({ setErrMsg, email, username, password });
    console.log(validate,' validation')
    if (!validate) return;
    try {
      const response = await RegisterAPI({ email, username, password });
      if (response.status === 201) {
        // message.success("register success");
        navigate("/login");
      } else {
        setPassword("");
        setUsername("");
        setEmail("");
        setErrorMessage(response.msg);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.msg)
      // console.log(error.response.data)
      // message.error(error.response.data.response);
      console.log(error);
    }
  };

  const handleNavigation = () => {
    if (page === "register") {
      navigate("/login");
    } else {
      navigate("/signup", { replace: true });
    }
  };
  return (
    <>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="https://www.butomy.com/"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* <img
              class="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            /> */}
          <img
            class="w-[200px] lg-[177px]  pt-1 object-contain"
            src="https://www.butomy.com/frontend/img/logo-white.png"
          ></img>
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#3c3c3c] dark:border-[#1b1b1b]">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {page === "register" ? `Create and account` : "Login"}
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              {page === "register" && (
                <div>
                  <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#606060] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
              )}
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#606060] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#606060] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              {/* <div>
                  <label
                    for="confirm-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#606060] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div> */}
              {/* <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div> */}
                {errMsg ? <div className="text-red-600 font-semibold text-sm">{errMsg}</div> : ""}
              <button
                // type="submit"
                onClick={page === "register" ? handleRegister : handleLogin}
                class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {page === "register" ? `Create an account` : `Login`}
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                {page === "register"
                  ? `Already have an account?${" "}`
                  : `Don't have an account? ${" "}`}
                <a
                  onClick={handleNavigation}
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {page === "register" ? ` Login here` : ` SignUp here`}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
