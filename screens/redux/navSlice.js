import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    baseUrl: "",
    userData: null,
}

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setFCMToken: (state, action) => {
            state.fcmtoken = action.payload;
        },
    },
});

export const { setUserData, setFCMToken } = navSlice.actions;

export const selectUserData = (state) => state.nav.userData;

export const selectFCMToken = (state) => state.nav.fcmtoken;

export default navSlice.reducer;