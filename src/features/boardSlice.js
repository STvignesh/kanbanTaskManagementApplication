import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  boards: [],
  selectedBoard: [],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    createBoard(state, action) {
      state.boards.push({
        name: action.payload.name,
        isActive: false,
        columns: action.payload.columns,
        id: action.payload.id,
      });
    },
    selectBoard(state, action) {
      const selected = state.boards.filter((board) => {
        return board.id === action.payload.id;
      });
      state.selectedBoard = selected;
      state.selectedBoard[0].isActive = true;
      state.boards.forEach((board) => {
        if (state.selectedBoard[0].id !== board.id) board.isActive = false;
      });
    },
    createTask(state, action) {
      state.selectedBoard[0].columns.forEach((column) => {
        if (column.name === action.payload.status)
          column.tasks.push({
            title: action.payload.title,
            description: action.payload.description,
            status: action.payload.status,
            subtasks: action.payload.subtasks,
          });
      });
    },
  },
});

export const { createBoard, selectBoard, createTask } = boardSlice.actions;
export default boardSlice.reducer;
