import React, { useEffect, useState } from 'react';
import rideData from '../../data/data.json';
import Riders from '../Riders/Riders';


const Home = () => {
    const [rides, setRides] = useState([]);
    useEffect(() => {
        setRides(rideData);
    }, [])
    return (
        <div className="container">
            <h1>Rides: {rides.length} </h1>
            <div className="row">
                {
                    rides.map(ride => <Riders ride={ride}></Riders>)
                }
            </div>

        </div>
    );
};

export default Home;