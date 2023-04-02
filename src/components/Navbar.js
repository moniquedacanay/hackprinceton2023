import React from "react";
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div ><img src="/logo.jpg" style={{width:"80px",height:"80px"}}/></div>
      <div className={styles.name}>Sustain-a-bite</div>
    </nav>
  );
};

export default Navbar;
