import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./creatActionApi";
import moment from "moment";
import { connect } from "react-redux";
import { findingChildren } from "../components/common/functionsOfProducts";

const slice = createSlice({
  name: "product",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true;
    },

    productsReceived: (products, action) => {
      products.list = action.payload.data;
      products.loading = false;
      products.lastFetch = Date.now();
    },

    productsRequestFailed: (products, action) => {
      products.loading = false;
    },

    commentRequested: (products, action) => {
      products.loading = true;
    },

    commentReceived: (products, action) => {
      products.loading = false;
    },

    commentRequestFailed: (products, action) => {
      products.loading = false;
    },
  },
});

export const {
  productsReceived,
  productsRequested,
  productsRequestFailed,
  commentReceived,
  commentRequested,
  commentRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
let url = "/movies";

export const loadAllProducts = () => (dispatch, getState) => {
  const { lastFetch } = getState().api.apiProducts;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 1) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: productsRequested.type,
      onSuccess: productsReceived.type,
      onError: productsRequestFailed.type,
    })
  );
};

export const addComment = (comments, productId, title, allRates) => (
  dispatch,
  getState
) => {
  let urlComment = "/movies" + "/" + productId;
  let data2 = {
    genreId: "5f36ba645bd2f03c04790ba9",
    dailyRentalRate: comments,
    title: title,
    numberInStock: allRates,
  };
  const { jwt } = getState().authorization.isLoggedIn;
  return dispatch(
    apiCallBegan({
      url: urlComment,
      onStart: commentRequested.type,
      onSuccess: commentReceived.type,
      onError: commentRequestFailed.type,
      method: "put",
      data: { ...data2 },
      // headers: {
      //   'x-auth-token': jwt
      // }
    })
  );
};
export const addRate = (allRates, productId, title) => (dispatch, getState) => {
  let urlComment = "/movies" + "/" + productId;
  let data2 = {
    genreId: "5f36ba645bd2f03c04790ba9",
    numberInStock: allRates,
    title: title,
  };
  const { jwt } = getState().authorization.isLoggedIn;
  return dispatch(
    apiCallBegan({
      url: urlComment,
      onStart: commentRequested.type,
      onSuccess: commentReceived.type,
      onError: commentRequestFailed.type,
      method: "put",
      data: { ...data2 },
      // headers: {
      //   'x-auth-token': jwt
      // }
    })
  );
};

// Selector

// Memoization
// bugs => get unresolved bugs from the cache

// export const getSpecificProduct = Id =>
//   createSelector(
//     state => state.api.apiProducts.list,
//     list => list.filter(P => P.categoryId === Id)
//   );

// const findingChildren=(id)=>{
//   let { categories } = this.props.allCategories;
//   let childIdies=[];
//   let allchildidies=[];
//  let mainCat= categories.filter(c=>c.id===id)
//   let idies=[]
//   idies.push(...mainCat)
//   allchildidies.push(...mainCat)
// while (idies.length>0) {
//   categories.map(c=>{
//     for (let index = 0; index < idies.length; index++) {
//       if(c.parentId===idies[index].id){
//         childIdies.push(c)
//       }

//     }
//   })
//   allchildidies.push(...childIdies)
//   idies=childIdies
//   childIdies=[];
// }
// let allIdies=[]
// allchildidies.map(c=>allIdies.push(c.id))
// return allIdies
// }

//   export const getSpecificProduct = Id =>
//   findingChildren(Id).map(id=>
//   createSelector(
//     state => state.api.apiProducts.list,
//     list => list.filter(P => P.categoryId === id  )
//   ));

export const getSpecificProduct = (Id) => (getState) => {
  const { list } = getState.api.apiProducts;
  const { categories } = getState.api.apiattributeItem;

  let Idies = findingChildren(Id, categories);

  let allProducts = [];

  Idies.map((id) =>
    allProducts.push(...list.filter((P) => P.categoryId === id))
  );
  allProducts = [...new Set(allProducts)];

  return allProducts;
};
// export const getSpecificProduct = Id =>
// createSelector(
//   state => state.api.apiProducts.list,
//   list => list.filter(P => P.categoryId === Id  )
// );

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.list.filter((bug) => !bug.resolved)
);
