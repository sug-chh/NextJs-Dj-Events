import Link from "next/link";
import styles from "@/styles/Header.module.css";
import SearchBox from "./Search";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">DJ Events</Link>
      </div>
      <SearchBox />
      <nav>
        <ul>
          <li>
            <Link href="/events">Events</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">Add Events</Link>
              </li>
              <li>
                <Link href="/account/dashboard">DashBoard</Link>
              </li>
              <li>
                <button
                  className="btn-secondary btn-icon"
                  onClick={() => logout()}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
