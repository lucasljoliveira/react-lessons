import { createSlice } from '@reduxjs/toolkit';


const initialAuthState = {isAuthenticated: false, user: null}

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true
            state.user = action.payload
        },
        logout(state) {
            state.isAuthenticated = false
            state.user = null
        },
    }
})

export default authSlice.reducer;

export const authActions = authSlice.actions;
