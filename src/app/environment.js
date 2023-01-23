
let applicationSettings = {};

let profileType = "";
let metaDescription = "";
let defaultPageComponent = "";
let routerBaseName = "";

let tagManagerArgs = {
  gtmId: ""
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
    metaDescription = "The work of Philip K. Dick references concepts, technologies and ideas in a type of shared universe so that things will appear in more than on novel or short story. This Dicktionary collects those terms with definitions, categorizations and references to the works in which the terms occur.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    tagManagerArgs.gtmId = "";
    break;
  case "pkdicktionary":
    metaDescription = "The work of Philip K. Dick references concepts, technologies and ideas in a type of shared universe so that things will appear in more than on novel or short story. This Dicktionary collects those terms with definitions, categorizations and references to the works in which the terms occur.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    tagManagerArgs.gtmId = "G-R19F1QTTXS";
    break;
  default:
    metaDescription = "The work of Philip K. Dick references concepts, technologies and ideas in a type of shared universe so that things will appear in more than on novel or short story. This Dicktionary collects those terms with definitions, categorizations and references to the works in which the terms occur.";
    defaultPageComponent = "Home";
    routerBaseName = "";
    tagManagerArgs.gtmId = "";
};

// * Override the profileType setting to test the applicationSetting files
// profileType = "localhost";
// profileType = "pkdicktionary";
// profileType = "";

Object.assign(applicationSettings, { hostname: window.location.hostname });
Object.assign(applicationSettings, { profileType: profileType });
Object.assign(applicationSettings, { metaDescription: metaDescription });
Object.assign(applicationSettings, { defaultPageComponent: defaultPageComponent });
Object.assign(applicationSettings, { routerBaseName: routerBaseName });
Object.assign(applicationSettings, { tagManagerArgs: tagManagerArgs });

export default applicationSettings;