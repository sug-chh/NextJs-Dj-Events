import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, error } = useContext(AuthContext);

  useEffect(() => error && toast.error(error))

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    register({ username, email, password });
  }
  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register{" "}
        </h1>{" "}
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username"> User Name </label>{" "}
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />{" "}
          </div>{" "}
          <div>
            <label htmlFor="email"> Email Address </label>{" "}
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </div>{" "}
          <div>
            <label htmlFor="password"> Password </label>{" "}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
          </div>{" "}
          <div>
            <label htmlFor="confirmPassword"> Confirm Password </label>{" "}
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />{" "}
          </div>{" "}
          <input type="submit" value="Register" className="btn" />
        </form>{" "}
        <p>
          Already have an account ? <Link href="/account/login"> Login </Link>{" "}
        </p>{" "}
      </div>{" "}
    </Layout>
  );
}
