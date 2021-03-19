import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router';

// export const RideContext = createContext();

const Destination = () => {
    const history = useHistory();
    const [ride, setRide] = useState({
        pick: '',
        dest: ''
    })
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'pick') {
            isFieldValid = e.target.value;
        }
        if (e.target.name === 'dest') {
            isFieldValid = e.target.value;
        }
        if (isFieldValid) {
            const updateField = { ...ride }
            updateField[e.target.name] = e.target.value;
            setRide(updateField);
        }
    }
    const showRides = () => {
        if (ride.pick && ride.dest) {
            history.push('/booking')
        }

    }
    return (
        // <RideContext.provider value={[ride, setRide]}>
            <div className="text-center m-5">
                <form onSubmit={showRides}>
                    <input onBlur={handleBlur} type="date" name="date" required />
                    <br />
                    <input onBlur={handleBlur} type="text" name="pick" required />
                    <br />
                    <input onBlur={handleBlur} type="text" name="dest" required />
                    <br />
                    <input type="submit" value="Search ride" />
                </form>
            </div>
        // </RideContext.provider>
    );
};

export default Destination;