import { Paper, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux/actions/todoActions";

export default function Todo({ text, id }) {

    const dispatch = useDispatch();

    const handleDelete = useCallback(() => {
        dispatch(deleteTodo(id))
    }, [dispatch])

    return (
        <Paper elevation={4} sx={{padding: 2, display: 'flex', alignItems:'center', borderRadius: 4, justifyContent:'space-between'}}>
            <Typography>{text}</Typography>
            <DeleteIcon onClick={handleDelete} sx={{cursor: 'pointer'}}></DeleteIcon>
        </Paper>
    )
}