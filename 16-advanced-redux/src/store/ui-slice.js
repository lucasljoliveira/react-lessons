import { createSlice } from "@reduxjs/toolkit";


const uiInitialValue = {show: false, notification: null}

const ui = createSlice({
    name: "ui",
    initialState: uiInitialValue,
    reducers: {
        toggle(state) {
            state.show = !state.show
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            };
        }
    }
})

export const uiActions = ui.actions;

export default ui.reducer;
