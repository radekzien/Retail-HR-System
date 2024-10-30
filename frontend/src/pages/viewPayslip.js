import {useEffect, useState} from 'react'

//components
import WeeklyDetails from '../components/WeeklyDetails'

const ViewPayslip = () => {
    const[Payslip, setPayslip] = useState([])

    useEffect(() => {
        const fetchWeekly = async() => {
            const response = await fetch('/api/weekly')
            const json = await response.json()
            if(response.ok){
                setPayslip(json)
            }
        }
        fetchWeekly()
    }, [])

    return (
        <div className="viewWeekly">
            <div className='Weekly'>
                {Payslip.length > 0 ? (
                    Payslip.map((weekly) => (
                        <WeeklyDetails key={weekly._id} weekly={weekly} />
                 ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ViewPayslip;