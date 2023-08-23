import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const MapView = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyDvC9zUdm6tBSXy_joQjZpmvmmWde7unpc",
      version: "weekly",
    });

    loader.load().then(() => {
      new window.google.maps.Map(mapContainerRef.current, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 14,
      });
    });
  }, []);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapView;
