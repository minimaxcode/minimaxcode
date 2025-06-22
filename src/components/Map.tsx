// src/components/Map.tsx

import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '300px',
  borderRadius: '1rem',
};

const center = {
  lat: 35.698676,
  lng: 139.780370
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [ /* ... スタイル定義（変更なし） ... */ ]
};

interface MapProps {
  apiKey: string;
}

export const MapComponent = ({ apiKey }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  // [バグ修正] Googleマップで住所を検索するための正しいURL形式に修正しました
  const handleMarkerClick = () => {
    const address = '〒111-0053 東京都台東区浅草橋4丁目15−5 三基ビル301';
    // 正しいGoogle Mapsの検索用URL
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={17}
      options={mapOptions}
    >
      <Marker
        position={center}
        onClick={handleMarkerClick}
        title="MiniMaxCode (クリックしてGoogleマップで表示)"
      />
    </GoogleMap>
  );
};