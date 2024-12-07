import React, { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { useAuth } from "../../ContextAuth/ContextAuth";
import axios from "axios";
import UserProfile from "./UserProfile";
import logoimg from "./logimg.jpg";
import api from "../../libs/axiosInstance";

const LoginSlide = ({ handleLoginClose, openLogin }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Track whether we're in signup or login
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the form is submitting
  const [dotAnimation, setDotAnimation] = useState(""); // Manage the dot animation
  const { login, logout, isAuthenticated } = useAuth(); // Get login function from context

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
    setIsSubmitting(true); // Start submitting
    setLoading(true); // Show loading animation

    api
      .post("/auth/login", { email, password }, { withCredentials: true })
      .then((response) => {
        const token = response?.data?.token; // Extract token from response
        const userData = response?.data?.user; // Extract user data from response
        login(token, userData); // Save token and user data in context
        setTimeout(() => {
          handleLoginClose(); // Close login after 1 second
          setDotAnimation(""); // Reset dot animation
        }, 1000);
      })
      .catch((error) => {
        console.error("Login failed", error);
        setIsSubmitting(false); // Stop submitting
        setLoading(false); // Stop loading
      });
  };

  // SIGNUP FUNCTION
  const signupUser = (email, password, fullName) => {
    setIsSubmitting(true); // Start submitting
    setLoading(true); // Show loading animation

    api
      .post("/auth/register", {
        email,
        password,
        fullName,
      })
      .then((response) => {
        const userData = { email, fullName }; // Add more user data as needed
        // Store the details in context and then switch to login
        setTimeout(() => {
          setIsSignup(false); // Switch to login page after 3 seconds
          setIsSubmitting(false); // Stop submitting
          setLoading(false); // Stop loading
          setDotAnimation(""); // Reset dot animation
        }, 3000);
      })
      .catch((error) => {
        console.error("Signup failed", error);
        setIsSubmitting(false); // Stop submitting
        setLoading(false); // Stop loading
      });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { email, password, fullName } = e.target;

    // Save the user details and toggle to login view
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
      }, 500); // Change the dot animation every 500ms
    }
    return () => clearInterval(interval); // Clear the interval when loading is false
  }, [loading]);

  return (
    <div>
      {openLogin && (
        <div className="bg-black fixed bg-opacity-10 z-10 backdrop-blur-md h-[100%] top-0 left-0 w-full text-black">
          <div
            className={`bg-white md:w-[400px] z-10 absolute left-0 top-0 h-screen w-[100%] px-3 py-4 transition-transform duration-300 ease-in-out ${
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
                      <h1 className="text-[25px] font-bold my-4">
                        Join the FTL Family!
                      </h1>
                      <p className="text-[14px] md:text-[15px] text-gray-600 text-center">
                        Join FTL and step into a world of style! 🛍️ Sign up now
                        to discover the latest trends, exclusive offers, and
                        personalized shopping experiences. Your journey to
                        redefining your wardrobe starts here. ✨"
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
                        value={userDetails.fullName} // Bind input to fullName in state
                        onChange={handleInputChange}
                        className="py-2 bg-gray-50 outline-none  px-4"
                      />

                      <label className="font-bold text-[15px] font-mono my-2">
                        Email Address
                      </label>
                      <input
                        name="email"
                        placeholder="Email Address"
                        type="email"
                        required
                        value={userDetails.email} // Bind input to email in state
                        onChange={handleInputChange}
                        className="py-2 bg-gray-50 outline-none  px-4"
                      />

                      <label className="font-bold text-[15px] font-mono my-2">
                        Password
                      </label>
                      <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        required
                        value={userDetails.password} // Bind input to password in state
                        onChange={handleInputChange}
                        className="py-2 bg-gray-50 outline-none  px-4"
                      />

                      <button
                        className="bg-black p-2 text-white rounded my-4 cursor-pointer "
                        type="submit"
                        disabled={loading || isSubmitting} // Disable if loading or submitting
                      >
                        {loading ? <>Signing Up{dotAnimation}</> : "Sign Up"}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* LOGIN */
                  <div className="flex flex-col items-center text-center">
                    <img src={logoimg} className="w-[120px]" alt="Logo" />
                    <h1 className="text-[25px] font-bold my-4">
                      Welcome Back 👕!
                    </h1>
                    <p className="text-[14px] md:text-[15px] text-gray-600">
                      We’re thrilled to have you here. Find your style, refresh
                      your wardrobe, and enjoy exclusive deals!
                    </p>
                    <strong className="mb-5">
                      ✨ Shop now and redefine your look.
                    </strong>
                  </div>
                )}
              </h1>
              <RiCloseLargeLine
                className="md:text-[25px] absolute top-5 right-4 text-[24px] cursor-pointer"
                onClick={handleLoginClose}
              />
            </div>

            {/* Render UserProfile if authenticated, else show login/signup */}
            {isAuthenticated ? (
              <UserProfile />
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
                      value={userDetails.email} // Bind input to email in state
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
                      value={userDetails.password} // Bind input to password in state
                      onChange={handleInputChange}
                      className="py-2 bg-gray-50 outline-none px-4"
                    />

                    <div className=" mt-4 flex flex-col">
                      <button
                        className="bg-black p-2 text-white rounded mt-4 mb-2 cursor-pointer"
                        type="submit"
                        disabled={loading || isSubmitting} // Disable if loading or submitting
                      >
                        {loading ? <>Logging In{dotAnimation}</> : "Login"}
                      </button>
                      <a className="cursor-pointer text-red-500 hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                  </form>
                ) : null}

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
