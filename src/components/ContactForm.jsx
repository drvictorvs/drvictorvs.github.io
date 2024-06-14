import React from "react";
import { useAppContext } from "../appContext";
// Data
// import { formspreeUrl } from "../data";
// Components
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import LangEN from "../translations/LangEN";
import LangPT from "../translations/LangPT";

const formspreeUrl = "https://formspree.com.io/f/drvictorvs";

export default function ContactForm() {
  const [isValidated, setIsValidated] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [danger, setDanger] = React.useState(false);
  const [dangerMessage, setDangerMessage] = React.useState(null);
  const { lang, themeName } = useAppContext();
  const strings = lang === "en" ? LangEN.contact : LangPT.contact;

  async function postData(data) {
    const response = await fetch(formspreeUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  async function handleSubmit(event) {
    const form = event.currentTarget;
    setSuccess(false);
    setDanger(false);
    setDangerMessage(null);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setIsValidated(true);
    const { name, email, message } = form.elements;
    const data = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    if (form.checkValidity()) {
      event.preventDefault();
      event.persist();
      setIsProcessing(true);
      try {
        const response = await postData(data);
        if (!response.ok) {
          throw new Error(
            `${response.status} ${response.statusText}, check formspreeUrl in data.js`
          );
        }
        setIsProcessing(false);
        setIsValidated(false);
        event.target.reset();
        setSuccess(true);
      } catch (error) {
        setIsProcessing(false);
        setIsValidated(false);
        event.target.reset();
        setDangerMessage(error.message);
        setDanger(true);
      }
    }
  }

  return (
    <>
      <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
        <Form.Group className="mx-auto mb-3 form-group" controlId="name">
          <Form.Label>{strings.name}</Form.Label>
          <Form.Control required type="text" placeholder={strings.namePrefill} />
          <Form.Control.Feedback type="invalid">
            <h5>{strings.nameCheck}</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="email">
          <Form.Label>{strings.email}</Form.Label>
          <Form.Control
            required
            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
            placeholder={strings.emailPrefill}
          />
          <Form.Control.Feedback type="invalid">
            <h5>{strings.emailCheck}</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="message">
          <Form.Label>{strings.message}</Form.Label>
          <Form.Control required as="textarea" placeholder={strings.messagePrefill} />
          <Form.Control.Feedback type="invalid">
            <h5>{strings.messageCheck}</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto text-center form-group">
          {formspreeUrl && (
            <Button
              size="lg"
              variant={themeName === "light" ? "outline-dark" : "outline-light"}
              type="submit"
              disabled={isProcessing}
              className="my-4"
            >
              {strings.sendBtn}{" "}
              {isProcessing && (
                <Spinner animation="border" variant="success" size="sm" />
              )}
            </Button>
          )}

          <Alert
            show={success}
            variant="success"
            onClose={() => setSuccess(false)}
            dismissible
          >
            <Alert.Heading>{strings.sendSuccess}</Alert.Heading>
          </Alert>
          <Alert
            show={danger}
            variant="danger"
            onClose={() => setDanger(false)}
            dismissible
          >
            <Alert.Heading>{dangerMessage}</Alert.Heading>
          </Alert>
          <Alert show={!formspreeUrl} variant="danger">
            <Alert.Heading>{strings.sendError}</Alert.Heading>
          </Alert>
        </Form.Group>
      </Form>
    </>
  );
}
