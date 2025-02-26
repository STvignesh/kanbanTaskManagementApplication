import styles from "../dropDownContent/dropDownContent.module.css";

function DropDownContent({ children, open }) {
  if (!open) return null;
  return (
    <div
      className={`${styles.dropDownContent} ${open ? styles.contentOpen : ""}`}
    >
      {children}
    </div>
  );
}

export default DropDownContent;
