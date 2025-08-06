import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/hi';
import AnalogClock from '../components/clock/AnalogClock'
import { Helmet } from 'react-helmet';

<Helmet>
    <title>Time in Words – Chronoverse</title>
</Helmet>

const numberWords = [
    "Twelve", "One", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "One"
];

const getTimeInWords = (hours, minutes) => {
    if (minutes === 0) return `${numberWords[hours % 12]} o'clock`;
    if (minutes === 15) return `Quarter past ${numberWords[hours % 12]}`;
    if (minutes === 30) return `Half past ${numberWords[hours % 12]}`;
    if (minutes === 45) return `Quarter to ${numberWords[(hours + 1) % 12]}`;
    if (minutes < 30) return `${minutes} past ${numberWords[hours % 12]}`;
    return `${60 - minutes} to ${numberWords[(hours + 1) % 12]}`;
};

export default function TimeInWords() {
    const { theme } = useContext(ThemeContext);
    const themeStyles = theme === 'light' ? lightTheme : darkTheme;

    const [selectedTime, setSelectedTime] = useState(moment().format('HH:mm'));
    const [language, setLanguage] = useState('en');
    const [timeInWords, setTimeInWords] = useState('');

    const speak = () => {
        const utterance = new SpeechSynthesisUtterance(timeInWords);
        utterance.lang = language;
        window.speechSynthesis.speak(utterance);
    };

    const updateTimeInWords = () => {
        const timeMoment = moment(selectedTime, 'HH:mm');
        const hours = timeMoment.hour();
        const minutes = timeMoment.minute();
        setTimeInWords(getTimeInWords(hours, minutes));
    };

    useEffect(() => {
        updateTimeInWords();
    }, [selectedTime, language]);

    return (
        <Container className="my-5 d-flex justify-content-center">
            <Card
                style={{
                    backgroundColor: themeStyles.card,
                    color: themeStyles.color,
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    width: '100%',
                    maxWidth: '600px'
                }}
                className="shadow"
            >
                <h4 className="text-center mb-4">Time in Words</h4>

                <Form.Group className="mb-3">
                    <Form.Label>Enter Time</Form.Label>
                    <Form.Control
                        type="time"
                        value={selectedTime}
                        defaultValue={new Date().toDateString("HH:MM")}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    />
                </Form.Group>
                <div className="mb-4">
                    <strong>Time in Words:</strong>
                    <p className="mt-2">{timeInWords}</p>
                    <Button onClick={speak} variant="secondary">
                        🔊 Speak Time
                    </Button>
                </div>

                {/* Analog Clock */}
                <AnalogClock givenTime={selectedTime} />
            </Card>
        </Container>
    );
}
