import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "./Nav.module.css";
import { useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useAuthValues } from "../../context/Authentication.context";

function Nav() {
  const { isLoggedIn, signOutUser } = useAuthValues();

  return (
    <>
      <nav>
        <div className={styles.nav_container}>
          <Link className={styles.logoLink} to="/">
            <div className={styles.nav_logo_wrapper}>
              <h3>BusyBuy</h3>
            </div>
          </Link>
          <div className={styles.nav_details}>
            {isLoggedIn ? (
              <div>
                <NavLink className={styles.navLink} to="/orders">
                  My Orders
                </NavLink>

                <NavLink className={styles.navLink} to="/cart">
                  <BsHandbag /> Cart
                </NavLink>

                <NavLink
                  onClick={() => signOutUser()}
                  className={`${styles.navLink} ${styles.logoutLink}`}
                >
                  <MdLogout />
                  Signout
                </NavLink>
              </div>
            ) : (
              <NavLink
                className={`${styles.navLink} ${styles.logoutLink} ${styles.signinLink}`}
                to="/signIn"
              >
                <MdLogin />
                SignIn
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      <ToastContainer autoClose={3000} />
      <Outlet />
    </>
  );
}

export default Nav;
