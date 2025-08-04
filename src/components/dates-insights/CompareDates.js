import React, { useState, useContext } from 'react';
import { Form,  Accordion } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';
import { lightTheme, darkTheme } from '../../themes';

export default function CompareDates() {
    const { theme } = useContext(ThemeContext);
    const themeStyles = theme === 'light' ? lightTheme : darkTheme;

        const [compareDate1, setCompareDate1] = useState('');
    const [compareDate2, setCompareDate2] = useState('');

    return (
        <Accordion.Item eventKey="2" className="mb-3">
                        <Accordion.Header className={`theme-accordion-header .${theme}`}>🆚 Compare Two Dates</Accordion.Header>
                        <Accordion.Body style={{ backgroundColor: themeStyles.background }}>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={compareDate1}
                                        onChange={(e) => setCompareDate1(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Second Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={compareDate2}
                                        onChange={(e) => setCompareDate2(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>

                            {compareDate1 && compareDate2 && (
                                <div className="mt-3">
                                    <h5>
                                        {new Date(compareDate1).toDateString()} is{' '}
                                        <strong>
                                            {new Date(compareDate1) < new Date(compareDate2)
                                                ? 'before'
                                                : new Date(compareDate1) > new Date(compareDate2)
                                                    ? 'after'
                                                    : 'the same as'}
                                        </strong>{' '}
                                        {new Date(compareDate2).toDateString()}
                                    </h5>
                                    <p>
                                        Difference:{' '}
                                        {Math.abs(
                                            Math.floor(
                                                (new Date(compareDate1) - new Date(compareDate2)) /
                                                (1000 * 60 * 60 * 24)
                                            )
                                        )}{' '}
                                        days
                                    </p>
                                </div>
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
    )
}