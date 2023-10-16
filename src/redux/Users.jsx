import {createSlice, current} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:'users',
    initialState:[],
    reducers:{
        saveUser:(state,action)=>{
           action.payload.id=Math.floor(Math.random()*100000) 
           state.push(action.payload)
        },
        deleteUser:(state,action)=>{
           state=state.filter(e => e.id != action.payload)
           return state
        },
        updateUser:(state,action)=>{
            let u=state.find(e=> e.id==action.payload.id);
            if(u){
                u.firstName=action.payload.firstName
                u.lastName=action.payload.lastName
                u.email=action.payload.email
                u.age=action.payload.age
                u.contact=action.payload.contact
            }
        }
    }
})
export const {saveUser,deleteUser,updateUser} = userSlice.actions
export default userSlice.reducer