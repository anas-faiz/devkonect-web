import { createSlice } from "@reduxjs/toolkit";

const connetionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers:{
        addConnection: (state,action) => action.payload,
        removeConnection: ()=> null
    }
})

export const {addConnection,removeConnection} = connetionSlice.actions;

export default connetionSlice.reducer;