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

  // const [latLngA, setLatLngA] = useState();
  // const [latLngD, setLatLngD] = useState();
  // const [latLngB, setLatLngB] = useState();
  // const [latLngC, setLatLngC] = useState();

  const [data, setData] = useState({
    latLngA: null,
    latLngD: null,
    latLngB: null,
    latLngC: null,
  });

  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState("");
  // console.log("distance", distance);

  // console.log(latLngA, latLngD, latLngB, latLngC);
  console.log("data", data);

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
      setDistance(d);
    }
    return d;
  };

  // useEffect(() => {
  //   calcCrow(data.latLngA, data.latLngD, data.latLngB, data.latLngC).toFixed(1);
  // }, [data.latLngA, data.latLngD, data.latLngB, data.latLngC]);

  // if ((data.latLngA, data.latLngD, data.latLngB, data.latLngC)) {
  //   calcCrow(data.latLngA, data.latLngD, data.latLngB, data.latLngC).toFixed(1);
  // }

  const [findRandomCity, setFindRandomCity] = useState("");

  const randomCityFun = () => {
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

    // console.log(itemAddress);
  };

  // const getRandomCityPosition = () => {
  //   const itemAddress = DATA.cities.filter(
  //     (item) => item.name === findRandomCity
  //   )[0];

  //   const latLongAD = {
  //     latLngA: itemAddress.position.lat,
  //     latLngD: itemAddress.position.lng,
  //     latLngB: null,
  //     latLngC: null,
  //   };

  //   setData(latLongAD);
  // };

  useEffect(() => {
    randomCityFun();
    // const intervalId = setInterval(() => {
    //   randomCityFun();
    // }, 10000);
    // return () => clearInterval(intervalId);
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

    const latLongBC = {
      ...data,
      latLngB: outsideLat,
      latLngC: outsideLng,
    };

    console.log(latLongBC);

    setData(latLongBC);

    calcCrow(data.latLngA, data.latLngD, outsideLat, outsideLng).toFixed(1);
    // calcCrow(data.latLngA, data.latLngD, data.latLngB, data.latLngC).toFixed(1);

    if (distance < 50) {
      setScore(score + 1);
      randomCityFun();
    } else {
      // randomCityFun();
    }
  };

  return (
    <div className="grid-container">
      <div className="grid-item">
        <h2>Find the city: {findRandomCity}</h2>
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
