import React from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Post = ({ data }) => {
  return (
    <>
      <div class="group relative m-10 h-96 w-96 overflow-hidden rounded-lg shadow-md bg-gray-700" >
      { data?.img && <div class={data?.img && `absolute left-0 top-0 h-full w-full  transition-all duration-300 ease-in-out group-hover:-top-96`} >
          <img
            class="h-4/6 w-full object-cover"
            src={data?.img}
            alt=""
          />
          <h1 class="mt-4 px-4 text-center font-serif text-xl font-semibold text-rose-500">
            {data?.title}
          </h1>
          <p class="mt-1 px-4 text-center">
            {data.summary}
          </p>
        </div>}

        <div class={`flex h-full w-full flex-col justify-center ${data?.img && ` absolute left-0 -bottom-96 transition-all duration-300 ease-in-out group-hover:bottom-0`}`}>
         {!data?.img && <h1 class="mb-2 px-8 text-center font-serif text-xl font-semibold text-rose-500">
            {data?.title}
          </h1>}
          <h1 class={`mb-2 px-8 text-center font-serif text-xl font-semibold ${data?.img ? `text-rose-500` : `text-white`}`}>
            {data?.summary}
          </h1>
          <p class="px-8 text-center">{data.content}</p>
        </div>

      </div>
    </>
  );
};

export default Post;
