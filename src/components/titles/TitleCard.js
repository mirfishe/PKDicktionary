import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardText, CardHeader, CardFooter, CardImg, Alert } from "reactstrap";
import { Image } from "react-bootstrap-icons";
import applicationSettings from "../../app/environment";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray, displayYear, truncateText } from "shared-functions";
import { encodeURL, decodeURL, setLocalPath, setLocalImagePath } from "../../utilities/ApplicationFunctions";

const TitleCard = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: additionalText, headerText, imageSide, linkName, showShortDescription -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "TitleCard";

  // ! Loading the baseURL from the state store here is too slow. -- 03/06/2021 MF
  // ! Always pulling it from environment.js. -- 03/06/2021 MF
  // const baseURL = useSelector(state => state.applicationSettings.baseURL);
  const baseURL = applicationSettings.baseURL;

  // const sessionToken = useSelector(state => state.user.sessionToken);
  // const admin = useSelector(state => state.user.admin);

  const arrayTitles = useSelector(state => state.titles.arrayTitles);

  let additionalText = isEmpty(props) === false && isEmpty(props.additionalText) === false ? props.additionalText : "";
  let headerText = isEmpty(props) === false && isEmpty(props.headerText) === false ? props.headerText : "";
  let imageSide = isEmpty(props) === false && isEmpty(props.imageSide) === false ? props.imageSide : "left";
  let linkName = isEmpty(props) === false && isEmpty(props.linkName) === false ? props.linkName : "";
  let showShortDescription = isEmpty(props) === false && isEmpty(props.showShortDescription) === false ? props.showShortDescription : "";
  let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

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

                        <Link to={title.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(title.titleURL); }}>
                          {isEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="no-image-icon" />}
                        </Link>

                      </Col>

                      : null}

                    <Col className="col-md-8">
                      <CardBody>

                        {/* <CardText><Link to={title.replaceAll("-", "|").replaceAll(" ", "-")}>{title.category}</Link></CardText> */}

                        <CardText><Link to={title.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(title.titleURL); }}>{title.titleName}</Link>

                          {isEmpty(title.publicationDate) === false ? <span className="ms-1 smaller-text">({displayYear(title.publicationDate)})</span> : null}</CardText>

                        <CardText className="smaller-text">{title.authorFirstName} {title.authorLastName}</CardText>

                        {isEmpty(additionalText) === false ? <CardText className="my-4">{additionalText}</CardText> : null}

                        {showShortDescription && isEmpty(title.shortDescription) === false ? <p className="my-4 display-paragraphs">{truncateText(title.shortDescription, 250)}</p> : null}

                        {/* {isEmpty(admin) === false && admin === true ? <AddTitle displayButton={true} /> : null}
                                {isEmpty(admin) === false && admin === true ? <EditTitle titleID={title.titleID} displayButton={true} /> : null}
                                {isEmpty(admin) === false && admin === true ? <EditEdition titleID={title.titleID} titlePublicationDate={title.publicationDate} titleImageName={title.imageName} displayButton={true} /> : null} */}

                      </CardBody>
                    </Col>

                    {imageSide === "right" ?

                      <Col className="col-md-4">

                        <Link to={title.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(title.titleURL); }}>
                          {isEmpty(title.imageName) === false ? <CardImg onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + title.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(title.imageName)} alt={title.titleName} /> : <Image className="no-image-icon" />}
                        </Link>

                      </Col>

                      : null}

                  </Row>
                  <CardFooter className="card-footer">

                    <CardText><Link to={encodeURL(titleList[0].category)} onClick={(event) => { event.preventDefault(); redirectPage(encodeURL(titleList[0].category)); }}>{titleList[0].category}</Link></CardText>

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

export default TitleCard;
