import React from 'react';

const EventList = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.date}</p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
