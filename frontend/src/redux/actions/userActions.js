import bcrypt from "bcryptjs";
import axios from "axios";
import { userError, userSet } from "../slices/userSlice";

export const logUser = (email, password) => async (dispatch) => {
  const query = new URLSearchParams({
    email,
  }).toString();

  const user = await axios
    .get(`http://localhost:3333/users?${query}`)
    .then((res) => res.data[0]);

  if (user) {
    if (!bcrypt.compareSync(password, user.password)) {
      dispatch(userError("Wrong password..."));
      return false;
    } else {
      dispatch(userSet(user));
      return user._id;
    }
  } else {
    dispatch(userError("No user found. Create an account.."));
    return false;
  }
};

export const createUser = (user) => async (dispatch) => {
  const id = axios
    .post(`http://localhost:3333/users`, user)
    .then((res) => {
      console.log("User created");
      dispatch(userSet(user));
      return res.data._id;
    })
    .catch((err) => dispatch(userError(err)));

  return id;
};
