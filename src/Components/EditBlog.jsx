import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { editBlog } from "../Api/services/blog";
import { useSelector } from "react-redux"; // Add this line

const EditBlog = ({ currentBlog, setCurrentBlog, setUpdate }) => {
  const [title, setTitle] = useState(currentBlog.title);
  const [content, setContent] = useState(currentBlog.content);
  const token = useSelector((state) => state.userLogin.token);

  const handleUpdate = async () => {
    try {
      const response = await editBlog({
        title,
        content,
        id: currentBlog._id,
        token,
      });
      const newtitle = response?.data?.updatedBlog?.title
      setTitle(response.title);
      setContent(response?.data?.updatedBlog?.content);
      let awaiting = response?.data?.updatedBlog
      console.log(awaiting,' teh')
      setCurrentBlog(awaiting);
      setUpdate(false);
    } catch (error) {
      console.log(error);
      console.log("error in the console");
    }
    // setSummary(dataDoc.summary);
  };

  return (
    <>
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[50%] h-[50%]">
        <a
          href="https://www.butomy.com/"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {/* <img
            class="w-[200px] lg-[177px]  pt-1 object-contain"
            src="https://www.butomy.com/frontend/img/logo-white.png"
          ></img> */}
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-[#3c3c3c] dark:border-[#1b1b1b]">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {/* {page === "register" ? `Create and account` : "Login"} */}
            </h1>
            <div className="flex justify-end" onClick={() => setUpdate(false)}>
              <IoCloseSharp />
            </div>
            <div class="space-y-4 md:space-y-6">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="Title"
                  id="Title"
                  placeholder={title}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#606060] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Content
                </label>
                <input
                  type="content"
                  name="content"
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#606060] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  //   placeholder={`${title}`}
                  placeholder={content}
                  required=""
                />
              </div>

              <div>
                <input type="file" />
              </div>

              <div className="flex gap-4">
                <button
                  // type="submit"

                  class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Delete
                </button>
                <button
                  // type="submit"
                  onClick={handleUpdate}
                  class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Update
                </button>
              </div>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                {/* {page === "register"
                  ? `Already have an account?${" "}`
                  : `Don't have an account? ${" "}`} */}
                <a
                  //   onClick={handleNavigation}
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {/* {page === "register" ? ` Login here` : ` SignUp here`} */}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
