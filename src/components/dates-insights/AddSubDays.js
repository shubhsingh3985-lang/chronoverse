import React, { useState, useContext } from 'react';
import { Form, Button, Row, Col, Accordion } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';
import { lightTheme, darkTheme } from '../../themes';
import moment from 'moment';

export default function AddSubDays() {
    const { theme } = useContext(ThemeContext);
    const themeStyles = theme === 'light' ? lightTheme : darkTheme;

    const [baseDate, setBaseDate] = useState('');
    const [daysToAdd, setDaysToAdd] = useState('');
    const [calcResult, setCalcResult] = useState('');
    const [operation, setOperation] = useState('add');

    const calculateAddSubtract = () => {
        if (baseDate && daysToAdd) {
            const date = moment(baseDate);
            const newDate = operation === 'add' ? date.add(daysToAdd, 'days') : date.subtract(daysToAdd, 'days');
            setCalcResult(`Result: ${newDate.format('YYYY-MM-DD (dddd)')}`);
        }
    };
    return (
        <Accordion.Item eventKey="1" className="mb-3">
            <Accordion.Header className={`theme-accordion-header .${theme}`}>➕➖ Add / Subtract Days</Accordion.Header>
            <Accordion.Body style={{ backgroundColor: themeStyles.background }}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Label>Base Date</Form.Label>
                        <Form.Control type="date" value={baseDate} onChange={(e) => setBaseDate(e.target.value)} />
                    </Col>
                    <Col md={3}>
                        <Form.Label>Days</Form.Label>
                        <Form.Control type="number" value={daysToAdd} onChange={(e) => setDaysToAdd(e.target.value)} />
                    </Col>
                    <Col md={3}>
                        <Form.Label>Operation</Form.Label>
                        <Form.Select value={operation} onChange={(e) => setOperation(e.target.value)}>
                            <option value="add">Add</option>
                            <option value="subtract">Subtract</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Button variant="primary" onClick={calculateAddSubtract}>Calculate</Button>
                <div className="mt-2"><strong>{calcResult}</strong></div>
            </Accordion.Body>
        </Accordion.Item>
    )
}