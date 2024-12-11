import React, { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useAuth } from "../../ContextAuth/ContextAuth";
import axios from "axios";
import UserProfile from "./UserProfile";
import logoimg from "./logimg.jpg";
import api from "../../libs/axiosInstance";

const LoginSlide = ({ handleLoginClose, openLogin }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dotAnimation, setDotAnimation] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const { login, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (openLogin) {
      setShowMenu(true);
    } else {
      const timer = setTimeout(() => setShowMenu(false), 300);
      return () => clearTimeout(timer);
    }
  }, [openLogin]);

  // Handle input changes for email, password, and fullName
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // LOGIN FUNCTION
  const loginUser = (email, password) => {
    setIsSubmitting(true);
    setLoading(true);
    setErrorMessage(""); // Reset error message before each login attempt

    api
      .post("/auth/login", { email, password }, { withCredentials: true })
      .then((response) => {
        const token = response?.data?.token;
        const userData = response?.data?.user;
        login(token, userData);
        setTimeout(() => {
          handleLoginClose();
          setDotAnimation("");
        }, 1000);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setLoading(false);
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message); // Display error from server
        } else {
          setErrorMessage("email or password not correct.");
        }
      });
  };

  // SIGNUP FUNCTION
  const signupUser = (email, password, fullName) => {
    setIsSubmitting(true);
    setLoading(true);
    setErrorMessage(""); // Reset error message before each signup attempt

    api
      .post("/auth/register", { email, password, fullName })
      .then((response) => {
        setTimeout(() => {
          setIsSignup(false);
          setIsSubmitting(false);
          setLoading(false);
          setDotAnimation("");
        }, 3000);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setLoading(false);
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message); // Display error from server
        } else {
          setErrorMessage("User with same email already exist.");
        }
      });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { email, password, fullName } = e.target;

    setUserDetails({
      email: email.value,
      password: password.value,
      fullName: fullName.value,
    });
    signupUser(email.value, password.value, fullName.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    loginUser(email.value, password.value);
  };

  // Function to handle dot animation
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setDotAnimation((prev) => {
          if (prev === "...") {
            return ".";
          }
          return prev + ".";
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div>
      {openLogin && (
        <div className="bg-black fixed bg-opacity-10 z-10 backdrop-blur-md h-[100%] top-0 left-0 w-full text-black px-2">
          <div
            className={`bg-white md:w-[400px] z-10 
               absolute 
               h-[95%]   w-[90%] rounded-md px-3 py-4 my-4
              transition-transform duration-300 ease-in-out ${
                showMenu
                  ? "transform translate-x-0"
                  : "transform -translate-x-full"
              }`}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-[20px] font-bold">
                {isAuthenticated ? (
                  "Account"
                ) : isSignup ? (
                  <div>
                    {/* SIGNUP */}
                    <div className="flex flex-col items-center">
                      <img src={logoimg} className="w-[120px]" alt="Logo" />
                      <h1 className="text-[20px] font-bold my-4">
                        Join the FTL Family!
                      </h1>
                      <p className="text-[14px] md:text-[15px] text-gray-600 text-center">
                        Join FTL and step into a world of style! 🛍️ Sign up now
                        ✨
                      </p>
                    </div>

                    <form
                      className="flex flex-col"
                      onSubmit={handleSignupSubmit}
                    >
                      <label className="font-bold text-[15px] font-mono my-2">
                        Name
                      </label>
                      <input
                        name="fullName"
                        placeholder="Name"
                        type="text"
                        required
                        value={userDetails.fullName}
                        onChange={handleInputChange}
                        className="py-2 bg-gray-50 outline-none text-[16px] font-light px-4 placeholder:text-[12px]"
                      />

                      <label className="font-bold text-[15px] font-mono my-2">
                        Email Address
                      </label>
                      <input
                        name="email"
                        placeholder="Email Address"
                        type="email"
                        required
                        value={userDetails.email}
                        onChange={handleInputChange}
                        className="py-2 bg-gray-50 outline-none text-[16px] font-light px-4 placeholder:text-[12px]"
                      />

                      <label className="font-bold text-[15px] font-mono my-2">
                        Password
                      </label>
                      <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        required
                        value={userDetails.password}
                        onChange={handleInputChange}
                        className="py-2 bg-gray-50 outline-none text-[16px] font-light px-4 placeholder:text-[12px]"
                      />

                      <button
                        className="bg-black p-2 text-white rounded my-4 cursor-pointer "
                        type="submit"
                        disabled={loading || isSubmitting}
                      >
                        {loading ? <>Signing Up{dotAnimation}</> : "Sign Up"}
                      </button>
                    </form>

                    {/*     {errorMessage && (
                      <div className="text-red-500 text-center mt-4">
                        <p> {errorMessage}</p>
                      </div>
                    )} */}
                  </div>
                ) : (
                  /* LOGIN */
                  <div className="flex flex-col items-center text-center">
                    <img src={logoimg} className="w-[120px]" alt="Logo" />
                    <h1 className="text-[25px] font-bold my-4">
                      Welcome Back 👕!
                    </h1>
                    <p className="text-[14px] md:text-[12px] text-gray-600">
                      We’re thrilled to have you here. Find your style, refresh
                      your wardrobe, and enjoy exclusive deals!
                    </p>
                  </div>
                )}
              </h1>
              <RiCloseLargeLine
                className="md:text-[25px] absolute top-5 right-4 text-[24px] cursor-pointer"
                onClick={handleLoginClose}
              />
            </div>

            {isAuthenticated ? (
              <UserProfile handleLoginClose={handleLoginClose} />
            ) : (
              <div className="flex flex-col">
                {!isSignup ? (
                  <form
                    className="flex flex-col my-2 w-full"
                    onSubmit={handleLoginSubmit}
                  >
                    <label className="font-bold text-[15px] font-mono my-2">
                      Email Address
                    </label>
                    <input
                      name="email"
                      placeholder="Email Address"
                      type="email"
                      required
                      value={userDetails.email}
                      onChange={handleInputChange}
                      className="py-2 bg-gray-50 outline-none px-4"
                    />

                    <label className="font-bold text-[15px] font-mono my-2">
                      Password
                    </label>
                    <input
                      name="password"
                      placeholder="Password"
                      type="password"
                      required
                      value={userDetails.password}
                      onChange={handleInputChange}
                      className="py-2 bg-gray-50 outline-none px-4"
                    />

                    <div className="mt-4 flex flex-col">
                      <button
                        className="bg-black p-2 text-white rounded mt-4 mb-2 cursor-pointer"
                        type="submit"
                        disabled={loading || isSubmitting}
                      >
                        {loading ? <>Logging In{dotAnimation}</> : "Login"}
                      </button>
                      <a className="cursor-pointer text-black underline text-[14px] hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                  </form>
                ) : null}

                {errorMessage && (
                  <div className="text-red-500  text-10px mt-0">
                    <p> {errorMessage}</p>
                  </div>
                )}

                <p className="my-4 text-black">
                  {isSignup ? (
                    <>
                      have an account?{" "}
                      <span
                        className="text-blue-500 hover:text-purple-500 cursor-pointer"
                        onClick={() => setIsSignup((prev) => !prev)}
                      >
                        Login
                      </span>
                    </>
                  ) : (
                    <>
                      don’t have an account?{" "}
                      <span
                        className="text-blue-500 hover:text-purple-500 cursor-pointer"
                        onClick={() => setIsSignup((prev) => !prev)}
                      >
                        Create Account
                      </span>
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSlide;
