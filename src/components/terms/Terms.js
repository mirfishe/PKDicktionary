import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { Container, Col, Row, Alert } from "reactstrap";
// import { Image } from "react-bootstrap-icons";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray } from "shared-functions";
import { encodeURL, decodeURL, setLocalPath, setLocalImagePath, addErrorLog } from "../../utilities/ApplicationFunctions";

const Terms = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "Terms";

  // const sessionToken = useSelector(state => state.user.sessionToken);
  // const admin = useSelector(state => state.user.admin);

  const arrayTerms = useSelector(state => state.terms.arrayTerms);

  let redirectPage = isEmpty(props) === false && isEmpty(props.redirectPage) === false ? props.redirectPage : noFunctionAvailable;

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);


  return (
    <Container className="mt-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      {isNonEmptyArray(arrayTerms) === true ?

        <Row>
          <Col xs="12">

            <h4 className="text-center mb-4">Terms</h4>

            {arrayTerms.map((term, index) => {

              return (
                <React.Fragment key={index}>

                  { /* {index !== 0 ?

                    <React.Fragment>,&nbsp;</React.Fragment>

                    : null} */ }

                  <a href="#" onClick={(event) => { event.preventDefault(); redirectPage(encodeURL(term.term)); /* getTerm(term.termID); */ }}>{term.term}</a><br />

                </React.Fragment>
              );
            })}

          </Col>
        </Row>

        : null}

    </Container>
  );
};

export default Terms;
