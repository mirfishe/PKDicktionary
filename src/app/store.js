import { configureStore } from "@reduxjs/toolkit";
import applicationSettingsSlice from "./applicationSettingsSlice";
import urlsSlice from "./urlsSlice";
import titlesSlice from "./titlesSlice";

export default configureStore({
  reducer: {
    applicationSettings: applicationSettingsSlice,
    titles: titlesSlice,
    urls: urlsSlice
  }
});
