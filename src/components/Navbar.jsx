import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_links}>
        <li>
          <a href="#" className={styles.nav_link}>
            Weathy
          </a>
        </li>
        <li>
          <a href="#" className={styles.nav_link}>
            Linkedin
          </a>
        </li>
        <li>
          <a href="#" className={styles.nav_link}>
            Twitter
          </a>
        </li>
        <li>
          <a href="#" className={styles.nav_link}>
            Instagram
          </a>
        </li>
        <li>
          <a href="#" className={styles.nav_link}>
            Github
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
