import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Storage from "../../utils/storage";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function ProfilePage(props) {
  let user = Storage.getAuthUser();

  const userDataMarkup = user ? Object.keys(user).map((key, index) => key !== 'password' ? (
    <tr key={index}>
      <td className="text-capitalize">{key}</td>
      <td>{user[key]}</td>
    </tr>
  ) : null) : [];

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center vh-100">
        <Col md={6} sm={12}>
          <h2> User Profile
            <Button onClick={() => Storage.clearAuthUser(props.history)} className="float-right ml-2" variant="danger"
                    size={"sm"}>Logout</Button>
            <Link to="/user/edit-profile">
              <Button className="float-right" variant="primary" size={"sm"}>Edit Profile</Button>
            </Link>
          </h2>
          <Table>
            <tbody>
            {userDataMarkup}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
