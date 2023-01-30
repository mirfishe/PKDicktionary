import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, Table, } from "reactstrap";
import { isEmpty, getDateTime, isNonEmptyArray, displayDate, addErrorLog } from "shared-functions";

const TermSuggestions = () => {

  // ! The coding on this component is not finished. -- 03/06/2021 MF

  const componentName = "TermSuggestions";

  const navigate = useNavigate();

  const baseURL = useSelector(state => state.applicationSettings.baseURL);

  const sessionToken = useSelector(state => state.user.sessionToken);
  const admin = useSelector(state => state.user.admin);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const clearMessages = () => { setMessage(""); setErrorMessage(""); setMessageVisible(false); setErrorMessageVisible(false); };
  const addMessage = (message) => { setMessage(message); setMessageVisible(true); };
  const addErrorMessage = (message) => { setErrorMessage(message); setErrorMessageVisible(true); };
  const onDismissMessage = () => setMessageVisible(false);
  const onDismissErrorMessage = () => setErrorMessageVisible(false);

  const [termSuggestions, setTermSuggestions] = useState([]);


  useEffect(() => {

    getTermSuggestions();

  }, []);


  useEffect(() => {

    if (admin !== true) {

      navigate("/");

    };

  }, [admin]);


  const getTermSuggestions = () => {

    clearMessages();

    let url = baseURL + "termSuggestions/";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": sessionToken
      }),
    })
      .then(results => {

        if (results.ok !== true) {

          throw Error(`${results.status} ${results.statusText} ${results.url}`);

        } else {

          return results.json();

        };

      })
      .then(results => {

        if (isEmpty(results) === false && results.transactionSuccess === true) {

          setTermSuggestions(results.records);

        };

      })
      .catch((error) => {

        // console.error(componentName, getDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <Container className="my-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      <Row>
        <Col xs="12">

          <h5 className="text-center">Term Suggestions</h5>

        </Col>
      </Row>

      {isNonEmptyArray(termSuggestions) === true ?

        <Row>

          {termSuggestions.map((termSuggestion) => {

            return (
              <Col key={termSuggestion.termSuggestionID} className="my-4" xs="12">

                <Row>
                  <Col xs="12">

                    <h6>{termSuggestion.termName}
                      {isEmpty(termSuggestion.publicationDate) === false ? <span className="ms-2 smaller-text"> ({displayDate(termSuggestion.publicationDate)})</span> : null}
                    </h6>

                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col xs="12">

                    <p>{termSuggestion.authorFirstName} {termSuggestion.authorLastName}</p>

                  </Col>
                </Row>

                <Row>
                  <Col xs="12">

                    {isEmpty(termSuggestion.shortDescription) === false ? <p className="display-paragraphs">{termSuggestion.shortDescription}</p> : null}

                  </Col>
                </Row>

                <Row>
                  <Col xs="12">

                    {isEmpty(termSuggestion.termURL) === false ? <p>{termSuggestion.termURL}</p> : null}

                  </Col>
                </Row>

                <Row>
                  <Col xs="12">

                    <p>Suggested by {isEmpty(termSuggestion.firstName) === false ? termSuggestion.firstName : null} {isEmpty(termSuggestion.lastName) === false ? termSuggestion.lastName : null} {isEmpty(termSuggestion.emailAddress) === false ? termSuggestion.emailAddress : null} {isEmpty(termSuggestion.updateDate) === false ? <small>on {displayDate(termSuggestion.updateDate)}</small> : null}</p>

                  </Col>
                </Row>

              </Col>
            );
          })}

        </Row>

        : null}

    </Container>
  );
};

export default TermSuggestions;
