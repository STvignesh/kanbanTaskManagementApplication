import { useState } from "react";
import styles from "../modal/createBoardModal.module.css";

function BoardColumn({ column, handleRemove, errors }) {
  const [boardValue, setBoardValue] = useState(column.name);
  //   console.log(boardValue);
  return (
    <div key={column.id} className={styles.boardColumn}>
      <div>
        <input
          type="text"
          name="Task Type"
          className={`${styles.boardNameInput} ${styles.inputWidth} ${
            !boardValue && errors ? styles.inputError : ""
          }`}
          value={boardValue}
          onChange={(e) => {
            setBoardValue(e.target.value);
          }}
        />
        {!boardValue && errors && (
          <span className={`${styles.error} ${styles.errorPlace}`}>
            {errors}
          </span>
        )}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.crossIcon}
        viewBox="0 0 16 16"
        onClick={() => handleRemove(column.id)}
      >
        <g fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
}

export default BoardColumn;
