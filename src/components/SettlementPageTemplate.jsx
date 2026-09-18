import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import BrowserOnly from '@docusaurus/BrowserOnly';

let leafletModules = null;

const getLeafletModules = () => {
  if (!leafletModules) {
    const L = require('leaflet');
    const reactLeaflet = require('react-leaflet');
    leafletModules = { L, ...reactLeaflet };
  }
  return leafletModules;
};

const SettlementMap = ({
  lat,
  lng,
  name,
  status,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const { MapContainer, TileLayer, Marker, Popup, useMap } = getLeafletModules();
  const L = leafletModules.L;

  const safeLat = parseFloat(lat);
  const safeLng = parseFloat(lng);

  if (isNaN(safeLat) || isNaN(safeLng)) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fef3c7',
          color: '#92400e',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
          <div>Координаты не указаны для "{name}"</div>
        </div>
      </div>
    );
  }

  const MapResizer = () => {
    const map = useMap();
    useEffect(
      () => {
        const timer = setTimeout(() => {
          map.invalidateSize();
        }, 100);
        return () => clearTimeout(timer);
      },
      [map]
    );
    return null;
  };

  const markerColor = status === 'не существует' ? '#9ca3af' : '#3b82f6';
  const markerShadow = status === 'не существует'
    ? '0 3px 12px rgba(156, 163, 175, 0.4)'
    : '0 3px 12px rgba(59, 130, 246, 0.4)';

  const icon = L.divIcon({
    className: 'settlement-map-marker',
    html: `
      <div style="
        width: 36px; 
        height: 36px; 
        border-radius: 50%; 
        background: ${markerColor};
        box-shadow: ${markerShadow};
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid #ffffff;
      ">
        <div style="width: 12px; height: 12px; background: white; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[safeLat, safeLng]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        whenCreated={map => {
          setTimeout(() => map.invalidateSize(), 100);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          maxNativeZoom={19}
          updateWhenIdle={true}
          updateWhenZooming={false}
          keepBuffer={2}
        />

        <MapResizer />
        <Marker position={[safeLat, safeLng]} icon={icon}>
          <Popup>
            <div style={{ minWidth: '200px' }}>
              <strong
                style={{
                  fontSize: '16px',
                  display: 'block',
                  marginBottom: '6px',
                }}
              >
                {name}
              </strong>
              {status === 'не существует' &&
                <span
                  style={{
                    fontSize: '12px',
                    color: '#991b1b',
                    fontStyle: 'italic',
                  }}
                >
                  (исчезнувшая деревня)
                </span>}
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      <button
        className="map-fullscreen-btn"
        onClick={onToggleFullscreen}
        title={isFullscreen ? 'Свернуть' : 'На весь экран'}
      >
        {isFullscreen ? '⊡' : '⊞'}
      </button>
    </div>
  );
};

export default function SettlementPageTemplate({
  settlementId: propSettlementId,
}) {
  const location = useLocation();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [settlement, setSettlement] = useState(null);
  const [loading, setLoading] = useState(true);

  const pathParts = location.pathname.split('/').filter(Boolean);
  const settlementId = propSettlementId || pathParts[pathParts.length - 1];

  useEffect(
    () => {
      let cancelled = false;

      const loadSettlement = async () => {
        try {
          const res = await fetch('/data/settlements.json');
          const data = await res.json();
          const found = data.find(s => s.id === settlementId);
          if (!cancelled) {
            setSettlement(found || null);
            setLoading(false);
          }
        } catch (err) {
          if (!cancelled) {
            console.error('Ошибка загрузки:', err);
            setLoading(false);
          }
        }
      };

      loadSettlement();

      return () => {
        cancelled = true;
      };
    },
    [settlementId]
  );

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e2e8f0',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 12px',
          }}
        />
        Загрузка...
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!settlement) {
    return (
      <div style={{ padding: '20px', color: '#6b7280' }}>
        Деревня не найдена: {settlementId}
      </div>
    );
  }

  return (
    <div
      className={`settlement-page-template ${isFullscreen ? 'fullscreen' : ''}`}
    >
      <div className="settlement-map-container">
        <BrowserOnly
          fallback={
            <div className="map-loading">
              <div className="spinner" />
              <span>Загрузка карты...</span>
            </div>
          }
        >
          {() => (
            <SettlementMap
              lat={settlement.lat}
              lng={settlement.lng}
              name={settlement.name}
              status={settlement.status}
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
            />
          )}
        </BrowserOnly>
      </div>

      <div className="settlement-info-card">
        <h2 className="settlement-title">
          {settlement.type &&
            <span className="settlement-type">{settlement.type} </span>}
          {settlement.name}
          {settlement.kazakh_name && ` (каз. ${settlement.kazakh_name})`}
        </h2>

        {settlement.status === 'не существует' &&
          <div className="settlement-status-dead">
            ⚠️ Исчезнувший населённый пункт
          </div>}

        {settlement.description &&
          <p className="settlement-description">
            {settlement.description}
          </p>}

        {settlement.historical_names &&
          <p className="settlement-meta">
            <strong>Исторические названия:</strong>
            {' '}
            {Array.isArray(settlement.historical_names)
              ? settlement.historical_names.join(', ')
              : settlement.historical_names}
          </p>}

        {settlement.district &&
          <p className="settlement-meta">
            <strong>Район:</strong> {settlement.district}
          </p>}

        {settlement.region &&
          <p className="settlement-meta">
            <strong>Область:</strong> {settlement.region}
          </p>}

        {settlement.country &&
          <p className="settlement-meta">
            <strong>Страна:</strong> {settlement.country}
          </p>}

        {settlement.founded &&
          <p className="settlement-meta">
            <strong>Год основания:</strong> {settlement.founded}
          </p>}
      </div>

      <style>{`
  .settlement-page-template {
    margin-bottom: 30px;
  }
  
  .settlement-page-template.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: white;
    padding: 20px;
    overflow: auto;
  }
  
  .settlement-map-container {
    position: relative !important;
    border-radius: 12px;
    overflow: hidden !important;
    border: 1px solid #e5e7eb;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    height: 400px;
  }
  
  .settlement-page-template.fullscreen .settlement-map-container {
    height: calc(100vh - 100px);
    margin-bottom: 0;
  }
  
  .map-wrapper {
    position: relative !important;
    height: 100% !important;
    width: 100% !important;
  }
  
  .map-fullscreen-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    background: white;
    border: 2px solid rgba(0,0,0,0.2);
    border-radius: 4px;
    cursor: pointer;
    z-index: 1000;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 5px rgba(0,0,0,0.4);
    transition: background 0.2s;
    padding: 0;
    line-height: 1;
  }
  
  .map-fullscreen-btn:hover {
    background: #f4f4f4;
  }
  
  .settlement-info-card {
    padding: 20px;
    background: #f9fafb;
    border-radius: 12px;
    margin-bottom: 24px;
    border: 1px solid #e5e7eb;
  }
  
  .settlement-title {
    margin: 0 0 12px 0;
    font-size: 22px;
    font-weight: 600;
    color: #111827;
  }
  
  .settlement-type {
    font-weight: 400;
    color: #6b7280;
    font-size: 18px;
    text-transform: lowercase;
  }
  
  .settlement-status-dead {
    display: inline-block;
    padding: 6px 12px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 6px;
    color: #991b1b;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 12px;
  }
  
  .settlement-description {
    margin: 0 0 12px 0;
    padding: 10px 12px;
    background: #fffbeb;
    border-left: 3px solid #f59e0b;
    border-radius: 6px;
    color: #78350f;
    font-size: 14px;
    font-style: italic;
  }
  
  .settlement-meta {
    margin: 0 0 8px 0;
    color: #6b7280;
    font-size: 14px;
  }
  
  .settlement-meta strong {
    color: #374151;
  }
  
  .settlement-map-marker {
    background: transparent !important;
    border: none !important;
  }
  
  /* Кнопки зума — позиционируются внутри карты */
  .leaflet-top.leaflet-left {
    position: absolute !important;
    top: 10px !important;
    left: 10px !important;
    z-index: 1000 !important;
  }
  
  .leaflet-control-zoom {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: #ffffff !important;
    border: 2px solid rgba(0,0,0,0.2) !important;
    border-radius: 4px !important;
    box-shadow: 0 1px 5px rgba(0,0,0,0.4) !important;
    z-index: 1000 !important;
  }
  
  .leaflet-control-zoom a {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 30px !important;
    height: 30px !important;
    line-height: 30px !important;
    text-align: center !important;
    font-size: 18px !important;
    font-weight: bold !important;
    color: #333333 !important;
    background: #ffffff !important;
    text-decoration: none !important;
    border-bottom: 1px solid #cccccc !important;
    cursor: pointer !important;
    position: relative !important;
  }
  
  .leaflet-control-zoom-in::before {
    content: '+' !important;
  }
  
  .leaflet-control-zoom-out::before {
    content: '−' !important;
  }
  
  .leaflet-control-zoom a span {
    display: none !important;
  }
  
  .leaflet-control-zoom a:hover {
    background: #f4f4f4 !important;
    color: #000000 !important;
  }
  
  .leaflet-control-zoom a:last-child {
    border-bottom: none !important;
  }
  
  .map-loading {
    height: 100%;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #64748b;
    font-size: 16px;
    gap: 12px;
  }
  
  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`}</style>
    </div>
  );
}
