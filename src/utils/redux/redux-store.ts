import { configureStore } from "@reduxjs/toolkit";
import deleteModal from "./slices/delete-modal-slice";
import search from "./slices/search-slice";

const store = configureStore({
    reducer: {
        deleteModal: deleteModal,
        search: search,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
