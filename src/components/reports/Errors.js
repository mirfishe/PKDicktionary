import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Col, Row, Table, } from "reactstrap";
import { isEmpty, getDateTime, isNonEmptyArray, addErrorLog } from "shared-functions";

const Errors = () => {

  const componentName = "Errors";

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

  const [errors, setErrors] = useState([]);


  useEffect(() => {

    if (isEmpty(baseURL) === false) {

      getErrors();

    };

  }, [baseURL]);


  useEffect(() => {

    if (admin !== true) {

      navigate("/");

    };

  }, [admin]);


  const getErrors = () => {

    clearMessages();

    let url = baseURL + "errors/";

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

          setErrors(results.records);

        };

      })
      .catch((error) => {

        // console.error(componentName, getDateTime(), "getNews error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <Container className="mt-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      <Row>
        <Col xs="12">

          <h5 className="text-center">Errors</h5>

          {isNonEmptyArray(errors) === true ?

            <Table responsive>
              <thead>
                <tr>
                  <th>Create Date</th>
                  <th>Operation</th>
                  <th>Component Name</th>
                  <th>Transaction Data</th>
                  <th>Error Data</th>
                </tr>
              </thead>

              <tbody>

                {errors.map((error, index) => {

                  return (
                    <tr key={index}>
                      {isEmpty(error.createDate) === false ? <td>{error.createDate.slice(0, 19).replace("T", " ")}</td> : <td>{error.createDate}</td>}
                      <td>{error.operation}</td>
                      <td>{error.componentName}</td>
                      <td>{error.transactionData}</td>
                      <td>{error.errorData}</td>
                    </tr>
                  );
                })}


              </tbody>

            </Table>

            : <p>There are no errors.</p>}

        </Col>
      </Row>

    </Container>
  );
};

export default Errors;
