// src/components/Map.tsx

import React from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '300px',
  borderRadius: '1rem',
};

const center = {
  lat: 35.6986656,
  lng: 139.7804746
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapId: 'MINIMAXCODE_MAP_ID' // It is recommended to use a Map ID for advanced markers
};

interface MapProps {
  apiKey: string;
}

export const MapComponent = ({ apiKey }: MapProps) => {
  if (!apiKey) {
    return <div>Loading Map... API key is missing.</div>;
  }
  
  const handleMarkerClick = () => {
    const address = '〒111-0053 東京都台東区浅草橋4丁目15−5 三基ビル301';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={containerStyle}
        defaultCenter={center}
        defaultZoom={17}
        {...mapOptions}
      >
        <AdvancedMarker
          position={center}
          onClick={handleMarkerClick}
          title="MiniMaxCode (クリックしてGoogleマップで表示)"
        />
      </Map>
    </APIProvider>
  );
};