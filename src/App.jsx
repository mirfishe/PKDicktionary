import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Container, Col, Row, Nav, Navbar, NavItem, NavLink, NavbarText, Alert, Button } from "reactstrap";
import applicationSettings from "./app/environment";
import { isEmpty, getDateTime, isNonEmptyArray, getQueryStringData, addErrorLog, addComputerLog } from "shared-functions";
import { setApplicationVersion, setCopyrightYear, setLocationLogged, setProfileType, setBaseURL, setApplicationOffline } from "./app/applicationSettingsSlice";
import { setPageURL, setLinkItem } from "./app/urlsSlice";
import LoadApplicationSettings from "./components/loadData/LoadApplicationSettings";
import LoadTermData from "./components/loadData/LoadTermData";
import LoadBibliographyData from "./components/loadData/LoadBibliographyData";
import Home from "./content/Home";
import About from "./content/About";
// import TermSuggestions from "./components/termSuggestion/TermSuggestions";
// import AddTermSuggestion from "./components/termSuggestion/AddTermSuggestion";
import Terms from "./components/terms/Terms";
import Term from "./components/terms/Term";
import ComputerLogs from "./components/reports/ComputerLogs";
import Logs from "./components/reports/Logs";
import Errors from "./components/reports/Errors";

const App = (props) => {

  // * Available props: -- 04/29/2022 MF
  // * Properties: applicationVersion, copyrightYear -- 04/29/2022 MF

  const componentName = "App";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const routerBaseName = applicationSettings.routerBaseName;
  const defaultPageComponent = applicationSettings.defaultPageComponent;

  const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const profileType = useSelector(state => state.applicationSettings.profileType);
  const computerLog = useSelector(state => state.applicationSettings.computerLog);
  const locationLogged = useSelector(state => state.applicationSettings.locationLogged);
  const applicationAllowUserInteractions = useSelector(state => state.applicationSettings.applicationAllowUserInteractions);

  let showAllMenuItems = useSelector(state => state.applicationSettings.menuSettings.showAllMenuItems);

  let showAbout = useSelector(state => state.applicationSettings.menuSettings.showAbout);

  // * show About page unless set specifically to false. -- 03/06/2021 MF
  if (showAbout !== false) {

    showAbout = true;

  };

  // let showTerms = useSelector(state => state.applicationSettings.menuSettings.showTerms);

  // // * show Terms page unless set specifically to false. -- 03/06/2021 MF
  // if (showTerms !== false) {

  //   showTerms = true;

  // };

  const arrayURLs = useSelector(state => state.urls.arrayURLs);
  const pageURL = useSelector(state => state.urls.pageURL);
  const linkItem = useSelector(state => state.urls.linkItem);

  const arrayTerms = useSelector(state => state.terms.arrayTerms);

  let applicationVersion = isEmpty(props) === false && isEmpty(props.applicationVersion) === false ? props.applicationVersion : "0.0.0";
  let copyrightYear = isEmpty(props) === false && isEmpty(props.copyrightYear) === false ? props.copyrightYear : 2024;

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [url1Loaded, setURL1Loaded] = useState(false);
  const [url2Loaded, setURL2Loaded] = useState(false);


  useEffect(() => {

    if (isEmpty(applicationVersion) === false) {

      dispatch(setApplicationVersion(applicationVersion));

    };

  }, [applicationVersion]);


  useEffect(() => {

    if (isEmpty(copyrightYear) === false) {

      dispatch(setCopyrightYear(copyrightYear));

    };

  }, [copyrightYear]);


  useEffect(() => {

    // * In production, unless you set the REACT_APP_FORCE_LOCAL_API = "True" environment variable, the application will use the production API. -- 07/28/2021 MF
    // * The REACT_APP_FORCE_LOCAL_API = "True" environment variable, is used to force the application when in production to use the local API. -- 07/28/2021 MF

    let appBaseURL = "https://api.philipdick.com/";

    // if (import.meta.env.MODE === "development" && (import.meta.env.REACT_APP_FORCE_LOCAL_API === "True" || import.meta.env.REACT_APP_FORCE_PRODUCTION_API !== "True")) {
    if (import.meta.env.MODE === "development" && import.meta.env.REACT_APP_FORCE_LOCAL_API === "True") {

      appBaseURL = `http://localhost:${import.meta.env.REACT_APP_SERVER_PORT}/`;

    };

    dispatch(setBaseURL(appBaseURL));

    let queryStringData = getQueryStringData();

    // * Retrieve the queryString values if there are any. -- 05/10/2022 MF
    let profileTypeQueryString = isEmpty(queryStringData) === false && isEmpty(queryStringData.profileType) === false ? queryStringData.profileType : null;

    dispatch(setProfileType(profileTypeQueryString));

    let documentURL = new URL(document.URL);

    dispatch(setPageURL(documentURL.pathname.replaceAll(routerBaseName, "").replaceAll("/", "")));

    if (locationLogged === false) {

      // * Only has the IP Address -- 07/29/2021 MF
      // * https://api.ipify.org?format=json -- 07/29/2021 MF

      // let url = "";
      let response = "";
      let data = "";
      let operationValue1 = "Fetching User IP https://geolocation-db.com/json/";

      // * Doesn't have the city, state and postal code anymore for some reason. -- 07/29/2021 MF
      let url1 = "https://geolocation-db.com/json/";

      fetch(url1)
        .then(results => {

          return results.json();

        }).then((results) => {

          data = results;

          // {"country_code":"US","country_name":"United States","city":null,"postal":null,"latitude":37.751,"longitude":-97.822,"IPv4":"65.132.108.210","state":null}

          dispatch(addComputerLog(results));

          setURL1Loaded(true);

        })
        .catch((error) => {

          // console.error(componentName, getDateTime(), operationValue1, "error", error);

          setURL1Loaded(true);

        });

      let operationValue2 = "Fetching User IP https://api.db-ip.com/v2/free/self";

      let url2 = "https://api.db-ip.com/v2/free/self";

      fetch(url2)
        .then(results => {

          return results.json();

        }).then((results) => {

          data = results;

          //   {
          //     "ipAddress": "47.227.241.250",
          //     "continentCode": "NA",
          //     "continentName": "North America",
          //     "countryCode": "US",
          //     "countryName": "United States",
          //     "stateProvCode": "IN",
          //     "stateProv": "Indiana",
          //     "city": "Carmel"
          // }

          if (isEmpty(data.error) === true) {

            dispatch(addComputerLog(results));

          } else {

            // console.error(componentName, getDateTime(), operationValue2, "data.error", data.error);
            // console.error(componentName, getDateTime(), operationValue2, "data.errorCode", data.errorCode);

          };

          setURL2Loaded(true);

        })
        .catch((error) => {

          // console.error(componentName, getDateTime(), operationValue2, "error", error);

          setURL2Loaded(true);

        });

    };

  }, []);


  useEffect(() => {

    if (url1Loaded === true && url2Loaded === true) {

      if (locationLogged === false) {

        addVisitLog();

      };

      setURL1Loaded(false);
      setURL2Loaded(false);

    };

  }, [computerLog, url1Loaded, url2Loaded]);


  useEffect(() => {

    if (isEmpty(pageURL) === false && isNonEmptyArray(arrayURLs) === true) {

      let linkArrayItem = {};

      for (let i = 0; i < arrayURLs.length; i++) {

        linkArrayItem = arrayURLs.find(linkName => linkName.linkName === pageURL.replaceAll("/", ""));
        // setLinkItem(linkArrayItem);

      };

      dispatch(setLinkItem(linkArrayItem));

    };

  }, [pageURL, arrayURLs]);


  const addVisitLog = () => {

    let ipAddress = isEmpty(computerLog) === false && isEmpty(computerLog.ipAddress) === false ? computerLog.ipAddress : "";
    let city = isEmpty(computerLog) === false && isEmpty(computerLog.city) === false ? computerLog.city : "";
    // let state = isEmpty(computerLog) === false && isEmpty(computerLog.stateProv) === false ? computerLog.stateProv : "";
    let state = isEmpty(computerLog) === false && isEmpty(computerLog.state) === false ? computerLog.state : "";
    let countryCode = isEmpty(computerLog) === false && isEmpty(computerLog.countryCode) === false ? computerLog.countryCode : "";
    let countryName = isEmpty(computerLog) === false && isEmpty(computerLog.countryName) === false ? computerLog.countryName : "";
    let continentCode = isEmpty(computerLog) === false && isEmpty(computerLog.continentCode) === false ? computerLog.continentCode : "";
    let continentName = isEmpty(computerLog) === false && isEmpty(computerLog.continentName) === false ? computerLog.continentName : "";
    let stateProvCode = isEmpty(computerLog) === false && isEmpty(computerLog.stateProvCode) === false ? computerLog.stateProvCode : "";

    let latitude = isEmpty(computerLog) === false && isEmpty(computerLog.latitude) === false ? computerLog.latitude : "";
    let longitude = isEmpty(computerLog) === false && isEmpty(computerLog.longitude) === false ? computerLog.longitude : "";
    let postal = isEmpty(computerLog) === false && isEmpty(computerLog.postal) === false ? computerLog.postal : "";

    let href = isEmpty(window.location.href) === false ? window.location.href : "";

    let url = `${baseURL}computerLogs/`;
    let response = "";
    let data = "";
    let operationValue = "Update Computer Log";

    let recordObject = {};

    recordObject = {

      title: "Homepage",
      href: href,
      // applicationVersion: props.applicationVersion,
      applicationVersion: applicationVersion,

      lastAccessed: getDateTime(),

      // * For https://api.db-ip.com/v2/free/self -- 07/29/2021 MF
      ipAddress: ipAddress,
      city: city,
      // state: stateProv,
      state: state,
      countryCode: countryCode,
      countryName: countryName,
      continentCode: continentCode,
      continentName: continentName,
      stateCode: stateProvCode,

      // * From https://geolocation-db.com/json/ -- 07/29/2021 MF
      latitude: latitude,
      longitude: longitude,
      postal: postal

    };

    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ recordObject: recordObject })
    })
      .then(results => {

        if (results.ok !== true) {

          // throw Error(results.status + " " + results.statusText + " " + results.url);

        } else {

          if (results.status === 200) {

            return results.json();

          } else {

            return results.status;

          };

        };

      })
      .then(results => {

        data = results;

        dispatch(setLocationLogged(true));

      })
      .catch((error) => {

        console.error(componentName, getDateTime(), operationValue, "addVisitLog error", error);

        // addErrorMessage(`${operationValue}: ${error.name}: ${error.message}`);

        // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), { url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  const redirectPage = (linkName) => {

    // * Scroll to top of the page after clicking the link. -- 08/05/2021 MF
    window.scrollTo(0, 0);

    dispatch(setPageURL(linkName.replaceAll("/", "")));
    navigate("/" + linkName);

  };


  return (
    <React.Fragment>

      <Navbar color="light" light>
        <Nav>

          <NavItem>
            <NavLink tag={Link} to="/"><NavbarText>Home</NavbarText></NavLink>
          </NavItem>

          {/* {showTerms === true || showAllMenuItems === true ?

            <NavItem>
              <NavLink tag={Link} to="/terms"><NavbarText>Terms</NavbarText></NavLink>
            </NavItem>

            : null} */ }

          {showAbout === true || showAllMenuItems === true ?

            <NavItem>
              <NavLink tag={Link} to="/about"><NavbarText>About Philip K. Dick</NavbarText></NavLink>
            </NavItem>

            : null}

          <NavItem className="mx-3 my-2">
            <a href="https://sfdictionary.com" target="_blank" rel="noopener"><NavbarText>Historical Dictionary of Science Fiction</NavbarText></a>
          </NavItem>

          <NavItem className="mx-3 my-2">
            <a href="http://www.technovelgy.com/ct/AuthorTotalAlphaList.asp?AuNum=13" target="_blank" rel="noopener"><NavbarText>Philip K. Dick:
              Science Fiction Technology and Ideas</NavbarText></a>
          </NavItem>

          {/* {applicationAllowUserInteractions === true && isEmpty(sessionToken) === false ?

            <NavItem>
              <AddTermSuggestion displayButton={true} />
            </NavItem>

            : null} */ }

        </Nav>
      </Navbar>

      <Container className="body-container mb-5">

        <p>Add a list of categories in the pill layout.</p>

        <Row>
          <Col xs="10">

            <Row className="text-center">

              {/* {isEmpty(linkItem) === false && isEmpty(linkItem.linkName)===false ? <Alert color="info">{JSON.stringify(linkItem, null, 1)}</Alert> : null} */}

              <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
              <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

              <LoadApplicationSettings />
              <LoadTermData />
              <LoadBibliographyData />

            </Row>

            <Routes>

              {/* // * Set the default page from the defaultPageComponent from environment. -- 03/06/2021 MF */}
              {defaultPageComponent === "Home" ? <Route path="/" element={<Home redirectPage={redirectPage} />} /> : null}
              {defaultPageComponent === "About" ? <Route path="/" element={<About redirectPage={redirectPage} />} /> : null}

              <Route path="/home" element={<Home redirectPage={redirectPage} />} />
              <Route path="/about" element={<About redirectPage={redirectPage} />} />

              {/* // ! Can't add this security to the routes because it interferes with the routes below these. -- 12/19/2021 MF */}
              {/* {isEmpty(admin) === false && admin === true ?

                <React.Fragment> */ }

              <Route path="/computerLogs" element={<ComputerLogs />} />

              <Route path="/logs" element={<Logs />} />

              <Route path="/errors" element={<Errors />} />

              {/* </React.Fragment>

                : null} */ }

              {/* // * This route no longer works. Fixed. -- 03/06/2021 MF */}
              <Route path="/terms" element={<Terms redirectPage={redirectPage} />} />

              {/* // ! These need to stay at the bottom of the list so that the links above will work properly. -- 03/06/2021 MF */}
              {isEmpty(linkItem) === false && isEmpty(linkItem.linkName) === false && linkItem.linkType === "terms" ? <Route path="/:linkName" element={<Term redirectPage={redirectPage} linkItem={linkItem} />} /> : null}

            </Routes>

          </Col>
          <Col xs="2">

            {isEmpty(arrayTerms) === false ? <Terms redirectPage={redirectPage} /> : null}

          </Col>
        </Row>
        <Row>
          <Col xs="12" className="smaller-text text-center">

            &copy; {copyrightYear} All rights reserved. Version: {applicationVersion}

          </Col>
        </Row>
      </Container>

    </React.Fragment>
  );
};

export default App;
