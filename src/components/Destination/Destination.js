import React, { useState } from 'react';
import rideData from '../../data/data.json';
import { useParams } from 'react-router';
import './Destination.css'

const Destination = () => {
    const { id } = useParams();
    const availableRides = rideData.find(ride => ride.id === parseInt(id));
    const { ride, image, price } = availableRides;

    const [click, setClick] = useState(false);

    const handleSubmit = (e) => {
        setClick(!click);
        // console.log(availableRides.image);
        e.preventDefault()
    }
    return (
        <div className="row text-center m-5">
            <div className="form-style col-sm-6">
                <form onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label className="label-style">Select pickup location</label>
                        <br />
                        <input type="date" name="date" required />
                        <br />
                    </div>

                    <div className="m-3">
                        <label className="label-style">Select pickup location</label>
                        <br />
                        <input className="" type="text" name="pick" required />
                        <br />
                    </div>

                    <div className="m-3">
                        <label className="label-style">Select destination</label>
                        <br />
                        <input type="text" name="dest" required />
                        <br />
                    </div>
                    <input className="m-1 ride-card" type="submit" value="Search ride" />
                </form>
                <div>
                    {
                        click && (<div className="mt-4">
                            <div className="d-flex flex-row bd-highlight mb-2 justify-content-around rounded ride-card">
                                <img className="ride-img" src={image} alt="" />
                                <h3>{ride}</h3>
                                <h3>{price}</h3>
                            </div>
                            <div className="d-flex flex-row bd-highlight mb-2 justify-content-around rounded ride-card">
                                <img className="ride-img" src={image} alt="" />
                                <h3>{ride}</h3>
                                <h3>{price}</h3>
                            </div>
                            <div className="d-flex flex-row bd-highlight mb-2 justify-content-around rounded ride-card">
                                <img className="ride-img" src={image} alt="" />
                                <h3>{ride}</h3>
                                <h3>{price}</h3>
                            </div>
                        </div>)

                    }
                </div>

            </div>
            <div className="col-sm-6">
                <iframe width="500" height="400" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%20dhaka+(Map)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            </div>
        </div>

    );
};

export default Destination;