import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "./loader/Loader";
import { GetAllBlog, BlogCreate } from "../Api/services/blog";
import { useSelector } from "react-redux";
import { FaImage } from "react-icons/fa";
import { MdCloudDone } from "react-icons/md";
import { convertToBase64 } from "../utils/base64";
import Navbar from "./Navbar";

import Post from "./Post";
import "./home.css";

const Home = () => {
  const containerRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emptyBlog, setemptyBlog] = useState(false);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");

  const token = useSelector((state) => state?.userLogin);
  // const navigate = useNavigate();

  const getAllBlogs = async () => {
    try{
      setLoading(true);
      const response = await GetAllBlog();
      if (response.status === 202) {
        setBlogs(response?.data?.result);
      } else {
        setemptyBlog(true)
      }
    }catch(error){
      console.log(error,' error at finding all blogs')
      Swal.fire({
        title: "Blog Empty ?",
        // text: "?",
        icon: "question"
      });
    }finally{
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if(!title && !summary && !content && !image){
      Swal.fire({
        title: "Blog Empty ?",
        icon: "question"
      });
    }else{
      const response = await BlogCreate(
        {
          id: token?.id,
          title: title,
          content: content,
          img: image,
          summary: summary,
        },
        token?.token
      );
      if (response.status === 201) {
        setTitle("");
        setContent("");
        setSummary('');
        setImage("");
        // message.success("blog posted");
        handleCollapse();
        setBlogs((prevBlogs) => [response?.data?.blogDoc, ...prevBlogs]);
        setLoading(false);
      } else {
        // message.warning("something went wrong");
        setContent("");
        setTitle("");
      }
    }
  };

  //section for handling the Collaps of the div that contain the inputs
  const handleExpand = () => {
    setExpanded(true);
  };
  const handleCollapse = () => {
    setExpanded(false);
  };
  const handleOutsideClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      handleCollapse();
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  useEffect(() => {
    console.log(token,' the token consoling ')
    getAllBlogs();
  }, []);

  return (
    <>
      <div className="w-full grid m-0 ">
        <Navbar profile={false}/>
      </div>

      <div className="m-6 flex justify-center" onClick={handleOutsideClick}>
        <div
          className="items-center  flex justify-center flex-col border rounded-lg border-white w-[40%]"
          ref={containerRef}
        >
          <div className={image && `m-0 p-0`}>
            {image && (
              <label htmlFor="file-upload" className="custom-file-upload ">
                <img src={image} alt="" />
              </label>
            )}
            <input
              className="m-5"
              type="file"
              label="image"
              name="myFile"
              id="file-upload"
              accept=".jpg, .png, .jpeg"
              onChange={(e) => handleFileUpload(e)}
            />
            {/* <img
            className="h-full w-full object-cover py-2 rounded-lg"
            src="https://images.unsplash.com/photo-1660648127319-3f071bbac474?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt="Add an image"
          /> */}
          </div>
          <input
            onFocus={handleExpand}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`p-4  w-full bg-[#242424] text-white rounded-sm`}
            placeholder="Title "
            style={{ outline: "none", ":focus": { outline: "none" } }}
          />
          {expanded && (
            <>
              <input
                onFocus={handleExpand}
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className={`p-4  w-full bg-[#242424] text-white rounded-sm`}
                placeholder="summary "
                style={{ outline: "none", ":focus": { outline: "none" } }}
              />
              <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="px-4 w-full bg-[#242424] text-white rounded-sm"
                placeholder="Take a Note.."
                style={{ outline: "none", ":focus": { outline: "none" } }}
              />
              <div className="flex flex-row gap-5 m-3">
                <div>
                  <label htmlFor="file-upload">
                    <FaImage />
                  </label>
                </div>
                <MdCloudDone onClick={!loading && handleSubmit} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* <div className="items-center m-6 grid">
        <input type="text" className="p-2 border-0"  placeholder="tuype somting "  />
        <input type="text" className="p-2" placeholder="Take a Note.." style={{focus:{outline:"none"}}}/>
      </div> */}

      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
    {emptyBlog &&(
         <div className="fixed top-0 left-0 right-0 bottom-0 text-rose-500 flex items-center justify-center ">
          No Blog Found
       </div>
    )}
      <div onClick={handleOutsideClick} className=" grid-container" >
        {blogs.map((data) => {
          return <Post key={data._id} data={data} auther={false} />;
        })}
      </div>
    </>
  );
};

export default Home;
