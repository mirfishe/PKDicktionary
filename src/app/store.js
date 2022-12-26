import { configureStore } from "@reduxjs/toolkit";
import applicationSettingsSlice from "./applicationSettingsSlice";
import termsSlice from "./termsSlice";
import urlsSlice from "./urlsSlice";
import titlesSlice from "./titlesSlice";

export default configureStore({
  reducer: {
    applicationSettings: applicationSettingsSlice,
    terms: termsSlice,
    titles: titlesSlice,
    urls: urlsSlice
  }
});
