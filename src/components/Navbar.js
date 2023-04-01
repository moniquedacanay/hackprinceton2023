import React from "react";
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div ><img src="/logo.png" style={{width:"60px",height:"60px"}}/></div>
      <div className={styles.name}>Budget Bites</div>
    </nav>
  );
};

export default Navbar;
