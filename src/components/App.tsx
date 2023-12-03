import { useState } from "react";
import styles from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";

export const App = () => {
  const [ctr, setCtr] = useState(0);
  const handler = () => {
    setCtr((prev) => prev + 1);
  };

  return (
    <>
      <Link to={"/about"}>about</Link>
      {" | "}
      <Link to={"/shop"}>shop</Link>
      <div className={styles.value}>{ctr}</div>
      <button className={styles.button} onClick={handler}>
        check
      </button>
      <Outlet />
    </>
  );
};
