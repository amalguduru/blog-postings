import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from "../components/Comment";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { IF } from "../url";

const PostDetails = () => {
  const postId = useParams().id;
  const [posts, setPosts] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [postId]);

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPosts(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async () => {
    try {
      const newComment = {
        comment: comment,
        author: user.username,
        postId: postId,
        userId: user._id,
      };
      const res = await axios.post(URL + "/api/comments/write/", newComment, {
        withCredentials: true,
      });
      fetchPostComments();
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="h-[80vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl text-black font-bold">
              {posts.title}
            </h1>
            {user?._id === posts?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate("/edit/" + postId)}
                >
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-2 md:mt-4">
            <p>@{posts.username}</p>
            <div className="flex justify-center items-center space-x-2 md:space-x-4">
              <p>06/16/2023</p>
              <p>11:45</p>
            </div>
          </div>
          <img
            src={IF + posts.photo}
            alt="Blog pic"
            className="w-full mx-auto mt-8"
          />
          <p className="mx-auto mt-8">{posts.desc}</p>

          {/* Categories */}
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {posts.categories?.map((c, i) => (
                <div key={i} className="bg-gray-400 px-3 py-1 rounded-lg">
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col mt-4s">
            <h3 className="font-semibold mt-6 mb-4">Comments:</h3>
            {/* Comments */}
            {comments?.map((c) => (
              <Comment key={c._id} c={c} postUserId={posts.userId} />
            ))}
          </div>

          {/* Write a comment */}
          <div className="flex flex-col md:flex-row mt-4 space-x-2">
            <input
              type="text"
              placeholder="Write a comment"
              className="md:w-[85%] px-4 py-2 mt-4 md:mt-0 outline-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={postComment}
              className="md:w-[15%] bg-black text-white rounded-lg py-2 mt-4 md:mt-0 px-4"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
