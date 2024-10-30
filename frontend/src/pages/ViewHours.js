import { useEffect, useState } from 'react';
import { useShiftsContext } from '../hooks/useShiftsContext';

// Components
import ShiftDetails from '../components/HoursDetails';

const ViewHours = () => {
  const { shifts, dispatch } = useShiftsContext();

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await fetch('/api/shifts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch shifts');
        }

        const json = await response.json();

        dispatch({type: 'SET_SHIFTS', payload: json})

      } catch (error) {
        console.error('Error fetching shifts:', error.message);

      
    };
}

    fetchShifts();
  }, [dispatch]); 

  return (
    <div className="viewHours">
      <div className="hours">
        {shifts && shifts.length > 0 ? (
          shifts.map((shift) => (
            <ShiftDetails key={shift._id} shifts={shift} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ViewHours;