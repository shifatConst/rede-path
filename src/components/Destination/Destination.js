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
        <div className="text-center m-5 border">
            <form onSubmit={showRides}>
                <div className="m-3">
                    <label>Select pickup location</label>
                    <br />
                    <input onBlur={handleBlur} type="date" name="date" required />
                    <br />
                </div>

                <div className="m-3">
                    <label>Select pickup location</label>
                    <br />
                    <input className="" onBlur={handleBlur} type="text" name="pick" required />
                    <br />
                </div>
                <div className="m-3">
                    <label>Select destination</label>
                    <br />
                    <input onBlur={handleBlur} type="text" name="dest" required />
                    <br />
                </div>
                <input className="m-1" type="submit" value="Search ride" />
            </form>
        </div>

    );
};

export default Destination;