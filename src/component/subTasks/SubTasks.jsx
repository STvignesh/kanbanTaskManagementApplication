import { useState } from "react";
import styles from "../modal/taskModal.module.css";

function SubTasks({ task, handleRemove, errors }) {
  const [taskName, setTaskName] = useState(task.title);
  task.title = taskName;

  return (
    <div key={task.id} className={styles.boardColumn}>
      <div>
        <input
          type="text"
          name="Task Type"
          className={`${styles.boardNameInput} ${styles.inputWidth} ${
            !taskName && errors ? `${styles.inputError}` : ""
          }`}
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        />
        {!taskName && errors && (
          <span className={`${styles.error} ${styles.errorPlace}`}>
            {errors}
          </span>
        )}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.crossIcon}
        viewBox="0 0 16 16"
        onClick={() => handleRemove(task.id)}
      >
        <g fillRule="evenodd">
          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
        </g>
      </svg>
    </div>
  );
}

export default SubTasks;
