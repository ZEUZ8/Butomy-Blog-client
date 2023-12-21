import React from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-[#434343] w-full">
        <div class="max-w-screen-xl flex flex-wrap items-center  justify-between mx-auto p-2">
          <a
            href="http://localhost:5173"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img class="w-[200px] lg-[177px]  pt-1 object-contain" src="https://www.butomy.com/frontend/img/logo-white.png"></img>
          </a>
          <p onClick={()=>navigate("/profile")}>Profile</p>
        </div>
      </nav>
      
    </>
  );
};

export default Navbar;
