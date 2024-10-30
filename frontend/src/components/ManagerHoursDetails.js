import { useEffect, useState } from 'react';
import { useShiftsContext } from "../hooks/useShiftsContext";
import weekRange from './payslipUtil';
import { format } from 'date-fns'


const ManagerHoursDetails = ( {shift} ) => {
    const { dispatch } = useShiftsContext(); 
    const [payslips, setPayslips] = useState([]); 
    const [error, setError] = useState(null);       

    // Fetch payslips data
    useEffect(() => {
        const fetchPayslips = async () => {
            try {
                const response = await fetch('/api/weekly');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch weekly payslips');
                }
                
                const data = await response.json();
                setPayslips(data);
                setError(null); 
                
            } catch (error) {
                setError(`An error occurred: ${error.message}`);
            }
        };
        
        fetchPayslips();
    }, []); 

    // Update payslip with new hours
    const updatePayslip = async (shift) => {
        const date = weekRange(shift.endTime);
        const weekStart = date.start;
        let payslip = payslips.find(
            (p) => p.employeeFName === shift.employeeFName && 
                   p.employeeSName === shift.employeeSName && 
                   p.Role === shift.Role && 
                   new Date(p.weekStart).toISOString() === new Date(weekStart).toISOString()
        );

        if (!payslip) { 
            console.log('Existing payslip not found');
            return;
        }

        const updatedPayslip = { ...payslip, Hours: (payslip.Hours || 0) - shift.period };

        try {
            const response = await fetch(`/api/weekly/${payslip._id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedPayslip),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) { 
                throw new Error('Failed to update payslip');
            }

            const result = await response.json(); 
            setPayslips(payslips.map(p => p._id === payslip._id ? result : p)); 
            console.log('Payslip updated:', result);
        } catch (err) {
            setError(`Error updating payslip: ${err.message}`);
        }
    }

    // Handle shift deletion
    const handleClick = async () => {
        try {
            const response = await fetch(`/api/shifts/${shift._id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete shift');
            }

            const deletedShift = await response.json();
            await updatePayslip(deletedShift);
            dispatch({ type: 'DELETE_SHIFT', payload: deletedShift });
        } catch (err) {
            setError(`Error: ${err.message}`);
        }
    }

    return (
        <div className="managers-details">
            <h4>Shift Length: {shift.period} Hours</h4>
            <p>From {format(new Date(shift.startTime), 'EEEE dd/MM/yyyy HH:mm')}</p>
            <p>Until {format(new Date(shift.endTime), 'EEEE dd/MM/yyyy HH:mm')}</p>
            <p>{shift.employeeSName}</p>
            <p>{shift.employeeFName}</p>
            <p>{shift.Role}</p>
            <span onClick={handleClick} style={{ cursor: 'pointer'}} className='delete'>
                Delete
            </span>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default ManagerHoursDetails;
