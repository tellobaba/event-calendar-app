import React, { useState, useEffect } from 'react';
import './App.css';
import EventForm from './components/EventForm';
import { db } from './firebase';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getDocs, onSnapshot, collection } from 'firebase/firestore';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        date: doc.data().date,
        description: doc.data().description,
      }));
      setEvents(eventsData);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Event Form Section */}
      <div className="w-1/3 bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">Ideas Management Form</h1>
        <EventForm loadEvents={() => {}} />
      </div>

      {/* Calendar Section */}
      <div className="flex-1 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4"> Calendar</h1>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventColor="#2D9CDB"
          height="100%" // Full height of its container
        />
      </div>
    </div>
  );
}

export default App;