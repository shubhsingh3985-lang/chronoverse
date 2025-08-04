import React, { useState, useContext } from 'react';
import { Container, Card, Form, Button, Row, Col, Accordion } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import moment from 'moment';
import ISOWeekNumber from './dates-insights/ISOWeekNumber'
import LeapYearChecker from './dates-insights/LeapYearChecker';
import WorkingDaysCalculator from './dates-insights/WorkingDaysCalculator';
import ZodiacSignBirthstone from './dates-insights/ZodiacSignBirthstone';

export default function DateInsights() {
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
                <Card.Title className="text-center mb-2">📅 Date Insights</Card.Title>

                <Accordion defaultActiveKey="0" alwaysOpen>
                    <ISOWeekNumber eventKey={"0"}/>

                    <LeapYearChecker eventKey={"1"}/>

                    <WorkingDaysCalculator eventKey={"2"}/>

                    <ZodiacSignBirthstone eventKey={"3"}/>

                    {/* Future Section Placeholder */}
                    <Accordion.Item eventKey="4" className="mb-3">
                        <Accordion.Header className={`theme-accordion-header .${theme}`}>🛠️ More Insights (Coming Soon)</Accordion.Header>
                        <Accordion.Body style={{ backgroundColor: themeStyles.background }}>
                            This section will include customizable output formats and other advanced tools.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card>
        </Container>
    );
}
