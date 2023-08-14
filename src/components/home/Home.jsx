import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../redux/slices/appConfigSlice";

function Home() {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);
  return (
    <>
      <Navbar />
      <div className="mt-[72px] px-5 md:px-8 lg:px-12 xl:px-16">
        <Outlet />
      </div>
    </>
  );
}

export default Home;
