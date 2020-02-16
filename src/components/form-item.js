import React from "react";
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";

function FormItem({name, type, title, error, value, onChange, inputRef}) {
  const errorMarkup = error[name] ? (
    <Form.Text className="text-danger">
      {error[name]}
    </Form.Text>
  ) : <></>;
  return (
    <Form.Group controlId={name}>
      <Form.Label>{title}</Form.Label>
      <Form.Control ref={inputRef} type={type} value={value} onChange={onChange}/>
      {errorMarkup}
    </Form.Group>
  )
};

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  error: PropTypes.object,
  inputRef: PropTypes.any
};

FormItem.defaultProps = {
  error: {},
  inputRef: null
};

export default FormItem;
