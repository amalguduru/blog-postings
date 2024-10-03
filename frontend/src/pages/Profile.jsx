import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [updated, setUpdated] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    if (user && user._id) {
      try {
        const res = await axios.get(URL + "/api/users/" + user._id);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchUserDetails();
      fetchUserPosts();
    }
  }, [user?._id]);

  const handleUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const res = await axios.delete(URL + "/api/users/" + user._id, {
      withCredentials: true,
    });
    setUser(null);
    navigate("/");
  };

  const fetchUserPosts = async () => {
    const res = await axios.get(URL + "/api/posts/user/" + user._id, {
      withCredentials: true,
    });
    setPosts(res.data);
    console.log(res.data);
  };

  return (
    <div className="">
      <Navbar />
      <div className="mt-8 px-8 md:px-[200px] flex flex-col-reverse md:flex-row">
        <div className="flex flex-col md:w-[70%] w-full md:h-[80vh]">
          <h1 className="font-bold text-xl mb-2 mt-8 md:mt-0">Your posts:</h1>
          {posts.length > 0 ? (
            posts?.map((post) => (
              <Link key={post._id} to={`/posts/post/${post._id}`}>
                <ProfilePosts key={post._id} post={post} />
              </Link>
            ))
          ) : (
            <h3 className="font-bold text-lg text-red-400 text-center mt-[200px]">
              You don't have any posts yet. Time to publish a blog now!
            </h3>
          )}
        </div>
        <div className="md:sticky md:top-12 flex flex-col space-y-4 w-full md:w-[30%] md:items-end md:ml-5">
          <div className="flex flex-col">
            <h1 className="font-bold text-xl mb-4 items-start">Profile</h1>
            <input
              type="text"
              placeholder="Your username"
              className="px-4 py-2 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex items-center mt-8 space-x-4">
              <button
                onClick={handleUpdate}
                className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-black text-white px-4 py-2 rounded-md font-semibold hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-600 text-sm mt-4">
                User updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
