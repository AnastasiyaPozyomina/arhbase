import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

const ChurchMapContent = ({ lat, lng, name, type, founded }) => {
  const [MapModule, setMapModule] = useState(null);

  useEffect(() => {
    import('react-leaflet').then((module) => {
      setMapModule(module);
    });
  }, []);

  if (!MapModule) {
    return (
      <div style={{ 
        height: '300px', 
        background: '#f9fafb', 
        borderRadius: '12px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#6b7280',
        border: '1px solid #e5e7eb'
      }}>
        Загрузка карты...
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapModule;
  const L = require('leaflet');

  // Иконка православной церкви (ваше изображение)
 const orthodoxIcon = L.icon({
  iconUrl: '/img/church.ico',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  shadowUrl: null,
});

  // Иконка единоверческой церкви (SVG с двуперстием)
  const edinovertsyIcon = L.divIcon({
    className: 'church-map-marker',
    html: `
      <div style="position: relative; width: 40px; height: 40px;">
        <svg width="40" height="40" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
          <rect x="12" y="32" width="40" height="28" fill="#f0f0f0" stroke="#333" stroke-width="1"/>
          <ellipse cx="32" cy="20" rx="8" ry="12" fill="#4CAF50" stroke="#333" stroke-width="1"/>
          <line x1="32" y1="8" x2="32" y2="14" stroke="#333" stroke-width="2"/>
          <line x1="29" y1="10" x2="35" y2="10" stroke="#333" stroke-width="2"/>
          <ellipse cx="20" cy="26" rx="6" ry="9" fill="#4CAF50" stroke="#333" stroke-width="1"/>
          <line x1="20" y1="17" x2="20" y2="21" stroke="#333" stroke-width="1.5"/>
          <line x1="18" y1="18.5" x2="22" y2="18.5" stroke="#333" stroke-width="1.5"/>
          <ellipse cx="44" cy="26" rx="6" ry="9" fill="#4CAF50" stroke="#333" stroke-width="1"/>
          <line x1="44" y1="17" x2="44" y2="21" stroke="#333" stroke-width="1.5"/>
          <line x1="42" y1="18.5" x2="46" y2="18.5" stroke="#333" stroke-width="1.5"/>
          <!-- Двуперстие -->
          <path d="M 28 42 Q 28 38 30 38 L 30 32 Q 30 30 32 30 Q 34 30 34 32 L 34 38 Q 36 38 36 42" 
                fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"/>
          <rect x="18" y="38" width="6" height="10" fill="#87CEEB" stroke="#333" stroke-width="0.5"/>
          <rect x="40" y="38" width="6" height="10" fill="#87CEEB" stroke="#333" stroke-width="0.5"/>
          <rect x="28" y="48" width="8" height="12" fill="#8B4513" stroke="#333" stroke-width="0.5"/>
        </svg>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const icon = type === 'edinovertsy' ? edinovertsyIcon : orthodoxIcon;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height: '300px', width: '100%', borderRadius: '12px' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={icon}>
        <Popup>
          <div style={{ minWidth: '200px' }}>
            <strong style={{ fontSize: '16px' }}>{name}</strong><br />
            {founded && <span style={{ color: '#666', fontSize: '13px' }}>Основан: {founded} г.<br /></span>}
            <span style={{ fontSize: '13px', color: type === 'edinovertsy' ? '#10b981' : '#3b82f6' }}>
              {type === 'edinovertsy' ? 'Единоверческий приход' : 'Православный приход'}
            </span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default function ChurchMap({ lat, lng, name, type, founded }) {
  return (
    <div className="church-map-wrapper" style={{ marginBottom: '30px' }}>
      <ChurchMapContent lat={lat} lng={lng} name={name} type={type} founded={founded} />

      <style>{`
        .church-map-wrapper {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .church-map-marker {
          background: transparent !important;
          border: none !important;
        }
        .church-map-marker .leaflet-marker-shadow {
          display: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </div>
  );
}