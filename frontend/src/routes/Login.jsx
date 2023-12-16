import {
  Box,
  Button,
  Container,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { logUser } from "../redux/actions/userActions";
import { customeStyles } from "./Home";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const homeNavigator = useNavigate();

  const checkUserAuth = useCallback(
    (email, password) => {
      dispatch(logUser(email, password)).then((res) => {
        if (res) {
            homeNavigator(`${res}/home`);
        }
      });
    },
    [dispatch, homeNavigator]
  );

  const goHome = useCallback(
    (email, password) => () => {
      checkUserAuth(email, password);
    },
    [checkUserAuth]
  );

  return (
    <Container
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ position: "absolute", top: "3vw" }}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            gap: "1vw",
            alignItems: "center",
            padding: 3,
            border: "0.2vw solid black",
            borderRadius: 3,
          }}
        >
          <ReceiptLongIcon fontSize={"large"} />
          <Typography variant="h4" fontWeight={"bold"}>
            ToDo App by budcalmy
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "1vw" }}>
        <Typography textAlign={"center"} variant="h4" fontWeight={"bold"}>
          Hello, User!
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "0.5vw",
            flexDirection: "column",
            color: "tomato",
          }}
        >
          <Input
            placeholder="Email"
            fullWidth={true}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "0.5vw",
            flexDirection: "column",
            color: "tomato",
          }}
        >
          <Input
            type="password"
            placeholder="Password"
            fullWidth={true}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </Box>

        <Button
          fullWidth={true}
          variant="contained"
          onClick={goHome(email, password)}
          style={{backgroundColor: customeStyles.backgroundColor}}
        >
          <Typography>Log in</Typography>
        </Button>

        <Box textAlign={"center"}>
          <NavLink
            to="/reg"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <Typography underline="hover" color={"black"} variant="subtitle1">
              Register now!
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
}
