import React, { useState, useContext } from 'react';
import { Container, Card, Form, Button, Row, Col, Accordion } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import moment from 'moment';
import DateDifference from './dates-insights/DateDifference'
import AddSubDays from './dates-insights/AddSubDays';
import CompareDates from './dates-insights/CompareDates';
import { Helmet } from 'react-helmet';

<Helmet>
  <title>Date Calculator – Chronoverse</title>
  <meta name="description" content="Calculate date differences, add/subtract days, and get total days or years between dates with ease." />
</Helmet>

export default function DateCalculator() {
    const { theme } = useContext(ThemeContext);
    const themeStyles = theme === 'light' ? lightTheme : darkTheme;

    return (
        <Container className="my-5" style={{
            maxWidth: '700px',
            backgroundColor: themeStyles.card,
            color: themeStyles.color,
            padding: '2rem',
            borderRadius: '1rem',
        }}>
            <Card
                style={{ backgroundColor: themeStyles.card, color: themeStyles.color }}
                className="p-4 shadow"
            >
                <Card.Title className="text-center mb-2">📅 Date Calculator</Card.Title>

                <Accordion defaultActiveKey="0" alwaysOpen>
                    {/* Section 1: Date Difference */}
                    <DateDifference />

                    {/* Section 2: Add/Subtract Days */}
                    <AddSubDays />

                    {/* Compare Two Dates */}
                    <CompareDates />

                    {/* Future Section Placeholder */}
                    <Accordion.Item eventKey="3" className="mb-3">
                        <Accordion.Header className={`theme-accordion-header .${theme}`}>🛠️ More Calculations (Coming Soon)</Accordion.Header>
                        <Accordion.Body style={{ backgroundColor: themeStyles.background }}>
                            This section will include customizable output formats and other advanced tools.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card>
        </Container>
    );
}
