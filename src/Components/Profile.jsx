import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { GetUserBlogs } from "../Api/services/blog";
import Post from "./Post";
import EditBlog from "./EditBlog";

const Profile = () => {

    const token = useSelector((state) => state?.userLogin);

    const [loading,setLoading] = useState(false)
    const [blogs,setBlogs] = useState([])
    const [update,setUpdate] = useState(false)
    const [currentBlog,setCurrentBlog] = useState(false)

    const getAllUserBlogs = async () => {
        console.log('ame')
        setLoading(true);
        const response = await GetUserBlogs(token?.id,token?.token);
        if (response.status === 202) {
          const data = response?.data?.result;
          console.log(data,' the dat')
          setBlogs(data);
        setLoading(false);
        } else {
          console.log("No blog");
        }
    };

    const handleUpdate = (data)=>{
        setUpdate(true)
        setCurrentBlog(data)
    }

    console.log(currentBlog,'the currnet blog')
    useEffect(()=>{
        getAllUserBlogs()
    },[])

  return (
    <>
      <div className="w-full grid m-0 ">
        <Navbar />
      </div>

      <div className="flex" >
        {blogs.map((data) => {
          return (
            <>
            <div onClick={()=>handleUpdate(data)} >

             <Post key={data.id} data={data} auther={true} />
            </div>
            </>
          )
        })}
      </div>

      

      {update && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" >
              <EditBlog setUpdate={setUpdate} currentBlog={currentBlog} setCurrentBlog={setCurrentBlog}/>
            </div>
          )}
    </>
  );
};

export default Profile;
