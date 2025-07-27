import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DeleteModalData = {
    message: string;
    deleteItemId: string;
    deleteItemTitle: string;
    deleteItemSerialNumber: string;
    deleteIconPath: string;
};
const initialState = {
    showModal: false,
    message: "",
    deleteItemId: "",
    deleteItemTitle: "",
    deleteItemSerialNumber: "",
    deleteItemIconPath: "",
    delete: false,
};

const deleteWindowSlice = createSlice({
    name: "deleteModal",
    initialState,
    reducers: {
        showDeleteModal: (state, action: PayloadAction<DeleteModalData>) => {
            state.showModal = true;
            state.message = action.payload.message;
            state.deleteItemTitle = action.payload.deleteItemTitle;
            state.deleteItemSerialNumber =
                action.payload.deleteItemSerialNumber;
            state.deleteItemIconPath = action.payload.deleteIconPath;
            state.deleteItemId = action.payload.deleteItemId;
            state.delete = false;
            return state;
        },

        hideDeleteModal: (state, action: PayloadAction<undefined>) => {
            state.showModal = false;
            state.message = "";
            state.deleteItemId = "";
            state.delete = false;
            return state;
        },

        deleteItem: (state, action: PayloadAction<undefined>) => {
            state.delete = true;
            return state;
        },
    },
});

export const { deleteItem, showDeleteModal, hideDeleteModal } =
    deleteWindowSlice.actions;
export default deleteWindowSlice.reducer;
