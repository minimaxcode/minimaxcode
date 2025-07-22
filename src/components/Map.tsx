// src/components/Map.tsx

import React from 'react';

export const MapComponent = () => {
  // 使用Google Maps嵌入式iframe，确保显示具体地址的位置标记
  const address = "東京都台東区浅草橋4-15-5-301";
  const encodedAddress = encodeURIComponent(address);
  // 使用z=15缩放级别，提供合适的视野范围
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&z=16&output=embed`;

  return (
    <div 
      style={{
  width: '100%',
  height: '100%',
  minHeight: '300px',
  borderRadius: '1rem',
        border: '2px solid #60a5fa',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#14b8a6';
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#60a5fa';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {/* Google Maps嵌入式iframe */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <iframe
          src={googleMapsEmbedUrl}
          width="100%"
          height="100%"
          style={{
            border: '0',
            borderRadius: '1rem'
          }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="MiniMaxCode Location"

        />
      </div>
    </div>
  );
};