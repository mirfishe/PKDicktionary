import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, addErrorLog } from "shared-functions";
import { setHostname, setProfileType, setTagManagerArgsgtmId, setSiteName, setApplicationName, setMetaDescription, setDefaultPageComponent, setRouterBaseName, setApplicationAllowUserInteractions, setRequireUserLogin, setApplicationSettingsLoaded, setApplicationSettingsJsonLoaded, setMenuSettings } from "../../app/applicationSettingsSlice";

function LoadApplicationSettings() {

  const componentName = "LoadApplicationSettings";

  const dispatch = useDispatch();

  const applicationOffline = useSelector(state => state.applicationSettings.applicationOffline);
  const applicationSettingsLoaded = useSelector(state => state.applicationSettings.applicationSettingsLoaded);
  const applicationSettingsJsonLoaded = useSelector(state => state.applicationSettings.applicationSettingsJsonLoaded);


  useEffect(() => {

    // * Only load the applicationSettings data once per session unless the data is changed. -- 03/06/2021 MF
    if (applicationSettingsLoaded !== true) {

      getApplicationSettings();

    };

  }, []);


  // * Loads the settings from environment.js first and then if there are any settings in the applicationSettings.json file on the server, those override what was set in environment.js. -- 03/06/2021 MF
  const getApplicationSettings = () => {

    // * Load settings from environment.js into Redux. -- 03/06/2021 MF

    dispatch(setHostname(applicationSettings.hostname));

    let profileType = applicationSettings.profileType;

    if (isEmpty(profileType) === true) {

      profileType = "localhost";

    };

    dispatch(setProfileType(profileType));

    dispatch(setTagManagerArgsgtmId(applicationSettings.tagManagerArgs.gtmId));

    dispatch(setMetaDescription(applicationSettings.metaDescription));

    dispatch(setDefaultPageComponent(applicationSettings.defaultPageComponent));

    dispatch(setRouterBaseName(applicationSettings.routerBaseName));

    dispatch(setApplicationSettingsLoaded(true));

    let url = "applicationSettings/" + profileType + ".json";

    fetch(url)
      .then(results => {

        if (results.ok !== true) {

          // throw Error(results.status + " " + results.statusText + " " + results.url);
          // * Load offline data. -- 03/06/2021 MF
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Categories data used.", categories: CategoryData};

        } else {

          return results.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          if (isEmpty(results.siteName) === false) {

            dispatch(setSiteName(results.siteName));

          };

          if (isEmpty(results.applicationName) === false) {

            dispatch(setApplicationName(results.applicationName));

          };


          if (isEmpty(results.applicationAllowUserInteractions) === false) {

            dispatch(setApplicationAllowUserInteractions(results.applicationAllowUserInteractions));

          };

          if (isEmpty(results.requireUserLogin) === false) {

            dispatch(setRequireUserLogin(results.requireUserLogin));

          };

          if (isEmpty(results.menuSettings) === false) {

            dispatch(setMenuSettings(results.menuSettings));

          };

        } else {

          console.error(componentName, getDateTime(), "getApplicationSettings error", results.message);

        };

        dispatch(setApplicationSettingsJsonLoaded(true));

      })
      .catch((error) => {

        console.error(componentName, getDateTime(), "getApplicationSettings error", error);
        // console.error(componentName, getDateTime(), "getApplicationSettings error.name", error.name);
        // console.error(componentName, getDateTime(), "getApplicationSettings error.message", error.message);

        // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <React.Fragment></React.Fragment>
  );
}

export default LoadApplicationSettings;
