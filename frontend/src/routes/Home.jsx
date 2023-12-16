import ReceiptLong from "@mui/icons-material/ReceiptLong";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Paper,
  Button,
  OutlinedInput,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { selectUserEmail } from "../redux/selectors/userSelector";
import Todo from "../components/Todo";
import { useCallback, useEffect, useState } from "react";
import { getTodos, setTodo } from "../redux/actions/todoActions";
import { selectTodos } from "../redux/selectors/todoSelector";

export const customeStyles = {
  backgroundColor: "#9999CC",
  color: "white",
};

const compareFuntions = {
  byName: (nameA, nameB) => {
    nameA = nameA.toLowerCase();
    nameB = nameB.toLowerCase();
    return nameA < nameB ? -1 : 1;
  },
  byTime: (timeA, timeB) => {
    return timeA < timeB ? 1 : -1;
  },
};

export default function Home() {
  const [todoText, setTodoText] = useState("");

  const email = useSelector(selectUserEmail);

  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleSendTodo = useCallback(() => {
    dispatch(setTodo({ text: todoText, author: email }));
  }, [dispatch, email, todoText]);

  return (
    <Container>
      <AppBar>
        <Toolbar
          sx={{
            backgroundColor: "#CCCCFF",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 1,
              borderRadius: 3,
              bgcolor: "#9999CC",
              color: "white",
            }}
          >
            <Typography fontWeight={"bold"} variant="h6">
              Hello, {email}
            </Typography>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              display: "flex",
              gap: "1vw",
              alignItems: "center",
              padding: 1,
              borderRadius: 3,
              bgcolor: "#9999CC",
              color: "white",
            }}
          >
            <ReceiptLong fontSize={"large"} />
            <Typography variant="h6" fontWeight={"bold"}>
              ToDo App by budcalmy
            </Typography>
          </Paper>

          <Paper
            sx={{
              padding: 1,
              borderRadius: 3,
              bgcolor: "#9999CC",
              color: "white",
              width: "fit-content",
            }}
          >
            <NavLink
              to={`/`}
              className={({ isActive }) => (isActive ? "active" : "")}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <LogoutIcon></LogoutIcon>
            </NavLink>
          </Paper>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          marginTop: "8vw",
          display: "flex",
          flexDirection: "column",
          gap: "1vw",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" fontWeight={"bold"}>
            Your todos
          </Typography>
          <FormControl>
            <FormLabel sx={{ fontWeight: "bold", color: "#9999CC" }}>
              Filter
            </FormLabel>
            <RadioGroup
              row
              defaultValue={"name"}
              // onChange={(e) => handleSortTodos(e.target.value)}
            >
              <FormControlLabel
                value="name"
                control={
                  <Radio
                    sx={{
                      color: "#9999CC",
                      "&.Mui-checked": {
                        color: "#9999CC",
                      },
                    }}
                  />
                }
                label="name"
              />
              <FormControlLabel
                value="time"
                control={
                  <Radio
                    sx={{
                      color: "#9999CC",
                      "&.Mui-checked": {
                        color: "#9999CC",
                      },
                    }}
                  />
                }
                label="time"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5vw",
            maxHeight: "60vh",
            overflow: "scroll",
            padding: 1,
          }}
        >
          {todos
            ? todos.map((todo) => {
                return (
                  <Todo key={todo._id} text={todo.text} id={todo._id}></Todo>
                );
              })
            : null}
        </Box>
      </Container>
      <Container>
        <Paper
          sx={{
            position: "absolute",
            bottom: "3vw",
            display: "flex",
            gap: "3vw",
            padding: 2,
            borderRadius: 3,
            width: "50%",
          }}
          elevation={3}
        >
          <Button
            variant="contained"
            sx={{
              fontWeight: "bold",
              borderRadius: 3,
            }}
            style={customeStyles}
            onClick={handleSendTodo}
          >
            Create todo
          </Button>
          <OutlinedInput
            placeholder="Todo text"
            sx={{ borderRadius: 3, width: "90%", fontSize: "2vw" }}
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          ></OutlinedInput>
        </Paper>
      </Container>
    </Container>
  );
}
