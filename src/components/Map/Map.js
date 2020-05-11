import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import './Map.css';
import { fetchMapCountries } from '../../api/api';

const Map = () => {
  const [viewport, setViewPort] = useState({
    latitude: 50.075539,
    longitude: 14.4378,
    zoom: 4.5,
    width: '90vw',
    height: '80vh',
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [mapCountries, setMapCountries] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setMapCountries(await fetchMapCountries());
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const keyListener = (e) => {
      if (e.key === 'Escape') {
        setSelectedCountry(null);
      }

      if (e.keyCode === 9) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', keyListener);
  }, []);

  const onClickHandler = (e, country) => {
    e.preventDefault();
    setSelectedCountry(country);
  };

  const toStringNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Overview map</h1>
      <h5 style={{ textAlign: 'center' }}>
        (data may vary - different sources)
      </h5>
      <div className='map'>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAP_API_KEY}
          onViewportChange={(viewport) => {
            setViewPort(viewport);
          }}
          mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        >
          {mapCountries &&
            mapCountries.map((country, i) => (
              <Marker
                key={i}
                latitude={country.latitude}
                longitude={country.longitude}
              >
                <button
                  className='point'
                  onClick={(e) => onClickHandler(e, country)}
                ></button>
              </Marker>
            ))}

          {selectedCountry && (
            <Popup
              latitude={selectedCountry.latitude}
              longitude={selectedCountry.longitude}
              onClose={() => setSelectedCountry(null)}
            >
              <h3>{selectedCountry.location}</h3>
              <p>
                <span>Confirmed:</span>{' '}
                {toStringNumber(selectedCountry.confirmed)}
              </p>
              <p>
                <span>Dead:</span> {toStringNumber(selectedCountry.dead)}
              </p>
              <p>
                <span>Recovered:</span>{' '}
                {toStringNumber(selectedCountry.recovered)}
              </p>
            </Popup>
          )}
        </ReactMapGL>
      </div>
    </>
  );
};

export default Map;
