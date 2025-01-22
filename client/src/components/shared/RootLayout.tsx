import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

import { Dialogs } from "./dialogs";
import { useAppDispatch } from "@/hooks/redux";
import { useEffect } from "react";
import { getCurrentUserAsync } from "@/store/auth";

const RootLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container pt-24  md:pt-28"></div>
      <Outlet />
      <Dialogs />
    </div>
  );
};

export default RootLayout;
