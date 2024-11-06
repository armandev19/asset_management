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
        setAssetData: (state, action) => {
            state.assetData = action.payload;
        }
    },
});

export const { setUserData, setFCMToken, setAssetData } = navSlice.actions;

export const selectUserData = (state) => state.nav.userData;

export const selectFCMToken = (state) => state.nav.fcmtoken;

export const selectAssetData = (state) => state.nav.assetData;

export default navSlice.reducer;