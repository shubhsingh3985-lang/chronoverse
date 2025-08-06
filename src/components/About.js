import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';

export default function About() {
    const { theme } = useContext(ThemeContext);
    const themeStyles = theme === 'light' ? lightTheme : darkTheme;

    return (
        <Container className={`py-5 ${themeStyles.applied}`}>
            <Row className="justify-content-center mb-4">
                <Col md={10}>
                    <h1 className="text-center mb-3">About Chronoverse</h1>
                    <p className="lead text-center">
                        Chronoverse is your all-in-one time utility platform — designed for productivity, focus, and clarity.
                    </p>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className={`p-4 shadow-sm ${theme === 'light' ? 'bg-white' : 'bg-dark text-white'}`}>
                        <Card.Body>
                            <h4>🕰️ What is Chronoverse?</h4>
                            <p>
                                Chronoverse brings together essential time-based tools — from world clocks and countdown timers to Pomodoro productivity cycles, alarms, date calculators, and more — in one seamless interface.
                            </p>

                            <h4>🚀 Why Chronoverse?</h4>
                            <ul>
                                <li>Boost productivity with focus tools like Pomodoro Timer & Alarms.</li>
                                <li>Plan across time zones using our Timezone Converter and World Clocks.</li>
                                <li>Track, calculate, and understand dates with smart utilities.</li>
                            </ul>

                            <h4>🌐 Who is it for?</h4>
                            <p>
                                Students, professionals, freelancers, remote teams, and anyone who values their time. Chronoverse is built for everyone.
                            </p>

                            <h4>🔧 Work in Progress</h4>
                            <p>
                                We're a newly launched platform and constantly improving. Some features might still be evolving — thank you for your patience and support!
                            </p>

                            <h4>📣 Stay Connected</h4>
                            <p>
                                Follow us on
                                <a href="https://youtube.com/@TickTockByChronoverse" target="_blank" rel="noreferrer"> YouTube </a>,
                                <a href="https://x.com/ChronoverseTick" target="_blank" rel="noreferrer">Twitter</a>, and
                                <a href="https://facebook.com/TickTockByChronoverse" target="_blank" rel="noreferrer"> Facebook</a> to get updates and tips!
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
