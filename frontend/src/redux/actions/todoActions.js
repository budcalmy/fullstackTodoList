import axios from "axios";
import { addTodo, removeTodo, todosSet } from "../slices/todoSlice";

export const getTodos = () => async (dispatch) => {
    const todos = await axios.get(`http://localhost:3333/todos`).then((res) => res.data);
    dispatch(todosSet(todos));
};

export const setTodo = (todo) => async (dispatch) => {
    const res = axios.post(`http://localhost:3333/todos`, todo).then((res) => {
        dispatch(addTodo(res.data));
        return res;
    });

    return res ? true : false;
}

export const deleteTodo = (todoId) => async (dispatch) => {
    axios.delete(`http://localhost:3333/todos?_id=${todoId}`).then(() => {
        dispatch(removeTodo(todoId));
    }
)}
