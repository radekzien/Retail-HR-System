import { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { useShiftsContext } from "../hooks/useShiftsContext";

// Define your component
const Rota = () => {
  const [events, setEvents] = useState([]);  // State to hold events for FullCalendar
  const [error, setError] = useState(null);  // State to hold error messages
  const {dispatch} = useShiftsContext()

  // Fetch shifts data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/shifts');

        const json = response.json

        if (!response.ok) {
          throw new Error('Failed to fetch shifts for rota');
        } else {
          dispatch({type: 'SET_SHIFTS', payload: json})
        }

        const shiftsData = await response.json(); 

        // Map the fetched shifts to events format required by FullCalendar
        setEvents(shiftsData.map(shift => ({
          id: shift._id,
          title: `${shift.employeeFName} ${shift.employeeSName} (${shift.Role})`,
          start: shift.startTime,
          end: shift.endTime,
        })));

        setError(null);  // Clear any existing errors
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();  
  }, [dispatch]);  

  // Render FullCalendar component
  return (
    <div>
      {error && <div className="error">{error}</div>}  {/* Display error if any */}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}  // Pass the events state to FullCalendar
        selectable={true}
        headerToolbar = {{
          start:'today prev, next',
          centre: 'title',
          end: 'dayGridMonth, timeGridWeek, timeGridDay'
        }
        }
      />
    </div>
  );
};

export default Rota;  // Export the component