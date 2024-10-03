import { BsSearch } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState("");
  const path = useLocation().pathname;
  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-6 py-4 md:px-[200px]">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">Blog Market</Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-0 px-3">
          <p
            className="cursor-pointer"
            onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
          >
            <BsSearch />
          </p>
          <input
            className="outline-none px-3"
            type="text"
            placeholder="Search a post"
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-3 md:space-x-6">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div className="md:hidden text-lg" onClick={showMenu}>
        <p className="cursor-pointer">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
