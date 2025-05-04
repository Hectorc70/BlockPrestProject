import { IUser } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: IUser = {
  fullname: "",
  email: "",
  wallet: "",
  rol: "lender",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      // state.username = action.payload.username;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
