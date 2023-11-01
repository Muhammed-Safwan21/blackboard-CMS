import React, { useState } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const { name, email, subject, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to send the contact form data to administrators or teachers
    // You can use an API or a backend service for this purpose
    console.log('Form Data:', formData);
    // Clear the form fields after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <Container className="mt-4 mb-10 flex justify-center ">
        <Col className='shadow-lg p-4 rounded-lg' md={8}>
      <h2 className='mb-4'>Contact Us</h2>
      <p>
        If you have any questions or need assistance, please feel free to contact us using the form below.
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={subject}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="message"
            value={message}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className='mt-3'>
          Submit
        </Button>
      </Form>
      </Col>
    </Container>
  );
};

export default ContactPage;
