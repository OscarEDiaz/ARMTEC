import { useEffect, useState, useRef } from "react";

import '../../../styles/map.css';

export const Map = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (mapRef.current && !map)
            setMap(new window.google.maps.Map(mapRef.current, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            }));
    }, [mapRef, map])

    return (
        <div className="map" ref={mapRef}></div>
    )
}
