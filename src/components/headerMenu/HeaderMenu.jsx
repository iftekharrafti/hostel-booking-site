/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Style from "./headerMenu.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const HeaderMenu = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [cookies, setCookies] = useState(null);

  useEffect(() => {
    const storedCookies = Cookies.get("loginCookie");
    setCookies(storedCookies);
  }, []);

  // Collect path name and show the active button
  useEffect(() => {
    const { pathname } = router;
    setActiveItem(pathname);
  }, [router]);

  return (
    <Navbar collapseOnSelect sticky="top" expand="lg" className={Style.navbar}>
      <Container>
        <Navbar.Brand className={Style.menuBrand}>
          <Link href="/">
            {/* <img
              className={Style.logo}
              src="/duclub.png"
              alt=""
              onClick={() => setExpanded(false)}
            /> */}
            NR HOSTEL
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav" in={expanded}>
          <Nav
            className={`${Style.nav} ms-auto justify-content-end d-flex menu-right p-0`}
          >
            {/* Home Link */}
            <Nav>
              <Link
                href="/"
                onClick={() => setExpanded(false)}
                className={`${activeItem === "/" ? Style.active : ""} ${
                  Style.link
                }`}
              >
                Home
              </Link>
            </Nav>
            {cookies ? (
              <Nav>
                <Link
                  href="/dashboard"
                  onClick={() => setExpanded(false)}
                  className={`${
                    activeItem === "/dashboard" ? Style.active : ""
                  } ${Style.link}`}
                >
                  Dashboard
                </Link>
              </Nav>
            ) : (
              <>
                <Nav>
                  <Link
                    href="/login"
                    onClick={() => setExpanded(false)}
                    className={`${
                      activeItem === "/login" ? Style.active : ""
                    } ${Style.link}`}
                  >
                    Login
                  </Link>
                </Nav>
                <Nav>
                  <Link
                    href="/registration"
                    onClick={() => setExpanded(false)}
                    className={`${
                      activeItem === "/registration" ? Style.active : ""
                    } ${Style.link}`}
                  >
                    Registration
                  </Link>
                </Nav>
                <Nav>
                  <Link
                    href="/privacy"
                    onClick={() => setExpanded(false)}
                    className={`${
                      activeItem === "/privacy" ? Style.active : ""
                    } ${Style.link}`}
                  >
                    Privacy Policy
                  </Link>
                </Nav>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderMenu;
