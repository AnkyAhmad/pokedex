import styles from "./DefaultLayout.module.css";

export default function DefaultLayout({ children }) {
  return (
    <div className={styles.background_color}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
