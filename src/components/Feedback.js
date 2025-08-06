// src/pages/Feedback.js
import React, { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";

export default function FeedbackPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            setSuccess("Thank you for your feedback!");
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            console.log(err)
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <Container className="my-5" style={{ maxWidth: "600px" }}>
            <h2 className="mb-4 text-center">📝 Help Us Improve</h2>
            <p className="text-center mb-4">
                Found a bug? Got a feature idea? Or just want to say hi? We’d love to hear from you.
            </p>

            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email (optional)</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
}
