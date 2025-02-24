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
  },
});

export const { createBoard, selectBoard } = boardSlice.actions;
export default boardSlice.reducer;
