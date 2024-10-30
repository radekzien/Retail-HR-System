import { format } from 'date-fns'

const shiftDetails = ({ shifts }) => {
    return (
        <div className="hours-details">
            <h4>Shift Length: {shifts.period} Hours</h4>
            <p>From {format(new Date(shifts.startTime), 'EEEE dd/MM/yyyy HH:mm')}</p>
            <p>Until {format(new Date(shifts.endTime), 'EEEE dd/MM/yyyy HH:mm')}</p>
            <p>{shifts.employeeSName}</p>
            <p>{shifts.employeeFName}</p>
            <p>{shifts.Role}</p>
        </div>
    );
};
export default shiftDetails