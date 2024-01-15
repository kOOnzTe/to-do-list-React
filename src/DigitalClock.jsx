import {useState, useEffect} from 'react';


function DigitalClock() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // for only one exe, use setTimeout() instead
        const perInterval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(perInterval);
        }

    }, []);

    function formatTime() {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let meridiem = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12;

        return `Time: ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`
    }
    
    function formatDay() {
        let day = time.getDate()
        let month = time.getMonth() + 1
        let year = time.getFullYear()

        return `Date: ${padZero(month)}-${day}-${year}` // MM-DD-YYYY

    }

    function padZero(num) {
        return (num < 10 ? "0" : "") + num;
    }

    return(<>
        <div className='clock-container'>
            <div className='clock'>
                <span>{formatTime()}</span>
                <br/>
                <span>{formatDay()}</span>
            </div>
        </div>
    </>)
}

export default DigitalClock;