import { useSelector } from "react-redux";
import styles from "../board/board.module.css";

function Board() {
  const columns = useSelector((state) => state.board.selectedBoard[0]?.columns);
  console.log("columns", columns);
  return <section className={styles.boardContainer}></section>;
}
export default Board;
