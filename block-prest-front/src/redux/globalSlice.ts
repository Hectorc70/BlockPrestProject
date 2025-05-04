import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
    titleHeader: string;
}

const initialState: GlobalState = {
    titleHeader: "Inicio",
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        changeTitle: (state, action: PayloadAction<string>) => {
            state.titleHeader = action.payload;
        },
    },
});

export const { changeTitle } = globalSlice.actions;
export default globalSlice.reducer;