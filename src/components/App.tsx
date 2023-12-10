import { useState } from "react";
import styles from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import pngIcon from "@/assets/icons8-book-50.png";
import SvgIcon from "@/assets/circle-heat-svgrepo-com.svg";

const getPlatform = () => {
  if (__PLATFORM__ === "mobile") {
    return <span>Is mobile platform</span>;
  } else if (__PLATFORM__ === "desktop") {
    return <span>Is desktop platform</span>;
  }
};

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
      <h1 data-testid="App.Platform">PLATFORM {getPlatform()}</h1>
      <div>
        <img src={pngIcon} alt="" />
      </div>
      <div>
        <SvgIcon width={70} height={70} style={{ color: "red" }} />
      </div>
      <div className={styles.value}>{ctr}</div>
      <button className={styles.button} onClick={handler}>
        check
      </button>
      <Outlet />
    </>
  );
};
