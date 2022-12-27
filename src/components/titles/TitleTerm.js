import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import applicationSettings from "../../app/environment";
import { isEmpty, getDateTime, isNonEmptyArray, displayYear, truncateText } from "shared-functions";
import { encodeURL, setLocalImagePath } from "../../utilities/ApplicationFunctions";

const TitleTerm = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: termTitle -- 10/21/2022 MF

  const componentName = "TitleTerm";

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  // const sessionToken = useSelector(state => state.user.sessionToken);
  // const admin = useSelector(state => state.user.admin);

  const arrayTitles = useSelector(state => state.titles.arrayTitles);

  let termTitle = isEmpty(props) === false && isEmpty(props.termTitle) === false ? props.termTitle : {};
  let headerText = isEmpty(props) === false && isEmpty(props.headerText) === false ? props.headerText : "";
  let imageSide = isEmpty(props) === false && isEmpty(props.imageSide) === false ? props.imageSide : "left";
  let linkName = isEmpty(props) === false && isEmpty(props.linkName) === false ? props.linkName : "";
  let showShortDescription = isEmpty(props) === false && isEmpty(props.showShortDescription) === false ? props.showShortDescription : "";

  const [titleParam, setTitleParam] = useState(null);
  const [titleList, setTitleList] = useState([]);

  const [errTitleMessage, setErrTitleMessage] = useState("");


  useEffect(() => {

    if (isEmpty(linkName) === false) {

      setTitleParam(linkName);

    };

  }, [linkName]);


  useEffect(() => {

    let newTitleList = [];

    // * If titleParam is a number, then it's the titleID
    if (isNaN(titleParam) === false) {

      newTitleList = arrayTitles.filter(title => (title.titleActive === true || title.titleActive === 1) && title.titleID === parseInt(titleParam));

    } else if (isEmpty(titleParam) === false) {

      // * If titleParam is not a number, then it's the title name
      newTitleList = arrayTitles.filter(title => (title.titleActive === true || title.titleActive === 1) && title.titleURL === titleParam);

    } else {

      // console.error("Title not found.");
      // * Display all active titles
      // newTitleList = [...arrayTitles];

    };

    setTitleList(newTitleList);

  }, [titleParam, arrayTitles]);


  useEffect(() => {

    if (isEmpty(titleList) === false) {

      setErrTitleMessage("");

    } else {

      // setErrTitleMessage("Title not found.");

    };

  }, [titleList]);


  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col className="text-center" xs="12">

          {isEmpty(errTitleMessage) === false ? <Alert color="danger">{errTitleMessage}</Alert> : null}
          {isEmpty(headerText) === false ? <h4 className="text-center">{headerText}</h4> : null}

        </Col>
      </Row>

      {isNonEmptyArray(titleList) === true ?

        <Row className="justify-content-center">

          {titleList.map((title) => {

            return (
              <Col key={title.titleID} xs="8" className="mb-4">
                <Card>
                  <Row className="no-gutters">

                    {imageSide === "left" ?

                      <Col className="col-md-4">

                        <a href={"https://philipdick.com/pkd-and-me/" + linkName.replaceAll("/", "")} target="_blank" rel="noopener noreferrer">
                          {isEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="no-image-icon" />}
                        </a>

                      </Col>

                      : null}

                    <Col className="col-md-8">
                      <CardBody>

                        {/* <CardText><Link to={title.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category}</Link></CardText> */}

                        <CardText><a href={"https://philipdick.com/pkd-and-me/" + linkName.replaceAll("/", "")} target="_blank" rel="noopener noreferrer">{title.titleName}</a>

                          {isEmpty(title.publicationDate) === false ? <span className="ms-1 smaller-text">({displayYear(title.publicationDate)})</span> : null}</CardText>

                        <CardText className="smaller-text">{title.authorFirstName} {title.authorLastName}</CardText>

                        {showShortDescription === true && isEmpty(title.shortDescription) === false ? <p className="my-4 display-paragraphs">{truncateText(title.shortDescription, 250)}</p> : null}

                        {isEmpty(termTitle.quotation) === false ? <p className="my-4 display-paragraphs">{truncateText(termTitle.quotation, 250)}</p> : null}

                        {/* {isEmpty(admin) === false && admin === true ? <AddTitle displayButton={true} /> : null}
                                {isEmpty(admin) === false && admin === true ? <EditTitle titleID={title.titleID} displayButton={true} /> : null}
                                {isEmpty(admin) === false && admin === true ? <EditEdition titleID={title.titleID} titlePublicationDate={title.publicationDate} titleImageName={title.imageName} displayButton={true} /> : null} */}

                      </CardBody>
                    </Col>

                    {imageSide === "right" ?

                      <Col className="col-md-4">

                        <a href={"https://philipdick.com/pkd-and-me/" + linkName.replaceAll("/", "")} target="_blank" rel="noopener noreferrer">
                          {isEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="no-image-icon" />}
                        </a>

                      </Col>

                      : null}

                  </Row>
                  <CardFooter className="card-footer">

                    <CardText><a href={"https://philipdick.com/pkd-and-me/" + encodeURL(titleList[0].category)} target="_blank" rel="noopener noreferrer">{titleList[0].category}</a></CardText>

                  </CardFooter>
                </Card>

              </Col>
            );
          })}

        </Row>

        : null}

    </Container>
  );
};

export default TitleTerm;