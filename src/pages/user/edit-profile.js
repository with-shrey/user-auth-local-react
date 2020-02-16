import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Storage from "../../utils/storage";
import UserForm from "../../containers/user-form";
import Alert from "react-bootstrap/Alert";

export default function EditProfile(props) {
  const [error, setError] = useState('');
  const updateUser = ({firstName, lastName, email, password}) => {
    setError('');
    const success = Storage.updateUser({
      firstName,
      lastName,
      email,
      password
    }, props.history);
    if (!success) {
      setError('User Doesnt Exists');
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
          <h2> Update Profile </h2>
          {renderError}
          <UserForm onSubmit={updateUser} {...Storage.getAuthUser()}/>
        </Col>
      </Row>
    </Container>
  )
}
