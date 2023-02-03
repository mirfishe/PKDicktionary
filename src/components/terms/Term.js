import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { Container, Col, Row, Alert } from "reactstrap";
// import { Image } from "react-bootstrap-icons";
import { noFunctionAvailable, isEmpty, getDateTime, isNonEmptyArray, addErrorLog } from "shared-functions";
// import { encodeURL, decodeURL, setLocalPath, setLocalImagePath } from "../../utilities/ApplicationFunctions";
import TitleTerm from "../titles/TitleTerm";

const Term = (props) => {

  // * Available props: -- 10/21/2022 MF
  // * Properties: linkItem -- 10/21/2022 MF
  // * Functions: redirectPage -- 10/21/2022 MF

  const componentName = "Term";

  const profileType = useSelector(state => state.applicationSettings.profileType);
  const baseURL = useSelector(state => state.applicationSettings.baseURL);

  // const sessionToken = useSelector(state => state.user.sessionToken);
  // const admin = useSelector(state => state.user.admin);

  const arrayTerms = useSelector(state => state.terms.arrayTerms);

  let linkItem = isEmpty(props) === false && isEmpty(props.linkItem) === false ? props.linkItem : null;
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

  const [term, setTerm] = useState({});
  const [termCategories, setTermCategories] = useState([]);
  const [termSynonyms, setTermSynonyms] = useState([]);
  const [termAlternateForms, setTermAlternateForms] = useState([]);
  const [termTitles, setTermTitles] = useState([]);

  let previousQuotation = "";
  let previousCategoryID = 0;
  let previousSynonymID = 0;
  let previousAlternateFormID = 0;


  useEffect(() => {

    if (isEmpty(linkItem) === false && isEmpty(linkItem.linkID) === false) {

      getTerm(linkItem.linkID);

    };

  }, [linkItem, arrayTerms]);


  const getTerm = (termID) => {

    let url = baseURL + `terms/${termID}`;

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
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

          setTerm(results.records[0]);

          setTermCategories(results.records.sort());
          setTermSynonyms(results.records.sort());
          setTermAlternateForms(results.records.sort());

          setTermTitles(results.records);

        };

      })
      .catch((error) => {

        // console.error(componentName, getDateTime(), "getTerm error", error);

        addErrorMessage(error.name + ": " + error.message);

        // addErrorLog(baseURL, getFetchAuthorization(), databaseAvailable, allowLogging(), {  url: url, response: { ok: response.ok, redirected: response.redirected, status: response.status, statusText: response.statusText, type: response.type, url: response.url }, recordObject, errorData: { name: error.name, message: error.message, stack: error.stack } });

      });

  };


  return (
    <Container className="mt-4">

      <Alert color="info" isOpen={messageVisible} toggle={onDismissMessage}>{message}</Alert>
      <Alert color="danger" isOpen={errorMessageVisible} toggle={onDismissErrorMessage}>{errorMessage}</Alert>

      {isEmpty(term) === false ?

        <React.Fragment>

          <Row className="mt-3">
            <Col xs="12">

              <h4>{term.term}</h4>

              <p>{isEmpty(term.partOfSpeech) === false ? <React.Fragment>({term.partOfSpeech})</React.Fragment> : null} {term.definition}</p>

              {isEmpty(term.parentTermID) === false ?

                <p>Parent Term: <a href="#" onClick={(event) => { event.preventDefault(); getTerm(term.parentTermID); }}>{term.termParent}</a></p>

                : null}

              {isNonEmptyArray(termCategories) === true ?

                <React.Fragment>

                  <h5>Categories:</h5>

                  <p>

                    {termCategories.map((termCategory, index) => {

                      let newCategory = previousCategoryID !== termCategory.termCategoryID ? true : false;

                      previousCategoryID = termCategory.termCategoryID;

                      return (
                        <React.Fragment key={index}>

                          {isEmpty(termCategory.termCategory) === false && newCategory === true ?

                            <React.Fragment>

                              {index !== 0 ?

                                <React.Fragment>,&nbsp;</React.Fragment>

                                : null}

                              {termCategory.termCategory}

                            </React.Fragment>

                            : null}

                        </React.Fragment>
                      );
                    })}

                  </p>

                </React.Fragment>

                : null}

              {isNonEmptyArray(termAlternateForms) === true ?

                <React.Fragment>

                  <h5>Alternate Forms:</h5>

                  <p>

                    {termAlternateForms.map((alternateForm, index) => {

                      let newAlternateForm = previousAlternateFormID !== alternateForm.alternateFormID ? true : false;

                      previousAlternateFormID = alternateForm.alternateFormID;

                      return (
                        <React.Fragment key={index}>

                          {isEmpty(alternateForm.alternateFormID) === false && newAlternateForm === true ?

                            <React.Fragment>

                              {index !== 0 ?

                                <React.Fragment>,&nbsp;</React.Fragment>

                                : null}

                              <a href="#" onClick={(event) => { event.preventDefault(); getTerm(alternateForm.alternateFormID); }}>{alternateForm.termsAlternateForm}</a>

                            </React.Fragment>

                            : null}

                        </React.Fragment>
                      );
                    })}

                  </p>

                </React.Fragment>

                : null}

              {isNonEmptyArray(termSynonyms) === true ?

                <React.Fragment>

                  <h5>Synonyms:</h5>

                  <p>

                    {termSynonyms.map((termSynonym, index) => {

                      let newSynonym = previousSynonymID !== termSynonym.synonymID ? true : false;

                      previousSynonymID = termSynonym.synonymID;

                      return (
                        <React.Fragment key={index}>

                          {isEmpty(termSynonym.synonymID) === false && newSynonym === true ?

                            <React.Fragment>

                              {index !== 0 ?

                                <React.Fragment>,&nbsp;</React.Fragment>

                                : null}

                              <a href="#" onClick={(event) => { event.preventDefault(); getTerm(termSynonym.synonymID); }}>{termSynonym.termsSynonym}</a>

                            </React.Fragment>

                            : null}

                        </React.Fragment>
                      );
                    })}

                  </p>

                </React.Fragment>

                : null}

            </Col>
          </Row>

          {isNonEmptyArray(termTitles) === true ?

            <Row className="mt-3">

              {termTitles.map((termTitle, index) => {

                let newQuotation = previousQuotation !== termTitle.quotation ? true : false;

                previousQuotation = termTitle.quotation;

                return (
                  <React.Fragment key={index}>

                    {isEmpty(termTitle.quotation) === false && newQuotation === true ?

                      <React.Fragment>

                        <TitleTerm linkName={termTitle.titleURL} showShortDescription={true} termTitle={termTitle} imageSide="right" />

                        { /* <Col key={termTitle.titleID} xs="6" className="mb-4">

                          <Link to={termTitle.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(termTitle.titleURL); }}>{termTitle.titleName}</Link>

                          {isEmpty(termTitle.publicationDate) === false ? <span className="ms-1 smaller-text">({displayYear(termTitle.publicationDate)})</span> : null}

                          <Link to={termTitle.titleURL} onClick={(event) => { event.preventDefault(); redirectPage(termTitle.titleURL); }}>

                            {isEmpty(termTitle.imageName) === false ? <Image onError={() => { console.error("Title image not loaded!"); fetch(baseURL + "titles/broken/" + termTitle.titleID, { method: "GET", headers: new Headers({ "Content-Type": "application/json" }) }); }} src={setLocalImagePath(termTitle.imageName, profileType)} alt={termTitle.titleName} /> : <Image className="no-image-icon" />}

                          </Link>

                        </Col> */ }

                      </React.Fragment>

                      : null}

                  </React.Fragment>
                );
              })}

            </Row>

            : null}

        </React.Fragment>

        : null}

    </Container>
  );
};

export default Term;
