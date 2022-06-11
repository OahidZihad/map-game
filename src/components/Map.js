import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import marker from "../assets/marker.png";
import { DATA } from "../Data";
import ScoreBoard from "./ScoreBoard";
import "./map.css";

Geocode.setApiKey("AIzaSyDqdMhtdf2pIqsMrOyDCMrQja1EiMCgZoU");
Geocode.enableDebug();

const Map = () => {
  const mapStyle = [
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
  ];

  const center = { lat: 54.526, lng: 15.2551 };

  const AnyReactComponent = ({ marker, lat, lng, name }) => (
    <div
      lat={lat}
      lng={lng}
      name={name}
      onClick={() => handleClick(lat, lng, name)}
    >
      {marker}
    </div>
  );

  const [latLngA, setLatLngA] = useState();
  const [latLngD, setLatLngD] = useState();
  const [latLngB, setLatLngB] = useState();
  const [latLngC, setLatLngC] = useState();
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  console.log("distance", distance);

  console.log(latLngA, latLngD, latLngB, latLngC);

  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  function calcCrow(latLngA, latLngD, latLngB, latLngC) {
    var R = 6371; // km
    var dLat = toRad(latLngB - latLngA);
    var dLon = toRad(latLngC - latLngD);
    var latLngA = toRad(latLngA);
    var latLngB = toRad(latLngB);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
        Math.sin(dLon / 2) *
        Math.cos(latLngA) *
        Math.cos(latLngB);

    // if (a < 0) {
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    // }
    if (d > 0) {
      setDistance(d);
    }
    return d;
  }

  useEffect(() => {
    calcCrow(latLngA, latLngD, latLngB, latLngC).toFixed(1);
  }, [latLngA, latLngD, latLngB, latLngC]);

  const [randomCity, setRandomCity] = useState("");

  const randomCityFun = () => {
    const item = DATA.cities.map((item) => item.name);
    const cityName = Math.floor(Math.random() * item.length);
    var randomCity = item[cityName];
    setRandomCity(randomCity);

    const itemAddress = DATA.cities.filter(
      (item) => item.name === randomCity
    )[0];

    setLatLngA(itemAddress.position.lat);
    setLatLngD(itemAddress.position.lng);
  };

  useEffect(() => {
    randomCityFun();
  }, []);

  const handleClick = (lat, lng, name) => {
    // if (randomCity === name) {
    //   setScore(score + 1);
    //   randomCityFun();
    // } else {
    //   console.log("incorrect");
    //   randomCityFun();
    // }
    // if (distance < 50) {
    //   console.log("distance22", distance);
    //   setScore(score + 1);
    //   randomCityFun();
    // } else {
    //   randomCityFun();
    // }
  };

  const handleOutsideLatLng = (e) => {
    let outsideLat = e.lat;
    let outsideLng = e.lng;
    setLatLngB(outsideLat);
    setLatLngC(outsideLng);

    console.log("distance33", distance);

    if (distance - 1000 < 50) {
      setScore(score + 1);
      randomCityFun();
    } else {
      randomCityFun();
    }
  };

  return (
    <div className="grid-container">
      <div className="grid-item">
        <h2>Find the city: {randomCity}</h2>
        <div id="map" style={{ height: "60vh", width: "100%" }}>
          <GoogleMapReact
            onClick={(e) => handleOutsideLatLng(e)}
            bootstrapURLKeys={{
              key: "AIzaSyDqdMhtdf2pIqsMrOyDCMrQja1EiMCgZoU",
            }}
            defaultCenter={center}
            center={center}
            defaultZoom={3}
            options={{
              styles: mapStyle,
            }}
            // onChange={""}
            // onChildClick={""}
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
        <ScoreBoard score={score} distance={distance}></ScoreBoard>
      </div>
    </div>
  );
};

export default Map;
