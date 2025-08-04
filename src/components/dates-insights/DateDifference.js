import React, { useState, useContext } from 'react';
import { Form, Button, Row, Col, Accordion } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';
import { lightTheme, darkTheme } from '../../themes';
import moment from 'moment';


export default function DateDifference() {
    const { theme } = useContext(ThemeContext);
    const themeStyles = theme === 'light' ? lightTheme : darkTheme;

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [diffResult, setDiffResult] = useState('');


    const calculateDifference = () => {
        if (startDate && endDate) {
            const start = moment(startDate);
            const end = moment(endDate);
            const diffDays = end.diff(start, 'days');
            const duration = moment.duration(end.diff(start));
            setDiffResult(
                `Difference: ${Math.abs(diffDays)} day(s) (${duration.years()} year(s), ${duration.months()} month(s), ${duration.days()} day(s))`
            );
        }
    };
    return (
        <Accordion.Item eventKey="0" className="mb-3">
            <Accordion.Header className={`theme-accordion-header .${theme}`}>🗓️ Date Difference</Accordion.Header>
            <Accordion.Body style={{ backgroundColor: themeStyles.background }}>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </Col>
                </Row>
                <Button variant="primary" onClick={calculateDifference} className="mb-2">Calculate Difference</Button>
                <div><strong>{diffResult}</strong></div>
            </Accordion.Body>
        </Accordion.Item>
    )
}