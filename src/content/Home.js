import React from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row } from "reactstrap";
import { noFunctionAvailable, isEmpty, getDateTime } from "shared-functions";
import { setLocalPath, setLocalImagePath } from "../utilities/ApplicationFunctions";

const Home = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "Home";

  const profileType = useSelector(state => state.applicationSettings.profileType);
  const siteName = useSelector(state => state.applicationSettings.siteName);
  const applicationName = useSelector(state => state.applicationSettings.applicationName);

  let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

  document.title = "Home | " + applicationName + " | " + siteName;


  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12">

          <h3 className="text-center">Philip K. Dicktionary</h3>

          <h6 className="text-center">A dictionary of terms created by or specific to Philip K. Dick.</h6>

        </Col>
      </Row>

      <Row>
        <Col xs="10">

          <p>The work of Philip K. Dick references concepts, technologies and ideas in a type of shared universe so that things will appear in more than on novel or short story. This Dicktionary collects those terms with definitions, categorizations and references to the works in which the terms occur.</p>

          <p>Earlier work at collecting this information (and the kernel of the information included here) is located at <a href="https://philipdick.com/resources/miscellaneous/pkdicktionary" target="_blank" rel="noopener">PKDicktionary</a> in the <a href="https://philipdick.com" target="_blank" rel="noopener">Philip K. Dick site</a>.</p>

          <p>Future improvements are the ability to suggest terms for inclusion into the Dicktionary and the ability to view information about the works that the terms appear in.</p>

          <p>If you have any comments, questions or suggestions, please email philipkdickfans[at]gmail[dot]com</p>

        </Col>
        <Col xs="2">

          <img src={setLocalImagePath("https://philipdick.com/images/PKD/Philip_Dick2.jpg", profileType)} alt="Philip K. Dick" />

        </Col>
      </Row>

    </Container>
  );
};

export default Home;
