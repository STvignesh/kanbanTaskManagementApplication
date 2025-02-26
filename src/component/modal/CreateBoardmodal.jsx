import { useRef, useState } from "react";
import styles from "../modal/createBoardModal.module.css";
import ReactDom from "react-dom";
import { v4 as uuidv4 } from "uuid";
import BoardColumn from "../column/BoardColumn";
import Button from "../button/Button";
import { useDispatch } from "react-redux";
import { createBoard } from "../../features/boardSlice";

function CreateBoardmodal({ setOpenModal }) {
  const [boardName, setBoardName] = useState("");
  const [boardColumns, setBoardColumns] = useState([
    { id: uuidv4(), name: "Todo", tasks: [] },
    { id: uuidv4(), name: "Doing", tasks: [] },
    { id: uuidv4(), name: "Done", tasks: [] },
  ]);
  const inputRef = useRef(null);
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();

  //  Validation
  function validateBoardModal() {
    let errorMsg = "";
    setErrors(null);
    boardColumns.some((column) => {
      if (!column.name.trim()) {
        errorMsg = "Can't be Empty";
      }
    });
    if (!boardName.trim()) {
      errorMsg = "Can't be Empty";
    }
    if (errorMsg) {
      setErrors(errorMsg);
      return false;
    }
    return true;
  }

  function handleRemoveColumn(id) {
    console.log(id);
    setBoardColumns((prevColumns) =>
      prevColumns.filter((column) => column.id !== id)
    );
  }
  function handleAddColumn(e) {
    e.preventDefault();
    setBoardColumns((boardColumns) => [
      ...boardColumns,
      { id: uuidv4(), tasks: [], name: "" },
    ]);
  }

  function handleCreateBoard(e) {
    e.preventDefault();
    const isValid = validateBoardModal();
    if (!isValid) return;
    console.log("clicked");
    dispatch(
      createBoard({
        name: boardName,
        columns: boardColumns,
        id: uuidv4(),
      })
    );

    setOpenModal(false);
  }

  // console.log("error", errors);
  return ReactDom.createPortal(
    <>
      <div
        className={styles.modalOverlay}
        onClick={() => {
          setOpenModal(false);
        }}
      ></div>
      <div open className={styles.boardModalContainer}>
        <div className={styles.boardModalheader}>
          <h3>Add new board</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.crossIcon}
            viewBox="0 0 16 16"
            onClick={() => setOpenModal(false)}
          >
            <g fillRule="evenodd">
              <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
              <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
            </g>
          </svg>
        </div>
        <form>
          <div className={styles.boarNameContainer}>
            <label htmlFor="boardName" className={styles.boardLabel}>
              Board Name
            </label>
            <div className={styles.inputContainer}>
              <input
                ref={inputRef}
                type="text"
                name="board name"
                id="boardName"
                value={boardName}
                onChange={() => setBoardName(inputRef.current.value)}
                className={`${styles.boardNameInput} ${
                  errors && !boardName ? `${styles.inputError}` : ""
                }`}
                placeholder="e.g Web Development"
              />{" "}
              {!boardName && errors && (
                <span className={styles.error}>{errors}</span>
              )}
            </div>
          </div>
          <div>
            <label className={styles.boardLabel}>Board Columns</label>
            <div className={styles.boardColumns}>
              {boardColumns.length > 0 &&
                boardColumns.map((column) => (
                  <BoardColumn
                    column={column}
                    key={column.id}
                    handleRemove={handleRemoveColumn}
                    errors={errors}
                  />
                ))}
            </div>
            <Button type="button" onClick={handleAddColumn}>
              + add new column
            </Button>
            <Button type="submit" onClick={handleCreateBoard}>
              create new board
            </Button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default CreateBoardmodal;
