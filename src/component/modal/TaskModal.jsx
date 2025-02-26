import { useRef, useState } from "react";
import styles from "../modal/taskModal.module.css";
import ReactDom from "react-dom";
import SubTasks from "../subTasks/SubTasks";
import { v4 as uuidv4 } from "uuid";
import Button from "../button/Button";
import DropDown from "../statusDropdown/dropdown/DropDown";
import DropDownItem from "../statusDropdown/dropDownItem/DropDownItem";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../features/boardSlice";
import { createSelector } from "@reduxjs/toolkit";
function TaskModal({ setIsOpen, isOpen }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [subTasks, setSubTasks] = useState([
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
    },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);
  const [selectStatus, setSelectStatus] = useState("");
  const inputRef = useRef(null);
  const descriptionRef = useRef(null);
  const [errors, setErrors] = useState();
  const [open, setOpen] = useState(false);
  const status = useSelector(
    createSelector(
      (state) => state.board.selectedBoard[0].columns,
      (columns) => columns.map((column) => column.name)
    )
  );

  const dispatch = useDispatch();

  function handleRemoveTask(id) {
    setSubTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }
  function handleAddNewTask(e) {
    e.preventDefault();
    setSubTasks((prevtask) => [
      ...prevtask,
      { title: "", id: uuidv4(), isCompleted: false },
    ]);
  }
  function selectStatusFunc(inputStat) {
    setSelectStatus(status.filter((stat) => stat === inputStat)[0]);
    setOpen(false);
  }

  function handleCreateTask(e) {
    e.preventDefault();
    const isValid = handleValidation();
    console.log("before validation");
    if (!isValid) return;
    console.log("after validation ");
    console.log("subtasks", subTasks);
    dispatch(
      createTask({
        title: taskName,
        description,
        status: selectStatus,
        subtasks: subTasks,
      })
    );
    setIsOpen(false);
  }

  function handleValidation() {
    let errorMsg = "";
    setErrors(null);
    subTasks.some((task) => {
      if (!task.title.trim()) {
        console.log("task title:", task.title);
        errorMsg = "Can't be Empty";
      }
    });
    if (!taskName.trim() || !selectStatus) {
      console.log("here is the issue from task name or selectStatus");
      errorMsg = "Can't be Empty";
    }

    if (errorMsg) {
      setErrors(errorMsg);
      return false;
    }
    return true;
  }

  return ReactDom.createPortal(
    <>
      <div className={styles.overlay} onClick={() => setIsOpen(!isOpen)}></div>
      <div className={styles.taskModalContainer}>
        <div className={styles.taskModalheader}>
          <h3>Add new Task</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.crossIcon}
            viewBox="0 0 16 16"
            onClick={() => setIsOpen(false)}
          >
            <g fillRule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </div>
        <form>
          <div className={styles.taskNameContainer}>
            <label htmlFor="boardName" className={styles.taskLabel}>
              Board Name
            </label>
            <div className={styles.inputContainer}>
              <input
                ref={inputRef}
                type="text"
                name="board name"
                id="boardName"
                value={taskName}
                onChange={() => setTaskName(inputRef.current.value)}
                className={`${styles.taskNameInput} ${
                  errors && !taskName ? `${styles.inputError}` : ""
                }`}
                placeholder="e.g Take a coffee break"
              />{" "}
              {!taskName && errors && (
                <span className={styles.error}>{errors}</span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="description" className={styles.taskLabel}>
              Description
            </label>
            <textarea
              ref={descriptionRef}
              name="description"
              id="description"
              className={styles.descriptionBox}
              value={description}
              onChange={() => {
                setDescription(descriptionRef.current.value);
              }}
            ></textarea>
          </div>
          <div>
            <label className={styles.taskLabel}>Sub Tasks</label>
            <div className={styles.boardColumns}>
              {subTasks.length > 0 &&
                subTasks.map((task, index) => (
                  <SubTasks
                    task={task}
                    handleRemove={handleRemoveTask}
                    errors={errors}
                    key={index}
                  />
                ))}
            </div>
          </div>
          <Button onClick={handleAddNewTask}>+ Add new task</Button>
          <div>
            <label className={styles.taskLabel}>Current Status</label>
            <div>
              <div className={`${styles.statusContainer}`}>
                <DropDown
                  open={open}
                  setOpen={setOpen}
                  error={errors}
                  selectStatus={selectStatus}
                  buttonText={selectStatus ? selectStatus : "Select Status"}
                  content={
                    <>
                      {status.map((item, index) => (
                        <DropDownItem key={index} onClick={selectStatusFunc}>
                          {item}
                        </DropDownItem>
                      ))}
                    </>
                  }
                />
                {!selectStatus && errors && (
                  <span className={styles.error}>Choose one</span>
                )}
              </div>
            </div>
          </div>
          <Button onClick={handleCreateTask}>create task</Button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
}
export default TaskModal;
