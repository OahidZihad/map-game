import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import marker from "../assets/marker.png";
import { DATA } from "../Data";
import ScoreBoard from "./ScoreBoard";
import "./map.css";

Geocode.setApiKey(`${process.env.REACT_APP_MAP}`);
Geocode.enableDebug();

const Map = () => {
  const mapStyle = [
    {
      color: "#000",
    },
    {
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },

    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
  ];

  const center = { lat: 54.526, lng: 15.2551 }; // set Europe map as center

  const AnyReactComponent = (
    { marker, lat, lng, name } // red marker
  ) => (
    <div lat={lat} lng={lng} name={name}>
      {marker}
    </div>
  );

  const [data, setData] = useState({
    latLngA: null,
    latLngD: null,
    latLngB: null,
    latLngC: null,
  });

  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [findRandomCity, setFindRandomCity] = useState("");

  //calculate the distance from two coordinates
  const toRad = (Value) => {
    return (Value * Math.PI) / 180;
  };

  const calcCrow = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    if (d > 0) {
      setDistance(distance + d);
      setCurrentDistance(d);
    }
    return d;
  };

  const randomCityFun = () => {
    // function to get a random city to find with latitude & longitude
    const item = DATA.cities.map((item) => item.name);
    const cityName = Math.floor(Math.random() * item.length);
    var randomCity = item[cityName];
    setFindRandomCity(randomCity);

    const itemAddress = DATA.cities.filter(
      (item) => item.name === randomCity
    )[0];

    const latLongAD = {
      latLngA: itemAddress.position.lat,
      latLngD: itemAddress.position.lng,
      latLngB: null,
      latLngC: null,
    };

    setData(latLongAD);
  };

  useEffect(() => {
    randomCityFun();
  }, []);

  const handleOutsideLatLng = (e) => {
    // function to get the longitude and latitude where the user click
    let outsideLat = e.lat;
    let outsideLng = e.lng;

    const latLongBC = {
      ...data,
      latLngB: outsideLat,
      latLngC: outsideLng,
    };

    console.log(latLongBC);

    setData(latLongBC);

    calcCrow(data.latLngA, data.latLngD, outsideLat, outsideLng).toFixed(1);

    if (currentDistance < 50) {
      // score will inclease if user clicked between 50km area
      setScore(score + 1);
      randomCityFun();
    }
  };

  return (
    <div className="grid-container">
      <div className="grid-item">
        <h2>
          Find the City:{" "}
          <span style={{ fontSize: "1.3em", textDecoration: "underline" }}>
            {findRandomCity}
          </span>
        </h2>
        <div id="map" style={{ height: "60vh", width: "100%" }}>
          <GoogleMapReact
            onClick={(e) => handleOutsideLatLng(e)}
            bootstrapURLKeys={{
              key: `${process.env.REACT_APP_MAP}`,
            }}
            defaultCenter={center}
            center={center}
            defaultZoom={3}
            options={{
              styles: mapStyle,
            }}
          >
            {DATA.cities.map((item) => (
              <AnyReactComponent
                name={item.name}
                lat={item.position.lat}
                lng={item.position.lng}
                marker={
                  <img
                    style={{
                      height: "30px",
                      width: "30px",
                    }}
                    src={marker}
                    alt="..."
                  />
                }
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>
      <div className="grid-item">
        <ScoreBoard
          score={score}
          distance={distance}
          currentDistance={currentDistance}
        ></ScoreBoard>
      </div>
    </div>
  );
};

export default Map;
