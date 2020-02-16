import React, {useRef, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormItem from "../../components/form-item";
import Button from "react-bootstrap/Button";
import Storage from "../../utils/storage";
import Alert from "react-bootstrap/Alert";
import {Link} from "react-router-dom";

export default function LoginPage(props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});
  const [submitError, setSubmitError] = useState('');
  //Uncontrolled Input For Password Fields
  const passwordRef = useRef(null);

  const isValid = () => {
    const error = {};
    const emailRegExp = /\S+@\S+\.\S+/;
    if (!email) {
      error.email = 'Email is Required';
    } else if (!emailRegExp.test(String(email).toLowerCase())) {
      error.email = 'Email not valid';
    }
    const password = passwordRef.current.value;
    if (!password) {
      error.password = 'Password is required';
    } else if (password.length < 6) {
      error.password = 'Password should be greater than 6';
    }
    setError(error);
    return Object.keys(error).length === 0;
  };

  const attemptUserLogin = (event) => {
    event.preventDefault();
    setSubmitError('');
    if (isValid()) {
      const password = passwordRef.current.value;
      const success = Storage.loginUser(email, password);
      if (!success) {
        setSubmitError('Authentication Failed');
      } else {
        props.history.push('/user');
      }
    }
  };

  const renderError = submitError ? (
    <Alert variant="danger">
      {submitError}
    </Alert>
  ) : null;


  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center vh-100">
        <Col md={4} sm={12}>
          <h2> Login </h2>
          {renderError}
          <Form onSubmit={attemptUserLogin}>
            <FormItem name="email" error={error} title="Email" type="email" value={email}
                      onChange={event => setEmail(event.target.value)}/>
            <FormItem name="password" error={error} title="Password" type="password" inputRef={passwordRef}/>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
            <Link className="mt-2 d-block" to={'/auth/signup'}>Create a new Account</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
