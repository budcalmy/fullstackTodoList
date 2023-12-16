import { createSelector } from "@reduxjs/toolkit";

export const selectTodos = (state) => state.todosReducer.data;