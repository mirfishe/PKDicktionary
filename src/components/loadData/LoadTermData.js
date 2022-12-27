import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Alert } from "reactstrap";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, isNonEmptyArray, hasNonEmptyProperty } from "shared-functions";
// import { encodeURL /* , addErrorLog */ } from "../../utilities/ApplicationFunctions";
import { loadArrayURLs } from "../../app/urlsSlice";
import { loadArrayTerms, /* setTermsDataOffline */ } from "../../app/termsSlice";

function LoadBibliographyData() {

  const componentName = "LoadBibliographyData";

  const dispatch = useDispatch();

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  // ! Loading the applicationOffline from the state store here is too slow
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const applicationOffline = useSelector(state => state.applicationSettings.applicationOffline);
  // const applicationOffline = applicationSettings.applicationOffline;

  // * Load settings from Redux slices. -- 03/06/2021 MF
  const termsLoaded = useSelector(state => state.terms.termsLoaded);

  // const lastDatabaseRetrievalTerms = useSelector(state => state.terms.lastDatabaseRetrievalTerms);

  const [termMessage, setTermMessage] = useState("");
  const [errorTermMessage, setErrorTermMessage] = useState("");


  useEffect(() => {

    if (termsLoaded !== true /* && termsDataLocalStorage !== true */) {

      getTerms();

    };

  }, []);


  const loadDataStore = (data, source) => {

    if (source === "terms") {

      dispatch(loadArrayTerms(data));
      // localStorage.setItem("arrayTerms", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalTerms", getDateTime());
      loadURLs(data, source);

    };

  };


  const loadURLs = (data, source) => {

    let arrayURLs = [];

    if (isNonEmptyArray(data) === true) {

      for (let i = 0; i < data.length; i++) {

        if (source === "terms") {

          arrayURLs.push({ linkName: data[i].term, linkType: source, linkID: data[i].termID, linkTypeNameID: null, linkTypeName: null });

        };

      };

    };

    dispatch(loadArrayURLs(arrayURLs));

  };


  const getTerms = () => {

    let url = baseURL + "terms/";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => {

        if (response.ok !== true) {

          throw Error(`${response.status} ${response.statusText} ${response.url}`);

        } else {

          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {


          loadDataStore(results.records, "terms");

        };

      })
      .catch((error) => {

        // console.error(componentName, getDateTime(), "getTerms error", error);

        // setErrorTermMessage(error.name + ": " + error.message);
        // dispatch(setTermsDataOffline(true));
        fetchLocalDataTerms();

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const fetchLocalDataTerms = () => {

    let url = "bibliographyData/terms.json";

    fetch(url)
      .then(response => {

        if (response.ok !== true) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer. -- 03/06/2021 MF
          // * Load offline data. -- 03/06/2021 MF
          // dispatch(setTermsDataOffline(true));
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Terms data used.", terms: TermData};
          // return { transactionSuccess: false, errorOccurred: true, message: "Offline Terms data fetch failed." };

        } else {

          // dispatch(setTermsDataOffline(true));
          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "terms");

        } else {

          console.error(componentName, getDateTime(), "fetchLocalDataTerms error", results.message);
          // setErrorTermMessage(results.message);
          // dispatch(setTermsDataOffline(true));
          // loadDataStore(TermData, "terms");

        };

      })
      .catch((error) => {

        console.error(componentName, getDateTime(), "fetchLocalDataTerms error", error);
        // console.error(componentName, getDateTime(), "fetchLocalDataTerms error.name", error.name);
        // console.error(componentName, getDateTime(), "fetchLocalDataTerms error.message", error.message);

        // setErrorTermMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell. -- 03/06/2021 MF
        // dispatch(setTermsDataOffline(true));
        // loadDataStore(TermData, "terms");

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <Row className="text-center">

      {isEmpty(termMessage) === false ? <Alert color="info">{termMessage}</Alert> : null}
      {isEmpty(errorTermMessage) === false ? <Alert color="danger">{errorTermMessage}</Alert> : null}

    </Row>
  );
}

export default LoadBibliographyData;
