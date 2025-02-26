import styles from "../dropDownItem/dropDownItem.module.css";

function DropDownItem({ children, onClick }) {
  return (
    <div className={styles.dropDownItem} onClick={() => onClick(children)}>
      {children}
    </div>
  );
}

export default DropDownItem;
