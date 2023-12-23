import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../Redux/userStore";

const Navbar = ({ profile }) => {
  const token = useSelector((state) => state?.userLogin?.token);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try{
      dispatch(setLogout())
      console.log(token, 'the token consoling after the logout')
    }catch(error){
      console.log(error, 'error in logout section')
    }
  }

  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-[#434343] w-full">
        <div class="max-w-screen-xl flex flex-wrap items-center  justify-between mx-auto p-2">
          <a
            href="http://localhost:5173"
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              class="w-[200px] lg-[177px]  pt-1 object-contain"
              src="https://www.butomy.com/frontend/img/logo-white.png"
            ></img>
          </a>
          <div className="flex gap-5">
            <p
              onClick={() => navigate("/")}
              className={`cursor-pointer ${!profile && `text-rose-500`}`}
            >
              Blogs
            </p>
            <span>{"|"}</span>
            <p
              onClick={() => token ? navigate("/profile") : navigate("/login")}
              className={`cursor-pointer ${profile && `text-rose-500`}`}
            >
              My Blogs
            </p>
            {token && (
              <>
                <span>{"|"}</span>
                <p
                  onClick={handleLogout}
                  className={`cursor-pointer ${profile && `text-rose-500`}`}
                >
                  LogOut
                </p>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
