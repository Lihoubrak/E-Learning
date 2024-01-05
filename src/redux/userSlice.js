import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
});
