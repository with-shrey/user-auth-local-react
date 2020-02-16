import React, {useRef, useState} from "react";
import FormItem from "../components/form-item";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from 'prop-types';

function UserForm(props) {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);
  const [error, setError] = useState({});
  //Uncontrolled Input For Password Fields
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const isValid = () => {
    const error = {};
    const emailRegExp = /\S+@\S+\.\S+/;
    if (!email) {
      error.email = 'Email is Required';
    } else if (!emailRegExp.test(String(email).toLowerCase())) {
      error.email = 'Email not valid';
    }

    if (!firstName) {
      error.firstName = 'First name is required';
    }
    if (!lastName) {
      error.lastName = 'Last name is required';
    }
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (!password) {
      error.password = 'Password is required';
    } else if (password.length < 6) {
      error.password = 'Password should be greater than 6';
    }

    if (confirmPassword !== password) {
      error.confirmPassword = 'Passwords do not match';
    }
    setError(error);
    return Object.keys(error).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (isValid()) {
      const password = passwordRef.current.value;
      props.onSubmit({firstName, lastName, email, password});
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormItem name="firstName" error={error} title="First Name" type="text" value={firstName}
                onChange={event => setFirstName(event.target.value)}/>
      <FormItem name="lastName" error={error} title="Last Name" type="text" value={lastName}
                onChange={event => setLastName(event.target.value)}/>
      <FormItem name="email" error={error} title="Email" type="email" value={email}
                onChange={event => setEmail(event.target.value)}/>
      <FormItem name="password" error={error} title="Password" type="password" inputRef={passwordRef}/>
      <FormItem name="confirmPassword" error={error} title="Confirm Password" type="password"
                inputRef={confirmPasswordRef}/>
      <Button variant="primary" type="submit" className="w-100">
        Submit
      </Button>
    </Form>)
}


FormItem.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string
};

UserForm.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export default UserForm;
