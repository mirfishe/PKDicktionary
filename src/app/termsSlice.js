import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, getDateTime, isNonEmptyArray } from "shared-functions";

const componentName = "termsSlice";

const initialState = {
  arrayTerms: [],
  termsLoaded: false,
  lastDatabaseRetrievalTerms: null,
  // termsDataOffline: false,
  termSortBy: "termName"
};

const termsSlice = createSlice({
  name: "terms",
  initialState,
  reducers: {
    loadArrayTerms(state, action) {

      if (isNonEmptyArray(action.payload) === true) {

        state.arrayTerms = [];

        for (let i = 0; i < action.payload.length; i++) {

          state.arrayTerms.push(action.payload[i]);

        };

      };

      state.termsLoaded = true;
      state.lastDatabaseRetrievalTerms = getDateTime();

    },
    // setTermsDataOffline(state, action) {

    //   state.termsDataOffline = action.payload;

    // },
    setTermSortBy(state, action) {

      state.termSortBy = action.payload;

    }
  }
});

export const { loadArrayTerms, /* setTermsDataOffline, */ setTermSortBy } = termsSlice.actions;

export default termsSlice.reducer;