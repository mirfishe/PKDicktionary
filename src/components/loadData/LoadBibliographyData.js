import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Alert } from "reactstrap";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, isNonEmptyArray, hasNonEmptyProperty } from "shared-functions";
import { encodeURL /* , addErrorLog */ } from "../../utilities/ApplicationFunctions";
import { loadArrayURLs } from "../../app/urlsSlice";
import { loadArrayTitles, /* setTitlesDataOffline */ } from "../../app/titlesSlice";

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
  const titlesLoaded = useSelector(state => state.titles.titlesLoaded);

  // const lastDatabaseRetrievalTitles = useSelector(state => state.titles.lastDatabaseRetrievalTitles);

  const [titleMessage, setTitleMessage] = useState("");
  const [errorTitleMessage, setErrorTitleMessage] = useState("");
  const [overallTitleRatingMessage, setOverallTitleRatingMessage] = useState("");
  const [errorOverallTitleRatingMessage, setErrorOverallTitleRatingMessage] = useState("");


  useEffect(() => {

    if (titlesLoaded !== true /* && titlesDataLocalStorage !== true */) {

      getTitles();

    };

  }, []);


  const addRatings = (titleData, userReviewsRatingsData) => {

    let arrayTitles = [...titleData];
    let arrayUserReviewsRatings = [];

    if (isEmpty(userReviewsRatingsData) === false) {

      arrayUserReviewsRatings = [...userReviewsRatingsData];

    };

    if (isNonEmptyArray(arrayTitles) === true) {

      for (let i = 0; i < arrayTitles.length; i++) {

        let userReviewRatingItem = {};

        if (isEmpty(arrayTitles[i].titleID) === false && !isNaN(arrayTitles[i].titleID)) {

          userReviewRatingItem = arrayUserReviewsRatings.filter(userReview => userReview.titleID === arrayTitles[i].titleID);
          userReviewRatingItem = userReviewRatingItem[0];

        };

        let userReviewCount = 0;
        let userReviewSum = 0;
        let userReviewAverage = 0;

        if (isEmpty(userReviewRatingItem) === false) {


          if (hasNonEmptyProperty(userReviewRatingItem, "userReviewCount")) {

            userReviewCount = userReviewRatingItem.userReviewCount;

          };

          if (hasNonEmptyProperty(userReviewRatingItem, "userReviewSum")) {

            userReviewSum = userReviewRatingItem.userReviewSum;

          };

          if (userReviewCount > 0) {

            // ? Check for division by zero? -- 03/06/2021 MF
            // let userReviewAverage: number = userReviewSum/0;
            userReviewAverage = userReviewSum / userReviewCount;

          };


        };


        Object.assign(arrayTitles[i], { userReviewCount: userReviewCount, userReviewSum: userReviewSum, userReviewAverage: userReviewAverage });

      };

    };

    dispatch(loadArrayTitles(arrayTitles));
    // dispatch(setUserReviewsRatingsLoaded(true));
    // dispatch(setLastDatabaseRetrievalUserReviewsRatings(getDateTime()));

  };


  const getUserReviewsRatings = (titleData) => {

    setOverallTitleRatingMessage("");
    setErrorOverallTitleRatingMessage("");

    let url = baseURL + "userreviews/";

    url = url + "rating";


    fetch(url)
      .then(response => {

        if (response.ok !== true) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          // dispatch(setUserReviewsRatingsDataOffline(true));
          // return { transactionSuccess: false, errorOccurred: true, message: "Offline User Reviews Ratings data fetch used." };

        } else {

          // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          // dispatch(setUserReviewsRatingsDataOffline(false));
          return response.json();

        };

      })
      .then(results => {

        // setOverallTitleRatingMessage(results.message);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          // loadDataStore(results.records, "userReviewRating");
          addRatings(titleData, results.records);

          // } else {

          //   console.error(componentName, getDateTime(), "getUserReviewsRatings error", results.message);
          //   // setErrorOverallTitleRatingMessage(results.message);
          //   // dispatch(setUserReviewsRatingsDataOffline(true));
          //   // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
          //   // fetchLocalDataUserReviewsRatings(titleData);

        };

      })
      .catch((error) => {

        console.error(componentName, getDateTime(), "getUserReviewsRatings error", error);
        // console.error(componentName, getDateTime(), "getUserReviewsRatings error.name", error.name);
        // console.error(componentName, getDateTime(), "getUserReviewsRatings error.message", error.message);

        // setErrorOverallTitleRatingMessage(error.name + ": " + error.message);
        // * Not going to need to load user reviews from local results. -- 03/06/2021 MF
        // dispatch(setUserReviewsRatingsDataOffline(true));
        // fetchLocalDataUserReviewsRatings(titleData);

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const loadDataStore = (data, source) => {

    if (source === "titles") {

      // dispatch(loadArrayTitles(data));
      getUserReviewsRatings(data);
      // localStorage.setItem("arrayTitles", JSON.stringify(data));
      // localStorage.setItem("lastDatabaseRetrievalTitles", getDateTime());
      loadURLs(data, source);

    };

  };


  const loadURLs = (data, source) => {

    let arrayURLs = [];

    if (isNonEmptyArray(data) === true) {

      for (let i = 0; i < data.length; i++) {

        if (source === "titles") {

          arrayURLs.push({ linkName: data[i].titleURL, linkType: source, linkID: data[i].titleID, linkTypeNameID: data[i].categoryID, linkTypeName: data[i].category });

        };

      };

    };

    dispatch(loadArrayURLs(arrayURLs));

  };


  const getTitles = () => {

    setTitleMessage("");
    setErrorTitleMessage("");

    let url = baseURL + "titles";

    fetch(url)
      .then(response => {

        if (response.ok !== true) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // * Load offline data. -- 03/06/2021 MF
          // dispatch(setTitlesDataOffline(true));
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Titles data used.", titles: TitleData};
          // return { transactionSuccess: false, errorOccurred: true, message: "Offline Titles data fetch used." };

        } else {

          // dispatch(setTitlesDataOffline(false));
          return response.json();

        };

      })
      .then(results => {

        // setTitleMessage(results.message);

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "titles");

        } else {

          console.error(componentName, getDateTime(), "getTitles error", results.message);
          // setErrorTitleMessage(results.message);
          // dispatch(setTitlesDataOffline(true));
          fetchLocalDataTitles();

        };

      })
      .catch((error) => {

        console.error(componentName, getDateTime(), "getTitles error", error);
        // console.error(componentName, getDateTime(), "getTitles error.name", error.name);
        // console.error(componentName, getDateTime(), "getTitles error.message", error.message);

        // setErrorTitleMessage(error.name + ": " + error.message);
        // dispatch(setTitlesDataOffline(true));
        fetchLocalDataTitles();

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const fetchLocalDataTitles = () => {

    let url = "bibliographyData/titles.json";

    fetch(url)
      .then(response => {

        if (response.ok !== true) {

          // throw Error(response.status + " " + response.statusText + " " + response.url);
          // ! This error runs on the web server but not on the local developer computer. -- 03/06/2021 MF
          // * Load offline data. -- 03/06/2021 MF
          // dispatch(setTitlesDataOffline(true));
          // return {transactionSuccess: true, errorOccurred: false, message: "Offline Titles data used.", titles: TitleData};
          // return { transactionSuccess: false, errorOccurred: true, message: "Offline Titles data fetch failed." };

        } else {

          // dispatch(setTitlesDataOffline(true));
          return response.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          loadDataStore(results.records, "titles");

        } else {

          console.error(componentName, getDateTime(), "fetchLocalDataTitles error", results.message);
          // setErrorTitleMessage(results.message);
          // dispatch(setTitlesDataOffline(true));
          // loadDataStore(TitleData, "titles");

        };

      })
      .catch((error) => {

        console.error(componentName, getDateTime(), "fetchLocalDataTitles error", error);
        // console.error(componentName, getDateTime(), "fetchLocalDataTitles error.name", error.name);
        // console.error(componentName, getDateTime(), "fetchLocalDataTitles error.message", error.message);

        // setErrorTitleMessage(error.name + ": " + error.message);
        // ! This doesn't actually run as far as I can tell. -- 03/06/2021 MF
        // dispatch(setTitlesDataOffline(true));
        // loadDataStore(TitleData, "titles");

        // addErrorLog(baseURL, operationValue, componentName, { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <Row className="text-center">

      {isEmpty(titleMessage) === false ? <Alert color="info">{titleMessage}</Alert> : null}
      {isEmpty(errorTitleMessage) === false ? <Alert color="danger">{errorTitleMessage}</Alert> : null}

      {isEmpty(overallTitleRatingMessage) === false ? <Alert color="info">{overallTitleRatingMessage}</Alert> : null}
      {isEmpty(errorOverallTitleRatingMessage) === false ? <Alert color="danger">{errorOverallTitleRatingMessage}</Alert> : null}
    </Row>
  );
}

export default LoadBibliographyData;
