import logo from "~/assets/Pokedex-icon.png";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logo_layout}>
      <img src={logo} className={styles.logo_image} alt="Logo" />
    </div>
  );
}
