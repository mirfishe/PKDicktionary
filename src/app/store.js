import { configureStore } from "@reduxjs/toolkit";
import applicationSettingsSlice from "./applicationSettingsSlice";
import urlsSlice from "./urlsSlice";

export default configureStore({
  reducer: {
    applicationSettings: applicationSettingsSlice,
    urls: urlsSlice
  }
});
