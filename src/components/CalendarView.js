import React, { useState, useContext, useEffect } from 'react';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import ph from '../assets/Ph_data.json'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const calendar = [];

    let week = [];
    let dayOfWeek = firstDay.getDay();

    for (let i = 0; i < dayOfWeek; i++) week.push(null);

    for (let day = 1; day <= lastDay.getDate(); day++) {
        week.push(new Date(year, month, day));
        if (week.length === 7) {
            calendar.push(week);
            week = [];
        }
    }

    if (week.length > 0) {
        while (week.length < 7) week.push(null);
        calendar.push(week);
    }

    return calendar;
}

export default function CalendarView() {
    const { theme } = useContext(ThemeContext);
    const themeStyles = theme === 'light' ? lightTheme : darkTheme;

    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth()));
    const [events, setEvents] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [newEvent, setNewEvent] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [holidays, setHolidays] = useState([]);

    const calendar = generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    useEffect(() => {
        fetch("https://ipapi.co/json/")
            .then((res) => res.json())
            .then((data) => {
                const mockHolidayDates = ph.filter(x => x.countryCode === data.country_code); // ISO strings
                setHolidays(mockHolidayDates);
            })
            .catch((err) => console.error("Failed to get country code", err));

    }, []);

    const formatKey = (date) => {
        if (!date) return '';
        let dada = getLocalDateISO(date);
        return dada;
    };

    const getLocalDateISO = (date) => {
        return date.toLocaleDateString('en-CA'); // ✅ 'YYYY-MM-DD' format in local time
    };

    const handleDateClick = (date) => {
        if (!date) return;
        setSelectedDate(date);
        setShowModal(true);
        setNewEvent('');
    };

    const addEvent = () => {
        const key = formatKey(selectedDate);
        setEvents((prev) => ({
            ...prev,
            [key]: [...(prev[key] || []), newEvent]
        }));
        setNewEvent('');
        setShowModal(false);
    };

    const isToday = (date) =>
        date &&
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    const isWeekend = (date) => date && (date.getDay() === 0 || date.getDay() === 6);

    const isHoliday = (date) => {
        debugger
        if (!date) return false;
        const iso = getLocalDateISO(date);
        var isHolidayTrue = holidays.find(x => x.date == iso);
        console.log(isHolidayTrue)
        if (isHolidayTrue)
            return isHolidayTrue;
        return ''
    };

    const goToPrevMonth = () =>
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
    const goToNextMonth = () =>
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));

    return (
        <Container className="my-5 d-flex justify-content-center">
            <Card
                style={{
                    backgroundColor: themeStyles.card,
                    color: themeStyles.color,
                    maxWidth: '600px',
                    width: '100%',
                    padding: '1.5rem',
                    borderRadius: '1rem'
                }}
                className="shadow"
            >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button variant="outline-secondary" onClick={goToPrevMonth}>←</Button>
                    <h4 className="mb-0">
                        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                    </h4>
                    <Button variant="outline-secondary" onClick={goToNextMonth}>→</Button>
                </div>

                <div className="d-grid mb-2" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                    {daysOfWeek.map((day) => (
                        <div key={day} className="text-center fw-bold">{day}</div>
                    ))}

                    {calendar.map((week, i) =>
                        week.map((date, j) => {
                            const key = formatKey(date || new Date());
                            const hasEvent = events[key]?.length > 0;
                            const isTodayFlag = isToday(date);
                            const holiday = isHoliday(date);
                            const weekend = isWeekend(date);

                            return (
                                <div
                                    key={`${i}-${j}`}
                                    onClick={() => handleDateClick(date)}
                                    className="text-center py-2 rounded"
                                    style={{
                                        cursor: date ? 'pointer' : 'default',
                                        backgroundColor: isTodayFlag
                                            ? theme === 'light' ? '#d1e7dd' : '#2a4a3c'
                                            : holiday
                                                ? '#f8d7da'
                                                : weekend
                                                    ? theme === 'light' ? '#f8f9fa' : '#343a40'
                                                    : 'transparent',
                                        color: holiday ? '#842029' : themeStyles.color,
                                        border: hasEvent ? '1px solid #0d6efd' : '1px solid transparent'
                                    }}
                                >
                                    {date ? date.getDate() : ''}
                                    {holiday && <div style={{ fontSize: '0.6rem' }}>{(holiday.name)}</div>}
                                </div>
                            );
                        })
                    )}
                </div>
            </Card>

            {/* Modal for adding/viewing events */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                dialogClassName={theme === 'dark' ? 'modal-dark' : ''}
            >
                <Modal.Header closeButton className={theme === 'dark' ? 'bg-dark text-white' : ''}>
                    <Modal.Title>{selectedDate?.toDateString()}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={theme === 'dark' ? 'bg-dark text-white' : ''}>
                    {events[formatKey(selectedDate)]?.map((ev, idx) => (
                        <div key={idx} className="mb-2">📌 {ev}</div>
                    ))}

                    <Form.Group>
                        <Form.Label>Add New Event</Form.Label>
                        <Form.Control
                            type="text"
                            value={newEvent}
                            onChange={(e) => setNewEvent(e.target.value)}
                            placeholder="e.g. Dentist appointment"
                            className={theme === 'dark' ? 'bg-primary text-white border-0' : ''}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className={theme === 'dark' ? 'bg-dark text-white' : ''}>
                    <Button variant="success" onClick={addEvent} disabled={!newEvent.trim()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}
