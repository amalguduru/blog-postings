import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import { URL } from "../url";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username,
        email,
        password,
      });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 md:px-[200px]">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blog Market</Link>
        </h1>
        <h3>
          <Link to="/login">Login</Link>
        </h3>
      </div>
      <div className="flex justify-center items-center w-full h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 md:w-[25%] w-[80%]">
          <h1 className="text-xl font-bold">Create an account</h1>
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-black text-white w-full px-4 py-2 text-lg font-bold rounded-lg"
            onClick={handleRegister}
          >
            Register
          </button>
          {error && (
            <h3 className="text-red-500 text-sm">Something went wrong!</h3>
          )}
          <div className="flex space-x-3 justify-center items-center">
            <p>Already have an account?</p>
            <p className="text-blue-500 hover:text-black cursor-pointer">
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
