import { startOfWeek, endOfWeek } from 'date-fns';

//Week Working period: Sunday to Saturday

//Calculating the start date and end dates of a week using a date within said week
const weekRange = (date) => {
    const start = startOfWeek(date, {weekStartsOn: 0})
    const end = endOfWeek(date, {weekStartsOn: 0})
    return { start, end }
}

export default weekRange