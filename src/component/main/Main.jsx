import SideBar from "../sidebar/SideBar";
import Board from "../board/Board";
import styles from "../main/main.module.css";

function Main() {
  return (
    <div className={styles.mainContainer}>
      <SideBar />
      <Board />
    </div>
  );
}
export default Main;
