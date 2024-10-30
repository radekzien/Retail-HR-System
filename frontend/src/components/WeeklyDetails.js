import { useRoleContext } from "../contexts/roleContext"
import calculatePay from "./PayCalculations";
import { format } from "date-fns"

//Component to be shown on the App
const WeeklyDetails = ({ weekly }) => {
    const { roles } = useRoleContext() //Fetching Roles Collection via Roles context
    const {pay, natInsDeduction, incTaxDeduction, grossPay, deductions} = calculatePay(weekly, roles) //Calculate pay function called
    return (
        <div className="weekly-details">
            <h4>Total Hours: {weekly.Hours}</h4>
            <p>Week Start: {format(new Date(weekly.weekStart), 'EEEE dd/MM/yyyy')}</p>
            <p>Week End: {format(new Date(weekly.weekEnd), 'EEEE dd/MM/yyyy')}</p>
            <p>Gross Pay: £{grossPay}</p>
            <p>NI Deduction: £{natInsDeduction}</p>
            <p>IC Deduction: £{incTaxDeduction}</p>
            <p>Total Deductions: £{deductions}</p>
            <h4>Total (Net) Pay: £{pay}</h4>
            <h5>Employee Details:</h5>
            <p>{weekly.employeeSName}</p>
            <p>{weekly.employeeFName}</p>
            <p>{weekly.Role}</p>
        </div>
    );
};
export default WeeklyDetails