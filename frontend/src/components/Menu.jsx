import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await axios.get(URL + "/api/auth/logout", {
      withCredentials: true,
    });
    setUser(null);
    navigate("/");
  };
  return (
    <div className="bg-black z-10 w-[200px] flex flex-col items-start absolute top-12 right-8 rounded-md p-4 space-y-4 cursor-pointer">
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to="/login">Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to="/register">Register</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to={"/profile/" + user._id}>Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to="/write">Write</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to="/myBlogs">My blogs</Link>
        </h3>
      )}
      {user && (
        <h3
          className="text-white text-sm hover:text-gray-500"
          onClick={handleLogout}
        >
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;
