import { useState, useEffect } from 'react';
import { format } from 'date-fns';

const TimeDisplay = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className='Clock'>
            {format(time, 'EEEE do MMMM yyyy')}<br></br>
            {format(time, 'kk:mm:ss')}
        </div>
    );
}

export default TimeDisplay;