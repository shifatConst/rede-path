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
            
            <div className="row  m-5">
                {
                    rides.map(ride => <Riders ride={ride}></Riders>)
                }
            </div>

        </div>
    );
};

export default Home;