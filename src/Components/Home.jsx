import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllBlog,BlogCreate } from "../Api/services/blog";
import { useSelector } from "react-redux";
import { FaImage } from "react-icons/fa";
import { MdCloudDone } from "react-icons/md";
import Navbar from "./Navbar";
import Post from "./Post";

const Home = () => {
  const containerRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = useSelector((state) => state?.userLogin);
  // const navigate = useNavigate();

  const getAllBlogs = async () => {
    setLoader(true);
    const response = await GetAllBlog();
    if (response.status === 202) {
      const data = response.data;
      // if (token) {
      //   setBlogs(data.result);
      // } else {
      //   const firstPart = data.result.slice(0, 3);
      //   setBlogs(firstPart);
      // }
      // setBlogs(response?.data?.)
      setBlogs(response?.data?.result);
      setLoader(false);
    } else {
      console.log("No blog");
    }
  };
  console.log(token.id,' theid ih the outside')
  const handleSubmit = async () => {
    console.log(token.id,' the id')
    const response = await BlogCreate({ id:token?.id,title: title, content: content },token?.token);
    if (response.status === 201) {
      setTitle("")
      setContent("")
      // message.success("blog posted");
      setBlogs((prevBlogs) => [...prevBlogs, response?.data?.blogDoc]);
    } else {
      // message.warning("something went wrong");
      setContent("");
      setTitle("");
    }
  };

  //section for handling the Collaps of the div that contain the inputs
  const handleExpand = () => {
    setExpanded(true);
  };
  const handleCollapse = () => {
    setExpanded(false);
    console.log("cliked outside the div");
  };
  const handleOutsideClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      handleCollapse();
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <div className="w-full grid m-0 ">
        <Navbar />
      </div>

      <div className="m-6 flex justify-center" onClick={handleOutsideClick}>
        <div
          className="items-center  flex justify-center flex-col border rounded-lg border-white w-[40%]"
          ref={containerRef}
        >
          <div className={image && `w-[30%] h-[200px] m-0 p-0`}>
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
            onChange={(e)=>setTitle(e.target.value)}
            className={`p-4  w-full bg-[#242424] text-white rounded-sm`}
            placeholder="Title "
            style={{ outline: "none", ":focus": { outline: "none" } }}
          />
          {expanded && (
            <>
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
                  <FaImage />
                </div>
                <MdCloudDone onClick={handleSubmit} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* <div className="items-center m-6 grid">
        <input type="text" className="p-2 border-0"  placeholder="tuype somting "  />
        <input type="text" className="p-2" placeholder="Take a Note.." style={{focus:{outline:"none"}}}/>
      </div> */}

      <div onClick={handleOutsideClick} className="flex">
        {blogs.map((data) => {
          return <Post key={data.id} data={data} auther={false}/>
        })}
      </div>
    </>
  );
};

export default Home;
