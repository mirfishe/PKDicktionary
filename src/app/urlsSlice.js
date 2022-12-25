import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, getDateTime, isNonEmptyArray } from "shared-functions";

const componentName = "urlsSlice";

const initialState = {
  arrayURLs: [],
  urlsLoaded: false,
  pageURL: "",
  linkItem: {}
};

const urlsSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {
    loadArrayURLs(state, action) {

      if (isNonEmptyArray(action.payload) === true) {

        // state.arrayURLs = [];

        for (let i = 0; i < action.payload.length; i++) {

          state.arrayURLs.push(action.payload[i]);

        };

      };

      state.urlsLoaded = true;

    },
    setPageURL(state, action) {

      state.pageURL = action.payload;

    },
    setLinkItem(state, action) {

      state.linkItem = action.payload;

    }
  }
});

export const { loadArrayURLs, setPageURL, setLinkItem } = urlsSlice.actions;

export default urlsSlice.reducer;