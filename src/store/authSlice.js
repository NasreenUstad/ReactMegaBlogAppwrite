import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: "",
    userData : null
}
const authSlise = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true,
            state.userData = action.payload.userData
        },

        logout: (state, action) => {
            state.status = false,
            state.userData = null
        }
    }
})

export const {login, logout} = authSlise.actions
export default authSlise.reducer