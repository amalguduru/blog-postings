import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Loader from "../components/Loader";
import HomePosts from "../components/HomePosts";
import { URL } from "../url";

const myBlogs = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchPosts();
  }, [search]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {isLoading ? (
          <div className="h-[40vh] flex items-center justify-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts?.map((post) => (
            <Link key={post._id} to={`posts/post/${post._id}`}>
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="font-bold text-lg text-red-400 text-center mt-[300px]">
            You don't have any posts yet. Time to publish a blog now!
          </h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default myBlogs;
