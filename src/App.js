import React, { useState, useEffect } from 'react';
import './App.css';
import EventForm from './components/EventForm';
import { db } from './firebase';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getDocs, collection } from 'firebase/firestore';

function App() {
  const [events, setEvents] = useState([]);
  const [eventToEdit, setEventToEdit] = useState(null); // State for editing event

  const loadEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    const eventsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      date: doc.data().date,
      description: doc.data().description,
    }));
    setEvents(eventsData);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleEventClick = (eventClickInfo) => {
    const eventId = eventClickInfo.event.id;
    const event = events.find((event) => event.id === eventId);
    setEventToEdit(event); // Set the selected event for editing
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
      <EventForm loadEvents={loadEvents} eventToEdit={eventToEdit} setEventToEdit={setEventToEdit} />
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick} // Add event click handler
      />
    </div>
  );
}

export default App;
