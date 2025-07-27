import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DeleteModalData = {
    message: string;
    deleteItemId: string;
    deleteItemTitle: string;
    deleteItemSerialNumber: string;
    deleteIconPath: string;
};
const initialState = {
    value: "",
};

const searchSlice = createSlice({
    name: "deleteModal",
    initialState,
    reducers: {
        search: (state, action: PayloadAction<{ value: string }>) => {
            state.value = action.payload.value;
            return state;
        },
    },
});

export const { search } = searchSlice.actions;
export default searchSlice.reducer;
