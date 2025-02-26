import styles from "../dropdownbuttton/dropDownButton.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const DropDownButton = ({ children, open, toggle }) => {
  return (
    <div className={`${styles.dropDownBtn} `} onClick={toggle}>
      {children}
      <span className={styles.toggleIcon}>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </div>
  );
};

export default DropDownButton;
