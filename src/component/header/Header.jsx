import logo from "../../Assets/logo-mobile.svg";
import styles from "../header/header.module.css";
import addTaskIcon from "../../Assets/icon-add-task-mobile.svg";
import verticalEllipseIcon from "../../Assets/icon-vertical-ellipsis.svg";
import { useSelector } from "react-redux";
import { useState } from "react";
import TaskModal from "../modal/TaskModal";
function Header() {
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  console.log(selectedBoard);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className={`${styles.headerContainer}`}>
      <div className={`${styles.logoContainer}`}>
        <img src={logo} alt="Kanban logo" />
        <h1>Kanban</h1>
      </div>
      <div className={`${styles.boardHeader}`}>
        <h1 className={styles.boardName}>
          {selectedBoard.length > 0
            ? `${selectedBoard[0].name}`
            : "platform launch"}
        </h1>
        <div className={styles.btnContainer}>
          <button
            className={styles.addTaskBtn}
            disabled={selectedBoard.length === 0}
            onClick={() => {
              console.log("clicked!");
              setIsOpen(!isOpen);
            }}
          >
            <img src={addTaskIcon} alt="+ symbol icon" />
            <span>Add New Task</span>
          </button>
          <img
            src={verticalEllipseIcon}
            alt="vertical ellipse icon"
            className={styles.icon}
          />
        </div>
      </div>
      {isOpen && <TaskModal setIsOpen={setIsOpen} isOpen={isOpen} />}
    </header>
  );
}

export default Header;
