import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaImage } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Navbar from "./Navbar";
import Post from "./Post";

const Home = () => {
  const containerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(null);

  const token = useSelector((state) => state?.userLogin?.token);
//   const navigate = useNavigate();
 
  const getAllBlogs = async () => {
    console.log("still not blinking");
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
    console.log("remember me");
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
            className={`p-4  w-full bg-[#242424] text-white rounded-sm`}
            placeholder="Title "
            style={{ outline: "none", ":focus": { outline: "none" } }}
          />
          {expanded && (
            <>
              <textarea
                type="text"
                className="px-4 w-full bg-[#242424] text-white rounded-sm"
                placeholder="Take a Note.."
                style={{ outline: "none", ":focus": { outline: "none" } }}
              />
              <div className="flex flex-row gap-5 m-3">
                <div>
                  <FaImage />
                </div>
                <IoIosCloseCircleOutline />
              </div>
            </>
          )}
        </div>
      </div>

      {/* <div className="items-center m-6 grid">
        <input type="text" className="p-2 border-0"  placeholder="tuype somting "  />
        <input type="text" className="p-2" placeholder="Take a Note.." style={{focus:{outline:"none"}}}/>
      </div> */}

      <div onClick={handleOutsideClick}>
        <Post />
      </div>
    </>
  );
};

export default Home;
