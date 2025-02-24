import logo from "../../Assets/logo-mobile.svg";
import styles from "../header/header.module.css";
import addTaskIcon from "../../Assets/icon-add-task-mobile.svg";
import verticalEllipseIcon from "../../Assets/icon-vertical-ellipsis.svg";
import { useSelector } from "react-redux";
function Header() {
  const selectedBoard = useSelector((state) => state.board.selectedBoard);
  console.log(selectedBoard);
  function handleCreateTask() {
    console.log("clicked");
  }
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
            onClick={handleCreateTask}
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
    </header>
  );
}

export default Header;
