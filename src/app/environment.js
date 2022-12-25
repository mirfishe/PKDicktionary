
let applicationSettings = {};

let profileType = "";

// let hostname = window.location.hostname;
let API_URL = "";
let baseURL = "/";
let siteName = "";
let applicationName = "";
let metaDescription = "";
let defaultPageComponent = "";
let routerBaseName = "";
let applicationAllowUserInteractions = true;
let requireUserLogin = true;

let tagManagerArgs = {
  gtmId: ""
};

let menuSettings = {
  "showAllMenuItems": false,

  "showTerms": true,
  "showAbout": true
};

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    profileType = "localhost";
    break;
  case "pkdicktionary.com":
    profileType = "pkdicktionary";
    break;
  case "www.pkdicktionary.com":
    profileType = "pkdicktionary";
    break;
  case "philipkdicktionary.com":
    profileType = "pkdicktionary";
    break;
  case "www.philipkdicktionary.com":
    profileType = "pkdicktionary";
    break;
  default:
    profileType = "";
};

switch (profileType) {
  case "localhost":
    // API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
    API_URL = "https://api.philipdick.com";
    siteName = "localhost";
    applicationName = "Philip K. Dicktionary";
    metaDescription = "The work of Philip K. Dick references concepts, technologies and ideas in a type of shared universe so that things will appear in more than on novel or short story. This Dicktionary collects those terms with definitions, categorizations and references to the works in which the terms occur.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    applicationAllowUserInteractions = true;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "";
    break;
  case "pkdicktionary":
    API_URL = "https://api.philipdick.com";
    siteName = "PKDicktionary";
    applicationName = "Philip K. Dicktionary";
    metaDescription = "The work of Philip K. Dick references concepts, technologies and ideas in a type of shared universe so that things will appear in more than on novel or short story. This Dicktionary collects those terms with definitions, categorizations and references to the works in which the terms occur.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    applicationAllowUserInteractions = true;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "G-R19F1QTTXS";
    break;
  default:
    // API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
    API_URL = "https://api.philipdick.com";
    siteName = "PKDicktionary";
    applicationName = "Philip K. Dicktionary";
    metaDescription = "The work of Philip K. Dick references concepts, technologies and ideas in a type of shared universe so that things will appear in more than on novel or short story. This Dicktionary collects those terms with definitions, categorizations and references to the works in which the terms occur.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    applicationAllowUserInteractions = true;
    requireUserLogin = true;
    tagManagerArgs.gtmId = "";
};

// * Override the profileType setting to test the applicationSetting files
// profileType = "localhost";
// profileType = "pkdicktionary";
// profileType = "";

// * Override the applicationAllowUserInteractions setting
// applicationAllowUserInteractions = true;
// applicationAllowUserInteractions = false;

Object.assign(applicationSettings, { hostname: window.location.hostname });
Object.assign(applicationSettings, { profileType: profileType });
Object.assign(applicationSettings, { API_URL: API_URL });
Object.assign(applicationSettings, { baseURL: API_URL + baseURL });
Object.assign(applicationSettings, { siteName: siteName });
Object.assign(applicationSettings, { applicationName: applicationName });
Object.assign(applicationSettings, { metaDescription: metaDescription });
Object.assign(applicationSettings, { defaultPageComponent: defaultPageComponent });
Object.assign(applicationSettings, { routerBaseName: routerBaseName });
Object.assign(applicationSettings, { applicationAllowUserInteractions: applicationAllowUserInteractions });
Object.assign(applicationSettings, { requireUserLogin: requireUserLogin });
Object.assign(applicationSettings, { tagManagerArgs: tagManagerArgs });
Object.assign(applicationSettings, { menuSettings: menuSettings });

export default applicationSettings;