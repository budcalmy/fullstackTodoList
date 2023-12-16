

export const selectUserEmail = (state) => state.userReducer?.info.email;
export const selectUserPassword = (state) => state.userReducer?.info.password;
export const selectUserID = (state) => state.userReducer?.info._id;