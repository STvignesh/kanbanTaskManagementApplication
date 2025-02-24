import styles from "../button/button.module.css";

function Button({ children, onClick, type }) {
  return (
    <button type={type} className={styles.btn} onClick={(e) => onClick(e)}>
      {children}
    </button>
  );
}

export default Button;
