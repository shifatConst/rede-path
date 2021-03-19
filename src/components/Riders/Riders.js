import React from 'react';
import { useHistory } from 'react-router';
import './Riders.css'

const Riders = (props) => {
    const history = useHistory()
    const {ride, image, id} = props.ride;
    const chooseRider = () =>{
        history.push(`/destination/${id}`)
    }
    return (
        <div onClick={() => chooseRider(id)} className="col-sm-3 border text-center py-5 my-3">
            <img src={image} alt=""/>
            <h3 className="mt-4">{ride}</h3>
        </div>
    );
};

export default Riders;