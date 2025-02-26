import { useState } from "react";
import styles from "../dropdown/dropDown.module.css";
import DropDownButton from "../dropdownbuttton/DropDownButton";
import DropDownContent from "../dropDownContent/DropDownContent";

const DropDown = ({
  buttonText,
  content,
  open,
  setOpen,
  error,
  selectStatus,
}) => {
  function toggleDropDown() {
    setOpen((open) => !open);
  }

  return (
    <div
      className={`${styles.dropDown} ${
        error && !selectStatus ? `${styles.error}` : ""
      }`}
    >
      <DropDownButton open={open} toggle={toggleDropDown}>
        {buttonText}
      </DropDownButton>
      <DropDownContent open={open}>{content}</DropDownContent>
    </div>
  );
};

export default DropDown;
