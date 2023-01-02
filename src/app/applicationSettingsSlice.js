import { createSlice } from "@reduxjs/toolkit";
import { isEmpty, getDateTime, hasNonEmptyProperty } from "shared-functions";

const componentName = "applicationSettingsSlice";

const initialState = {
  applicationVersion: "",
  copyrightYear: "",
  computerLog: {},
  locationLogged: false,
  hostname: "",
  profileType: "",
  // API_URL: "",
  // baseURL: "",
  tagManagerArgsgtmId: "",
  siteName: "",
  applicationName: "",
  metaDescription: "",
  defaultPageComponent: "",
  routerBaseName: "",
  applicationAllowUserInteractions: true,
  requireUserLogin: true,
  applicationSettingsLoaded: false,
  applicationSettingsJsonLoaded: false,
  menuSettings: {},
  informationMessage: "",
  informationMessageVisible: false,
  successMessage: "",
  successMessageVisible: false,
  warningMessage: "",
  warningMessageVisible: false,
  errorMessage: "",
  errorMessageVisible: false,
  showMessages: false
};

const applicationSettingsSlice = createSlice({
  name: "applicationSettings",
  initialState,
  reducers: {
    setApplicationVersion(state, action) {

      state.applicationVersion = action.payload;

    },
    setCopyrightYear(state, action) {

      state.copyrightYear = action.payload;

    },
    setLocationLogged(state, action) {

      state.locationLogged = action.payload;

    },
    setHostname(state, action) {

      state.hostname = action.payload;

    },
    setProfileType(state, action) {

      state.profileType = action.payload;

    },
    // setAPI_URL(state, action) {

    //     state.API_URL = action.payload;

    // },
    // setBaseURL(state, action) {

    //       state.baseURL = action.payload;

    //   },
    setTagManagerArgsgtmId(state, action) {

      state.tagManagerArgsgtmId = action.payload;

    },
    setSiteName(state, action) {

      state.siteName = action.payload;

    },
    setApplicationName(state, action) {

      state.applicationName = action.payload;

    },
    setMetaDescription(state, action) {

      state.metaDescription = action.payload;

    },
    setDefaultPageComponent(state, action) {

      state.defaultPageComponent = action.payload;

    },
    setRouterBaseName(state, action) {

      state.routerBaseName = action.payload;

    },
    setApplicationAllowUserInteractions(state, action) {

      state.applicationAllowUserInteractions = action.payload;

    },
    setRequireUserLogin(state, action) {

      state.requireUserLogin = action.payload;

    },
    setApplicationSettingsLoaded(state, action) {

      state.applicationSettingsLoaded = action.payload;

    },
    setApplicationSettingsJsonLoaded(state, action) {

      state.applicationSettingsJsonLoaded = action.payload;

    },
    setMenuSettings(state, action) {

      state.menuSettings = action.payload;

    },
    addInformationMessage(state, action) {


      if (isEmpty(action.payload) === false) {

        // * Make sure that the new phrase isn't in the existing information message. -- 09/27/2021 MF
        // if (state.informationMessage !== action.payload) {
        if (state.informationMessage.includes(action.payload) === false) {

          if (isEmpty(state.informationMessage) === false) {

            state.informationMessage = state.informationMessage + " ";
          };

          state.informationMessage = state.informationMessage + action.payload;

          if (isEmpty(action.payload) === false) {

            state.informationMessageVisible = true;

          } else {

            state.informationMessageVisible = false;

          };

        };

      } else {

        state.informationMessage = action.payload;
        state.informationMessageVisible = false;

      };

    },
    addSuccessMessage(state, action) {

      if (isEmpty(action.payload) === false) {


        // * Make sure that the new phrase isn't in the existing success message. -- 09/27/2021 MF
        // if (state.successMessage !== action.payload) {
        if (state.successMessage.includes(action.payload) === false) {


          if (isEmpty(state.successMessage) === false) {

            state.successMessage = state.successMessage + " ";

          };

          state.successMessage = state.successMessage + action.payload;

          if (isEmpty(action.payload) === false) {

            state.successMessageVisible = true;

          } else {

            state.successMessageVisible = false;

          };

        };

      } else {

        state.successMessage = action.payload;
        state.successMessageVisible = false;

      };

    },
    addWarningMessage(state, action) {


      if (isEmpty(action.payload) === false) {


        // * Make sure that the new phrase isn't in the existing warning message. -- 09/27/2021 MF
        // if (state.warningMessage !== action.payload) {
        if (state.warningMessage.includes(action.payload) === false) {


          if (isEmpty(state.warningMessage) === false) {

            state.warningMessage = state.warningMessage + " ";

          };

          state.warningMessage = state.warningMessage + action.payload;

          if (isEmpty(action.payload) === false) {

            state.warningMessageVisible = true;

          } else {

            state.warningMessageVisible = false;

          };

        };

      } else {

        state.warningMessage = action.payload;
        state.warningMessageVisible = false;

      };

    },
    addErrorMessage(state, action) {


      if (isEmpty(action.payload) === false) {


        // * Make sure that the new phrase isn't in the existing error message. -- 09/27/2021 MF
        // if (state.errorMessage !== action.payload) {
        if (state.errorMessage.includes(action.payload) === false) {


          if (isEmpty(state.errorMessage) === false) {

            state.errorMessage = state.errorMessage + " ";

          };

          state.errorMessage = state.errorMessage + action.payload;

          if (isEmpty(action.payload) === false) {

            state.errorMessageVisible = true;

          } else {

            state.errorMessageVisible = false;

          };

        };

      } else {

        state.errorMessage = action.payload;
        state.errorMessageVisible = false;

      };

    },
    clearMessages(state, action) {

      state.informationMessage = "";
      state.successMessage = "";
      state.warningMessage = "";
      state.errorMessage = "";

      state.informationMessageVisible = false;
      state.successMessageVisible = false;
      state.warningMessageVisible = false;
      state.errorMessageVisible = false;

    },
    setShowMessages(state, action) {

      state.showMessages = action.payload;

    }
  }
});

export const { setApplicationVersion, setCopyrightYear, setLocationLogged, setHostname, setProfileType, /*setAPI_URL, setBaseURL,*/ setTagManagerArgsgtmId, setSiteName, setApplicationName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setApplicationAllowUserInteractions, setRequireUserLogin, setApplicationSettingsLoaded, setApplicationSettingsJsonLoaded, setMenuSettings, addInformationMessage, addSuccessMessage, addWarningMessage, addErrorMessage, clearMessages, setShowMessages } = applicationSettingsSlice.actions;

export default applicationSettingsSlice.reducer;