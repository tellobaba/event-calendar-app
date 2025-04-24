import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  // Make sure db is imported correctly
import { addDoc, updateDoc, deleteDoc, doc, collection } from 'firebase/firestore';


const EventForm = ({ loadEvents, eventToEdit, setEventToEdit }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // If we are editing an event, populate the form with the event details
  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDate(eventToEdit.date);
      setDescription(eventToEdit.description);
    } else {
      setTitle("");
      setDate("");
      setDescription("");
    }
  }, [eventToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) return;

    try {
      if (eventToEdit) {
        // Update the event in Firestore
        const eventRef = doc(db, "events", eventToEdit.id);
        await updateDoc(eventRef, { title, date, description });
        setEventToEdit(null);  // Reset editing mode after update
      } else {
        // Create a new event in Firestore
        await addDoc(collection(db, "events"), { title, date, description });
      }

      setTitle("");
      setDate("");
      setDescription("");
      loadEvents(); // Reload events after submission
    } catch (error) {
      console.error("Error adding/updating event: ", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Idea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Idea description"
        className="border p-2 rounded w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {eventToEdit ? "Update Event" : "Submit Event"}
      </button>
      {eventToEdit && (
  <button
    type="button"
    className="bg-red-600 text-white px-4 py-2 ml-2"
    onClick={async () => {
      try {
        const eventRef = doc(db, "events", eventToEdit.id);
        await deleteDoc(eventRef);
        setEventToEdit(null);
        loadEvents();
      } catch (error) {
        console.error("Error deleting event:", error.message);
      }
    }}
  >
    Delete Event
  </button>
)}
    </form>
  );
};

export default EventForm;
