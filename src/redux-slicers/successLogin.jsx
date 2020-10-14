import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./creatActionApi";
import jwtDecode from "jwt-decode"

const slice = createSlice({
    name: "successLogin",
    initialState: {
        name: "",
        login: false,
        confirmLogin:false,
        lastFetch: null,
        jwt:"",
        loading:false,
        user:{},
        error:"",
        gender:""
      },
    reducers: {
      // action => action handler

      loggedOut: (successLogin, action) => {
        successLogin.login= false;
        successLogin.confirmLogin= false;
        successLogin.jwt="";
successLogin.user="";
successLogin.name="";

      },

registerRequested: (successLogin, action) => {
    successLogin.loading= true;
    successLogin.error="";

  },
  registerReceived: (successLogin, action) => {
    successLogin.loading= false;
    const jwt = action.payload.headers["x-auth-token"];
    const user = jwtDecode(jwt);
    const name = user.name
successLogin.jwt=jwt;
successLogin.user=user;
successLogin.name=name;
successLogin.login=true;
  },

  registerRequestFailed: (successLogin, action) => {
    console.log(action);
    successLogin.loading= false;
    successLogin.error=action.payload.data


  },
  confirmLogin: (successLogin, action) => {
    successLogin.confirmLogin= true;

  },

  loginReceived:(successLogin,action)=>{
    successLogin.loading= false;
    const jwt = action.payload.data;
    const user = jwtDecode(jwt);
    const name = user.name
    successLogin.jwt=jwt;
successLogin.user=user;
successLogin.name=name;
successLogin.login=true;
console.log(user);
}







    }

  });
  
  export const { loggedOut,registerRequested,registerReceived,registerRequestFailed,confirmLogin,loginReceived } = slice.actions;
  
  export default slice.reducer;
  
// Action Creators

export const register = (email,password,name) => (dispatch, getState) => {
    const url = "/users";

  return dispatch(
    apiCallBegan({
      url,
      onStart: registerRequested.type,
      onSuccess: registerReceived.type,
      onError: registerRequestFailed.type,
      data:{email,password,name},
      method:"post",
    })
  );
};

export const login = (email,password) => (dispatch, getState) => {
    const url = "/auth";

  return dispatch(
    apiCallBegan({
      url,
      onStart: registerRequested.type,
      onSuccess: loginReceived.type,
      onError: registerRequestFailed.type,
      data:{email,password},
      method:"post",
    })
  );
};