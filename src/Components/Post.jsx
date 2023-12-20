import React from "react";

const Post = ({data}) => {
  return (
    <>
      <div class="group relative m-10 h-96 w-96 overflow-hidden rounded-lg shadow-md bg-gray-700">
        <div class="absolute left-0 top-0 h-full w-full transition-all duration-300 ease-in-out group-hover:-top-96">
          <img
            class="h-4/6 w-full object-cover"
            src="https://images.unsplash.com/photo-1660648127319-3f071bbac474?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
          />
          <h1 class="mt-4 px-4 text-center font-serif text-xl font-semibold text-rose-500">
            {data?.title}
          </h1>
          <p class="mt-1 px-4 text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam,
            saepe.
          </p>
        </div>

        <div class="absolute left-0 -bottom-96 flex h-full w-full flex-col justify-center transition-all duration-300 ease-in-out group-hover:bottom-0">
          <h1 class="mb-2 px-8 text-center font-serif text-xl font-semibold text-rose-500">
            Portugal's Hot Baloon Festival
          </h1>
          <p class="px-8 text-center">
           {data.content}
          </p>
        </div>
      </div>
    </>
  );
};

export default Post;
