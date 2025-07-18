import React, { useState } from "react";
import banner from "../../public/Banner.png";
import { useNavigate } from "react-router-dom";

function Banner() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    // Optionally, you can store the email or use it for newsletter signup
    navigate("/signup");
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Hello, welcome here to learn something{" "}
              <span className="text-pink-500">new everyday!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
              Discover the best programming books and courses. Start your journey
              with us and enhance your skills every day!
            </p>
            <form onSubmit={handleGetStarted}>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  className="grow"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </label>
              <button
                type="submit"
                className="btn mt-6 btn-secondary w-full md:w-auto"
              >
                Get Started
              </button>
            </form>
          </div>
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2 flex justify-center items-center">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12 rounded-lg shadow-lg"
            alt="Banner"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
