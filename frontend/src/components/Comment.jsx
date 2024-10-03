import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL } from "../url";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      const res = await axios.delete(URL + "/api/comments/" + id, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-300 rounded-lg px-2 py-2 my-2">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-700">@{c.author}</h3>
        <div className="flex items-center justify-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
          {user?._id === c.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
                onClick={() => deleteComment(c._id)}
              >
                <MdDelete />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;
