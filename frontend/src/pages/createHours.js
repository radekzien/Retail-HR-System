import HoursForm from "../components/HoursForm"
import { useEffect } from 'react';
import { useShiftsContext } from '../hooks/useShiftsContext';
import ManagerHoursDetails from "../components/ManagerHoursDetails"

const CreateHours = () => {
    const { shifts, dispatch } = useShiftsContext();
  
    useEffect(() => {
      const fetchShifts = async () => {
        try {
          const response = await fetch('/api/shifts');
          
          if (!response.ok) {
            throw new Error('Failed to fetch shifts');
          }
  
          const json = await response.json();
          
          dispatch({ type: 'SET_SHIFTS', payload: json });
        } catch (error) {
          console.error('Error fetching shifts:', error.message);
  
        
      }
  }
  
      fetchShifts();
    }, [dispatch]); 
    return(
        <><div className="createHours">
            <HoursForm />
        </div><div className="viewHours">
                <div className="hours">
                    {shifts && shifts.length > 0 ? (
                        shifts.map((shift) => (
                            <ManagerHoursDetails key={shift._id} shift={shift} />
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div></>
    )
}

export default CreateHours