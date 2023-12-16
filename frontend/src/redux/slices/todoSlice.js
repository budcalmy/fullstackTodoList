import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null,
    size: 0,
    error: null,
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todosSet: (state, action) => {
      state.data = action.payload;
      state.size = action.payload.length;
      state.error = null;
    },
    addTodo: (state, action) => {
        state.data = [...state.data].concat(action.payload);
        state.size += 1;
        state.error = null;
    },
    removeTodo: (state, action) => {
      state.data = state.data.filter(todo => todo._id !== action.payload);
      state.size -= 1;
      state.error = null;
    }
  },
})

export const { todosSet, addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;