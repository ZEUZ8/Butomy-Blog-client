import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { GetUserBlogs, DeleteBlog } from "../Api/services/blog";
import Post from "./Post";
import EditBlog from "./EditBlog";
import Loader from "./loader/Loader";
import "./home.css"

const Profile = () => {
  const token = useSelector((state) => state?.userLogin);

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(false);

  const deleteBlog = async (id) => {
    setLoading(true)
    try {
      const response = await DeleteBlog(currentBlog._id, token.token);
      setUpdate(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Blog Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
      setBlogs(response.data?.remainingBlogs);
      setLoading(false)
    } catch (error) {
      console.log(error, "erro at blog deleting");
    }
  };
  const getAllUserBlogs = async () => {
    setLoading(true);
    const response = await GetUserBlogs(token?.id, token?.token);
    if (response.status === 202) {
      const data = response?.data?.result;
      setBlogs(data);
      setLoading(false);
    } else {
      console.log("No blog");
    }
  };

  const handleUpdate = (data) => {
    setUpdate(true);
    setCurrentBlog(data);
  };

  useEffect(() => {
    getAllUserBlogs();
  }, [currentBlog]);

  const handleData = (id) => {
    setBlogs((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="w-full grid m-0 ">
        <Navbar  profile={true}/>
      </div>

      <div className="grid-container">
        {blogs.map((data) => {
          return (
            <>
              <div onClick={() => handleUpdate(data)}>
                <Post key={data.id} data={data} auther={true} />
              </div>
            </>
          );
        })}
      </div>

      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
      {update && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <EditBlog
            setUpdate={setUpdate}
            currentBlog={currentBlog}
            setCurrentBlog={setCurrentBlog}
            deleteBlog={deleteBlog}
          />
        </div>
      )}
    </>
  );
};

export default Profile;
