import { useTheme } from "../../../hooks/useTheme";
import IconButton from "../../UI/IconButton/IconButton";
import SunIcon from "../../Icons/SunIcon";
import MoonIcon from "../../Icons/MoonIcon";
import GithubIcon from "../../Icons/GithubIcon";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { isDark, toggle } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img src="/favicon-96x96.png" alt="Offline GPT logo" className={styles["header-logo"]} />
        <span className={styles.title}>Offline GPT</span>
      </div>

      <div className={styles.right}>
        <a
          href="https://github.com/isanjaymaurya/offline-gpt"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={styles.iconButton}
        >
          <GithubIcon />
        </a>

        <IconButton
          onClick={toggle}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
          className={`${styles.iconButton} ${styles.ml12}`}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </div>
    </header>
  );
}