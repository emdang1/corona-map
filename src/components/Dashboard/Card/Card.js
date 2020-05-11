import React from 'react';
import Countup from 'react-countup';
import './Card.css';

const Card = ({ type, data, title }) => {
  return (
    <div className={`card ${type}`}>
      <div className='container'>
        <h4>{title}</h4>
        <h3>
          <Countup start={0} end={data} duration={3} separator=' ' />
        </h3>
      </div>
    </div>
  );
};

export default Card;
