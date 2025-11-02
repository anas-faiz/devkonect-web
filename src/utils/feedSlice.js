import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers:{
        addFeed: (state,actions)=> actions.payload,
        removeFeed : (state,actions)=>{
            const newArray = state.filter((req)=>req._id !== actions.payload);
            return newArray
        } ,
    }
})

export const {addFeed,removeFeed} = feedSlice.actions;

export default feedSlice.reducer;