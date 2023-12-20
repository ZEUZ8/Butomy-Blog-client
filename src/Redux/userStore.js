import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name:null,
    token:null,
    id:null
}

export const userSlice = createSlice({
    name:"userLogin",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.name = action.name,
            state.token = action.token,
            state.email = action.email,
            state.id = action.id
        },
        setLogOut:(state,action)=>{
            state.name = null,
            state.token = null,
            state.email = null,
            state.id = null
        }
    }
})

export const {setLogin,setLogOut} = userSlice.actions;

export default userSlice.reducer;
