import { useEffect, useState } from "react";
import { differenceInHours, parseISO } from 'date-fns';
import payslipUpdate from "./createPayslip";
import { useShiftsContext } from "../hooks/useShiftsContext";


const HoursForm = () => {
    const { dispatch } = useShiftsContext()

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState(null);
    const [payslips, setPayslips] = useState([]);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
          try {
            const [employeeResponse, payslipsResponse] = await Promise.all([
              fetch('/api/employees'),
              fetch('/api/weekly'),
            ]);
      
            // Check if both requests were successful
            if (!employeeResponse.ok || !payslipsResponse.ok) {
              if (!employeeResponse.ok) {
                setError('Failed to fetch employees');
              }
              if (!payslipsResponse.ok) {
                setError('Failed to fetch existing payslips');
              }
      
              return;
            }
      
            const employeesData = await employeeResponse.json();
            const payslipsData = await payslipsResponse.json();
      
            // Update state with fetched data
            setEmployees(employeesData);
            setPayslips(payslipsData);
            setError(null); 
      
          } catch (error) {
            setError(`An error occurred: ${error.message}`);
          }
        };
      
        fetchData();
      }, []);



    //Handle Submit - This Whole block validates the inputted data and creates a shift
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Parse and validate times
        const parsedStartTime = parseISO(startTime);
        const parsedEndTime = parseISO(endTime);

        if (isNaN(parsedStartTime.getTime()) || isNaN(parsedEndTime.getTime())) {
            setError('Invalid date format');
            return;
        }
        
        if (parsedEndTime <= parsedStartTime) {
            setError('End time must be after start time');
            return;
        }

        //Calculates Shift length and validates it according to requirements
        const period = differenceInHours(parsedEndTime, parsedStartTime);
        if (!selectedEmployee) {
            setError('Please select an Employee');
            return;
        }

        if (period <= 0) {
            setError('Please enter a valid number of hours');
            return;
        }

        if (period > 12) {
            setError('Employees cannot exceed 12 Hour Shifts at UrCo');
            return;
        }

        if (!startTime || !endTime) {
            setError('Please Enter Start and End Times');
            return;
        }

        //Creating shift data for posting
        const [employeeFName, employeeSName, Role] = selectedEmployee.split(',');
        const shiftData = { employeeFName, employeeSName, Role, startTime: parsedStartTime, endTime: parsedEndTime, period};

        //Creating a new shift!!
        try {
            //Updates or creates new payslip
            payslipUpdate(employeeFName, employeeSName, Role, period, endTime, payslips, setPayslips, setError)
            //The rest of shift creation
            const response = await fetch('/api/shifts', {
                method: 'POST',
                body: JSON.stringify(shiftData),
                headers: { 'Content-Type': 'application/json' }
            });

            const json = await response.json()

            if (!response.ok) {
                setError('Failed to Post Shift');
            }
            
            if (response.ok){
            setSelectedEmployee('');
            setStartTime('');
            setEndTime('');
            setError(null);
            console.log('Shift added');
            dispatch({type: 'CREATE_SHIFT', payload: json})
            }
        } catch (error) {
            setError(error.message);
        }
    }


    //Component
    return (
        <form className="newHoursForm" onSubmit={handleSubmit}>
            <h3>Create new Shift Hours</h3>
            <label>Select Employee: </label>
            <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
            >
                <option value="">Select an Employee</option>
                {employees.map((employee) => (
                    <option
                        key={employee._id}
                        value={`${employee.employeeFName},${employee.employeeSName},${employee.Role}`}
                    >
                        {`${employee.employeeFName} ${employee.employeeSName} (${employee.Role})`}
                    </option>
                ))}
            </select>
            <label htmlFor="startTime">Shift Times: </label>
            <input 
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <input 
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />
            <button type="submit">Record Hours</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default HoursForm;
