import {
  Box,
  Button,
  Container,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/actions/userActions";
import ReceiptLong from "@mui/icons-material/ReceiptLong";

import { customeStyles } from "./Home";

const User = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();

  const checkOutUser = useCallback((username, email, password) => {
    try {
      User.parse({
        username,
        email,
        password,
      });
      setErrors(null);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
      return false;
    }
  }, []);

  const homeNavigator = useNavigate();

  const createUserContext = useCallback(
    (username, email, password) => {
      if (checkOutUser(username, email, password)) {
        bcrypt.hash(password, 10).then((hashPassword) => {
          dispatch(
            createUser({
              username: username,
              email: email,
              password: hashPassword,
            })
          ).then((res) => {
            homeNavigator(`/`);
          });
        });
      }
    },
    [dispatch, homeNavigator, checkOutUser]
  );

  const goHome = useCallback(
    (username, email, password) => () => {
      createUserContext(username, email, password);
    },
    [createUserContext]
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
          <ReceiptLong fontSize={"large"} />
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
            placeholder="Username"
            fullWidth={true}
            required={true}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          {errors?.username && (
            <Typography variant="subtitle2">
              {errors?.username?._errors}
            </Typography>
          )}
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
            placeholder="Email"
            fullWidth={true}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          {errors?.email && (
            <Typography variant="subtitle2">
              {errors?.email?._errors}
            </Typography>
          )}
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
          {errors?.password && (
            <Typography variant="subtitle2">
              {errors?.password?._errors}
            </Typography>
          )}
        </Box>

        <Button
          fullWidth={true}
          variant="contained"
          onClick={goHome(username, email, password)}
          style={{ backgroundColor: customeStyles.backgroundColor }}
        >
          <Typography>Sign in</Typography>
        </Button>

        <Box textAlign={"center"}>
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <Typography underline="hover" color={"black"} variant="subtitle1">
              Also have an account?
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
}
