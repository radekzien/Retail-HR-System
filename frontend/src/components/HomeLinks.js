import { Link } from 'react-router-dom'

const HomeLinks = () =>{
    return(
        <div className = 'links'>
            <Link to = "/viewHours">View My Hours</Link><br></br>
            <Link to = "/viewPayslip">View Payslip</Link><br></br>
            <Link to = "/viewRota">View Rota</Link><br></br>
            <Link to = "/createHours">Create Hours</Link><br></br>
            <Link to = "/addNewEmployee">Add New Employee</Link><br></br>
            <Link to = "/createRole">Create new Company Role</Link><br></br>
        </div>
    )
}

export default HomeLinks