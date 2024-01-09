import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiFillDashboard } from "react-icons/ai";
import { FaMoneyCheck } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import Style from "./dashboardLeftSide.module.css";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";

const DashboardLeftSide = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("");
  const [open, setOpen] = useState(false);

  // Collect path name and show the active button
  useEffect(() => {
    const { pathname } = router;
    setActiveItem(pathname);
  }, [router]);

  // Logout button
  const handleLogout = () => {
    Cookies.remove("TOKEN_LOGIN");
    // localStorage.removeItem("user-info");
    router.push("/");
  };

  return (
    <>
      {/* Dashboard Header */}
      <DashboardHeader open={open} setOpen={setOpen} />

      {/* Dashboard Left Side bar */}
      <div
        className={`${Style.sidebar} ${open ? Style.active : null}`}
        id="side_nav"
      >
        <div
          className={`${Style.headerBox}  px-3 pt-3 pb-4 d-flex justify-content-between`}
        >
          <button
            className="btn d-md-none d-block close-btn px-1 py-0 text-white"
            onClick={() => setOpen(false)}
          >
            <FaBars />
          </button>
        </div>
        <ul className="list-unstyled px-2">
          <li className="">
            <Link
              href="/dashboard"
              className={`${Style.link} ${
                activeItem === "/dashboard" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <AiFillDashboard className="me-1" /> Dashboard
            </Link>
          </li>
          <li className="">
            <Link
              href="/dashboard/previousDoing"
              className={`${Style.link} ${
                activeItem === "/dashboard/previousDoing" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <MdCategory className="me-1" /> Previous Doing
            </Link>
          </li>
          <li className="">
            <Link
              href="/dashboard/todayDoing"
              className={`${Style.link} ${
                activeItem === "/dashboard/todayDoing" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <FaMoneyCheck className="me-1" /> Today&apos;s Doing
            </Link>
          </li>

          <li className="">
            <Link
              href="/dashboard/pending"
              className={`${Style.link} ${
                activeItem === "/dashboard/resign" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <CgProfile className="me-1" /> Pending Orders
            </Link>
          </li>
          <li className={`${Style.link} px-3 py-2`} onClick={handleLogout} style={{cursor: "pointer"}}>
            <FiLogOut className="me-1" /> Log out
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardLeftSide;
