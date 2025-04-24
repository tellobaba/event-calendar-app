
// import React from 'react';
// import FullCalendar from '@fullcalendar/react'; // Import the default export
// import dayGridPlugin from '@fullcalendar/daygrid'; // Import the dayGrid plugin



import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


const Calendar = ({ events }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default Calendar;


