import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Storage from "../../utils/storage";
import UserForm from "../../containers/user-form";
import Alert from "react-bootstrap/Alert";
import {Link} from "react-router-dom";

export default function SignupPage(props) {
  const [error, setError] = useState('');
  const createUser = ({firstName, lastName, email, password}) => {
    setError('');
    const success = Storage.addUser({
      firstName,
      lastName,
      email,
      password
    });
    if (!success) {
      setError('User Already Exists')
    } else {
      props.history.push('/auth/login')
    }
  };

  const renderError = error ? (
    <Alert variant="danger">
      {error}
    </Alert>
  ) : null;

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center vh-100">
        <Col md={4} sm={12}>
          <h2> Create New Account </h2>
          {renderError}
          <UserForm onSubmit={createUser}/>
          <Link className="mt-2 d-block" to={'/auth/login'}>Already Registered ?</Link>
        </Col>
      </Row>
    </Container>
  )
}
