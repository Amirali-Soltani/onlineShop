import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./creatActionApi";
import moment from "moment";

const slice = createSlice({
  name: "attributeItem",
  initialState: {
    attributeItem: [],
    categories: [],
    categoriesAtttribute: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    attributeItemRequested: (products, action) => {
      products.loading = true;
    },

    attributeItemReceived: (products, action) => {
      products.attributeItem = action.payload.data[0].data;
      products.categories = action.payload.data[1].data;
      products.categoriesAtttribute = action.payload.data[2].data;

      products.loading = false;
      products.lastFetch = Date.now();
    },

    attributeItemRequestFailed: (products, action) => {
      products.loading = false;
    },
  },
});

export const {
  attributeItemReceived,
  attributeItemRequested,
  attributeItemRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/genres";

export const loadattributeItem = () => (dispatch, getState) => {
  // const { lastFetch } = getState().api.apiattributeItem;

  // const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  // if (diffInMinutes < 1) return;

  return dispatch(
    apiCallBegan({
      url,
      onStart: attributeItemRequested.type,
      onSuccess: attributeItemReceived.type,
      onError: attributeItemRequestFailed.type,
    })
  );
};

// Selector

// Memoization
// bugs => get unresolved bugs from the cache

export const getSpecificCategory2 = (Id) =>
  createSelector(
    (state) => state.api.apiattributeItem.attributeItem,
    (bugs) => bugs.filter((bug) => bug.Id === Id)
  );

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.list.filter((bug) => !bug.resolved)
);
