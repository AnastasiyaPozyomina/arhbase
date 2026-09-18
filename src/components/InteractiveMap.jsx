import React, { useState, useRef, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useSettlementsData } from '../hooks/useSettlementsData';
import 'leaflet/dist/leaflet.css';

let leafletModules = null;

const getLeafletModules = () => {
  if (!leafletModules) {
    const L = require('leaflet');
    const reactLeaflet = require('react-leaflet');
    leafletModules = { L, ...reactLeaflet };
  }
  return leafletModules;
};

const normalizeData = (data) => {
  if (!data) return [];
  return data.map(item => ({
    ...item,
    historical_names: Array.isArray(item.historical_names)
      ? item.historical_names
      : (item.historical_names ? [String(item.historical_names)] : [])
  }));
};

// ===== Компонент слоёв поселений =====
const SettlementLayers = ({ enabledGroups, peasantData, allSettlements }) => {
  const { useMap, L } = getLeafletModules();
  const map = useMap();
  const layerRefs = useRef({});

  useEffect(() => {
    if (!map || !L || !peasantData) return;

    peasantData.groups?.forEach(group => {
      // Удаляем старые слои
      if (layerRefs.current[group.id]) {
        layerRefs.current[group.id].forEach(layer => {
          if (map.hasLayer(layer)) {
            map.removeLayer(layer);
          }
        });
        delete layerRefs.current[group.id];
      }

      if (enabledGroups[group.id]) {
        const layers = [];

        // ===== АЛТАЙСКИЕ КАМЕНЩИКИ: красные анимированные флажки =====
        if (group.id === 'bukhtarminskie' && group.villages && Array.isArray(group.villages)) {
          group.villages.forEach(villageId => {
            const village = allSettlements?.find(s => s.id === villageId);
            if (!village || !village.lat || !village.lng) {
              console.warn('Не найдено поселение каменщиков:', villageId);
              return;
            }
            if (!village || !village.lat || !village.lng) return;

            const marker = L.marker([village.lat, village.lng], {
              icon: L.divIcon({
                className: 'custom-map-marker',
                html: `<div class="bukhtarmin-flag" style="position:relative;width:28px;height:28px;">
                  <svg width="28" height="28" viewBox="0 0 24 24" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,0.3));">
                    <path d="M5 2 L5 22" stroke="#374151" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M5 3 L19 3 L16 7 L19 11 L5 11 Z" fill="#dc2626" stroke="#ffffff" stroke-width="0.8"/>
                  </svg>
                </div>`,
                iconSize: [28, 28],
                iconAnchor: [14, 28],
                popupAnchor: [0, -28],
              })
            });

            marker.bindPopup(`
              <div style="padding: 8px; min-width: 200px;">
                <h4 style="margin: 0 0 6px 0; font-size: 14px; color: #111827;">
                  ${village.name}
                </h4>
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">
                  Алтайские каменщики (бухтарминцы)
                </p>
                <a href="${village.doc_url}" style="display: block; text-align: center; padding: 6px 12px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-size: 12px;">
                  Открыть страницу →
                </a>
              </div>
            `);

            marker.addTo(map);
            layers.push(marker);
          });
        }

        // ===== ЛИНИЯ: Иртышская казачья линия =====
        if (group.type === 'line' && group.line && Array.isArray(group.line)) {
          const polyline = L.polyline(group.line, {
            color: group.color,
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 10',
            className: 'irtish-line'
          });

          polyline.bindPopup(`
            <div style="padding: 8px; min-width: 250px;">
              <h4 style="margin: 0 0 8px 0; color: ${group.color}; font-size: 15px;">
                ${group.name}
              </h4>
              <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.4;">
                ${group.description}
              </p>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">
                Поселений: ${group.villages?.length || 0}
              </p>
            </div>
          `);

          polyline.addTo(map);
          layers.push(polyline);

          group.villages?.forEach(village => {
            const isDead = village.status === 'не существует';
            const markerColor = isDead ? '#9ca3af' : group.color;
            const markerSize = village.type === 'станица' ? 10 : (village.type === 'крепость' ? 12 : 7);

            const marker = L.circleMarker([village.lat, village.lng], {
              radius: markerSize,
              fillColor: markerColor,
              color: '#ffffff',
              weight: 2,
              opacity: 1,
              fillOpacity: 0.9
            });

            marker.bindPopup(`
              <div style="padding: 8px; min-width: 200px;">
                <h4 style="margin: 0 0 6px 0; font-size: 14px; color: ${isDead ? '#6b7280' : '#111827'};">
                  ${village.name}
                  ${isDead ? '<span style="font-size: 11px; color: #991b1b; margin-left: 6px;">(исчез)</span>' : ''}
                </h4>
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">
                  ${village.type} • ${group.name}
                </p>
                <a href="${village.doc_url}" style="display: block; text-align: center; padding: 6px 12px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-size: 12px;">
                  Открыть страницу →
                </a>
              </div>
            `);

            marker.addTo(map);
            layers.push(marker);
          });
        }
        // ===== ПОЛИГОНЫ =====
        else if (group.polygons && typeof group.polygons === 'object' && Object.keys(group.polygons).length > 0) {
          Object.entries(group.polygons).forEach(([villageId, polygonCoords]) => {
            if (Array.isArray(polygonCoords) && polygonCoords.length >= 3) {
              const isValid = polygonCoords.every(point =>
                Array.isArray(point) && point.length === 2 &&
                typeof point[0] === 'number' && typeof point[1] === 'number'
              );

              if (isValid) {
                const polygon = L.polygon(polygonCoords, {
                  color: group.color,
                  weight: 2,
                  opacity: 0.6,
                  fillColor: group.color,
                  fillOpacity: group.opacity,
                  className: 'peasant-settlement-layer'
                });

                polygon.bindPopup(`
                  <div style="padding: 8px; min-width: 200px;">
                    <h4 style="margin: 0 0 8px 0; color: ${group.color}; font-size: 15px;">
                      ${group.name}
                    </h4>
                    <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.4;">
                      ${group.description}
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">
                      Деревня: ${villageId}
                    </p>
                  </div>
                `);

                polygon.addTo(map);
                layers.push(polygon);
              }
            }
          });
        }
        // ===== BOUNDING BOX =====
        else {
          const villageCoords = peasantData.settlements
            ?.filter(s => group.villages?.includes(s.id))
            .map(s => [s.lat, s.lng])
            .filter(coord => coord[0] && coord[1]);

          if (villageCoords && villageCoords.length > 0) {
            const lats = villageCoords.map(c => c[0]);
            const lngs = villageCoords.map(c => c[1]);
            const minLat = Math.min(...lats);
            const maxLat = Math.max(...lats);
            const minLng = Math.min(...lngs);
            const maxLng = Math.max(...lngs);

            const padding = 0.1;
            const bbox = [
              [minLat - padding, minLng - padding],
              [minLat - padding, maxLng + padding],
              [maxLat + padding, maxLng + padding],
              [maxLat + padding, minLng - padding]
            ];

            const polygon = L.polygon(bbox, {
              color: group.color,
              weight: 2,
              opacity: 0.6,
              fillColor: group.color,
              fillOpacity: group.opacity,
              className: 'peasant-settlement-layer'
            });

            polygon.bindPopup(`
              <div style="padding: 8px; min-width: 200px;">
                <h4 style="margin: 0 0 8px 0; color: ${group.color}; font-size: 15px;">
                  ${group.name}
                </h4>
                <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.4;">
                  ${group.description}
                </p>
                <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">
                  Деревень: ${group.villages?.length || 0}
                </p>
              </div>
            `);

            polygon.addTo(map);
            layers.push(polygon);
          }
        }

        layerRefs.current[group.id] = layers;
      }
    });

    return () => {
      Object.values(layerRefs.current).forEach(layers => {
        layers.forEach(layer => {
          if (map.hasLayer(layer)) {
            map.removeLayer(layer);
          }
        });
      });
      layerRefs.current = {};
    };
  }, [map, L, enabledGroups, peasantData, allSettlements]);

  return null;
};

// ===== Компонент управления слоями =====
const LayersControl = ({ enabledGroups, onToggle, peasantData }) => {
  if (!peasantData) {
    return (
      <div className="layers-control-panel">
        <div className="layers-control-header">
          <span className="layers-control-icon">🗺️</span>
          <span>Слои поселений</span>
        </div>
        <div style={{ fontSize: '11px', color: '#9ca3af', padding: '8px 0' }}>
          Данные не загружены
        </div>
      </div>
    );
  }

  if (!peasantData.groups || peasantData.groups.length === 0) {
    return (
      <div className="layers-control-panel">
        <div className="layers-control-header">
          <span className="layers-control-icon">️</span>
          <span>Слои поселений</span>
        </div>
        <div style={{ fontSize: '11px', color: '#9ca3af', padding: '8px 0' }}>
          Нет доступных слоёв
        </div>
      </div>
    );
  }

  return (
    <div className="layers-control-panel">
      <div className="layers-control-header">
        <span className="layers-control-icon">🗺️</span>
        <span>Слои поселений</span>
      </div>
      <div className="layers-control-list">
        {peasantData.groups.map(group => (
          <label key={group.id} className="layer-toggle">
            <input
              type="checkbox"
              checked={enabledGroups[group.id] || false}
              onChange={() => onToggle(group.id)}
            />
            <span className="layer-color-indicator" style={{ background: group.color }}></span>
            <span className="layer-name">{group.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

// ===== Содержимое карты =====
const MapContent = ({ filterText, activeTab, selectedId, selectedDistrict, enabledGroups, data }) => {
  const { MapContainer, TileLayer, Marker, Popup, useMap, L, ZoomControl } = getLeafletModules();

  const settlementsData = data?.settlements || [];
  const churchesData = data?.churches || [];
  const peasantData = data?.peasantSettlements;

  const MapController = ({ filteredData, selectedId }) => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      const raf = requestAnimationFrame(() => {
        map.invalidateSize();
      });

      if (selectedId) {
        const selectedItem = filteredData.find(item => item.id === selectedId);
        if (selectedItem) {
          map.setView([selectedItem.lat, selectedItem.lng], 13);
        }
        return () => cancelAnimationFrame(raf);
      }

      if (filteredData.length > 0) {
        try {
          if (filteredData.length === 1) {
            map.setView([filteredData[0].lat, filteredData[0].lng], 12);
          } else {
            const bounds = L.latLngBounds(
              filteredData.map(item => [item.lat, item.lng])
            );
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
          }
        } catch (e) {
          console.warn('Ошибка масштабирования:', e);
        }
      }

      return () => cancelAnimationFrame(raf);
    }, [map, filteredData, selectedId]);

    return null;
  };

  const createCustomIcon = (type, isDead) => {
    if (isDead) {
      return L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="position:relative;width:40px;height:40px;"><svg width="40" height="40" viewBox="0 0 24 24" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.2));"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#9ca3af"/><circle cx="12" cy="12" r="4" fill="white"/></svg></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
    }

    if (type === 'edinovertsy' || type === 'church-edinovertsy') {
      return L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="width:44px;height:44px;border-radius:50%;background:#4CAF50;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;border:2px solid #fff;"><svg width="28" height="28" viewBox="0 0 64 64"><rect x="12" y="32" width="40" height="28" fill="#f0f0f0" stroke="#333" stroke-width="1"/><ellipse cx="32" cy="20" rx="8" ry="12" fill="#FFD700" stroke="#333" stroke-width="1"/><line x1="32" y1="8" x2="32" y2="14" stroke="#333" stroke-width="2"/><line x1="29" y1="10" x2="35" y2="10" stroke="#333" stroke-width="2"/></svg></div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -44],
      });
    } else if (type === 'orthodox' || type === 'church-orthodox') {
      return L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="width:44px;height:44px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;border:2px solid #e5e7eb;"><img src="/img/church.ico" style="width:32px;height:32px;object-fit:contain;"/></div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -44],
      });
    } else {
      return L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="position:relative;width:40px;height:40px;"><svg width="40" height="40" viewBox="0 0 24 24" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.2));"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#3b82f6"/><circle cx="12" cy="12" r="4" fill="white"/></svg></div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
    }
  };

  const allData = activeTab === 'settlements'
    ? normalizeData(settlementsData)
    : normalizeData(churchesData);

  const filteredData = allData.filter(item => {
    if (selectedDistrict && item.district !== selectedDistrict) {
      return false;
    }

    if (!filterText || filterText.length < 3) {
      return true;
    }

    const term = filterText.toLowerCase();

    const nameMatch = item.name?.toLowerCase().includes(term);
    const kazakhMatch = item.kazakh_name?.toLowerCase().includes(term);
    const historicalMatch = Array.isArray(item.historical_names)
      ? item.historical_names.some(n => n.toLowerCase().includes(term))
      : false;

    return nameMatch || kazakhMatch || historicalMatch;
  });

  return (
    <MapContainer
      key={`map-${activeTab}-${selectedDistrict}`}
      center={[50.5, 82.0]}
      zoom={7}
      className="map-leaflet-container"
      preferCanvas={true}
      whenCreated={(mapInstance) => {
        const delays = [100, 300, 600];
        delays.forEach(delay => {
          setTimeout(() => {
            if (mapInstance && mapInstance.getContainer()) {
              mapInstance.invalidateSize();
            }
          }, delay);
        });
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

      <ZoomControl position="topright" />

      <SettlementLayers
        enabledGroups={enabledGroups}
        peasantData={peasantData}
        allSettlements={settlementsData}
      />
      <MapController filteredData={filteredData} selectedId={selectedId} />
      {filteredData.map((item) => {
        const isDead = item.status === 'не существует';
        return (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={createCustomIcon(
              activeTab === 'churches' ? item.type : 'settlement',
              isDead
            )}
          >
            <Popup maxWidth={340} minWidth={260}>
              <div style={{ padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: activeTab === 'churches'
                      ? (item.type === 'edinovertsy' ? '#d1fae5' : '#f3f4f6')
                      : (isDead ? '#f3f4f6' : '#dbeafe'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden'
                  }}>
                    {activeTab === 'churches' ? (
                      item.type === 'edinovertsy' ? (
                        <svg width="22" height="22" viewBox="0 0 64 64">
                          <rect x="12" y="32" width="40" height="28" fill="#f0f0f0" stroke="#333" strokeWidth="1" />
                          <ellipse cx="32" cy="20" rx="8" ry="12" fill="#FFD700" stroke="#333" strokeWidth="1" />
                          <line x1="32" y1="8" x2="32" y2="14" stroke="#333" strokeWidth="2" />
                          <line x1="29" y1="10" x2="35" y2="10" stroke="#333" strokeWidth="2" />
                        </svg>
                      ) : (
                        <img src="/img/church.ico" alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
                      )
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={isDead ? '#9ca3af' : '#3b82f6'}>
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" />
                        <circle cx="12" cy="9" r="2.5" fill="white" />
                      </svg>
                    )}
                  </div>
                  <h3 style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: isDead ? '#6b7280' : '#111827',
                    lineHeight: '1.3',
                    margin: 0
                  }}>
                    {item.name}
                    {isDead && (
                      <span style={{
                        fontSize: '11px',
                        color: '#991b1b',
                        marginLeft: '6px',
                        fontWeight: '400'
                      }}>
                        (исчезла)
                      </span>
                    )}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  {activeTab === 'churches' ? (
                    <>
                      {item.founded && (
                        <span style={{ padding: '3px 8px', background: '#f3f4f6', borderRadius: '10px', fontSize: '11px', color: '#374151', fontWeight: '500' }}>
                          📅 {item.founded} г.
                        </span>
                      )}
                      <span style={{ padding: '3px 8px', background: item.type === 'edinovertsy' ? '#d1fae5' : '#dbeafe', borderRadius: '10px', fontSize: '11px', color: item.type === 'edinovertsy' ? '#065f46' : '#1e40af', fontWeight: '500' }}>
                        {item.type === 'edinovertsy' ? '✝️ Единоверческий' : '⛪ Православный'}
                      </span>
                    </>
                  ) : (
                    <>
                      {item.district && (
                        <span style={{ padding: '3px 8px', background: '#f3f4f6', borderRadius: '10px', fontSize: '11px', color: '#374151', fontWeight: '500' }}>
                          📍 {item.district}
                        </span>
                      )}
                      {isDead && (
                        <span style={{ padding: '3px 8px', background: '#fee2e2', borderRadius: '10px', fontSize: '11px', color: '#991b1b', fontWeight: '500' }}>
                          ⚠️ Исчезла
                        </span>
                      )}
                      {item.historical_names && item.historical_names.length > 0 && (
                        <span style={{ padding: '3px 8px', background: '#fef3c7', borderRadius: '10px', fontSize: '11px', color: '#92400e', fontWeight: '500' }}>
                          🏷️ {item.historical_names[0]}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {item.description && (
                  <p style={{
                    color: '#6b7280',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    margin: '0 0 10px 0',
                    padding: '10px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    borderLeft: isDead ? '3px solid #9ca3af' : '3px solid #3b82f6'
                  }}>
                    {item.description}
                  </p>
                )}

                {activeTab === 'churches' && item.docs && item.docs.length > 0 && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                      📄 Документы ({item.docs.length})
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '120px', overflowY: 'auto' }}>
                      {item.docs.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          style={{ display: 'block', padding: '6px 8px', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', textDecoration: 'none', fontSize: '12px', color: '#111827', lineHeight: '1.3', transition: 'all 0.15s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.background = '#eff6ff'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#ffffff'; }}
                        >
                          {doc.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href={item.doc_url}
                  style={{ display: 'block', width: '100%', textAlign: 'center', padding: '10px 16px', background: '#3b82f6', color: '#ffffff', textDecoration: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '500', boxSizing: 'border-box', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                >
                  {activeTab === 'churches' ? 'Открыть страницу прихода →' : 'Открыть страницу деревни →'}
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

// ===== ГЛАВНЫЙ КОМПОНЕНТ =====
export default function InteractiveMap({ height = '600px', showHeader = true, layout = 'vertical' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('settlements');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [enabledGroups, setEnabledGroups] = useState({});
  const mapContainerRef = useRef(null);

  const { data, loading, error } = useSettlementsData();

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      if (mapContainerRef.current?.requestFullscreen) {
        mapContainerRef.current.requestFullscreen();
      } else if (mapContainerRef.current?.webkitRequestFullscreen) {
        mapContainerRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const handleToggleGroup = (groupId) => {
    setEnabledGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (layout === 'horizontal') {
      const wrappers = document.querySelectorAll('[class*="mainWrapper_"]');
      const originalDisplays = [];
      wrappers.forEach(el => {
        originalDisplays.push(el.style.display);
        el.style.display = 'inherit';
      });
      return () => {
        wrappers.forEach((el, i) => {
          el.style.display = originalDisplays[i];
        });
      };
    }
  }, [layout]);

  const allData = data
    ? (activeTab === 'settlements' ? normalizeData(data.settlements) : normalizeData(data.churches))
    : [];

  const districts = [...new Set(allData.map(item => item.district).filter(Boolean))].sort();

  const filteredResults = allData.filter(item => {
    if (selectedDistrict && item.district !== selectedDistrict) {
      return false;
    }

    if (searchTerm.length < 3) {
      return false;
    }

    const term = searchTerm.toLowerCase();

    const nameMatch = item.name?.toLowerCase().includes(term);
    const kazakhMatch = item.kazakh_name?.toLowerCase().includes(term);
    const historicalMatch = Array.isArray(item.historical_names)
      ? item.historical_names.some(n => n.toLowerCase().includes(term))
      : false;

    return nameMatch || kazakhMatch || historicalMatch;
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    setSelectedDistrict('');
    setSelectedItemId(null);
  };

  if (loading) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #e2e8f0', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
          <span style={{ color: '#6b7280', fontSize: '14px' }}>Загрузка данных карты...</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca' }}>
        <div style={{ textAlign: 'center', color: '#991b1b' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>️</div>
          <div>Ошибка загрузки данных: {error}</div>
        </div>
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <div ref={mapContainerRef} className={`maps-page-wrapper ${isFullscreen ? 'maps-fullscreen' : ''}`}>
        <div className="maps-sidebar">
          <div className="maps-tabs">
            <button className={`maps-tab ${activeTab === 'settlements' ? 'active' : ''}`} onClick={() => handleTabChange('settlements')}>
              Населённые пункты
            </button>
            <button className={`maps-tab ${activeTab === 'churches' ? 'active' : ''}`} onClick={() => handleTabChange('churches')}>
              Приходы
            </button>
          </div>

          <div className="maps-search">
            <div className="maps-search-input-row">
              <input
                type="text"
                placeholder={searchTerm.length < 3 ? 'Минимум 3 буквы...' : 'Поиск...'}
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setSelectedItemId(null); }}
                className="maps-input"
              />
              {searchTerm && (
                <button onClick={() => { setSearchTerm(''); setSelectedItemId(null); }} className="maps-clear-btn">×</button>
              )}
            </div>
            <select
              className="maps-select"
              value={selectedDistrict}
              onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedItemId(null); }}
            >
              <option value="">Все районы</option>
              {districts.map(district => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div className="maps-results">
            {selectedDistrict && searchTerm.length < 3 ? (
              <div className="maps-empty">
                Показано {filteredResults.length} {activeTab === 'settlements' ? 'насел. пунктов' : 'приходов'} в районе «{selectedDistrict}»
              </div>
            ) : searchTerm.length < 3 ? (
              <div className="maps-empty">Введите минимум 3 буквы для поиска</div>
            ) : filteredResults.length === 0 ? (
              <div className="maps-empty">Ничего не найдено</div>
            ) : (
              filteredResults.map(item => {
                const isDead = item.status === 'не существует';
                return (
                  <div
                    key={item.id}
                    className="maps-result-item"
                    onClick={() => setSelectedItemId(item.id)}
                    style={{
                      background: selectedItemId === item.id ? '#eff6ff' : 'transparent',
                      opacity: isDead ? 0.85 : 1
                    }}
                  >
                    <div className="maps-result-name" style={{ color: isDead ? '#6b7280' : '#111827' }}>
                      {item.name}
                      {isDead && (
                        <span style={{
                          fontSize: '11px',
                          color: '#991b1b',
                          marginLeft: '6px',
                          fontWeight: '400'
                        }}>
                          (исчезла)
                        </span>
                      )}
                    </div>
                    <div className="maps-result-desc">
                      {item.district}
                      {Array.isArray(item.historical_names) && item.historical_names.length > 0
                        ? ` • ${item.historical_names[0]}`
                        : ''}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedItemId(item.id); }}
                        style={{ padding: '6px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'background 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                      >
                        Показать на карте
                      </button>
                      <a
                        href={item.doc_url}
                        onClick={(e) => e.stopPropagation()}
                        style={{ padding: '6px 12px', background: '#ffffff', color: '#3b82f6', border: '1px solid #3b82f6', borderRadius: '6px', fontSize: '13px', fontWeight: '500', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-block' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#eff6ff'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                      >
                        {activeTab === 'churches' ? 'Открыть приход →' : 'Открыть деревню →'}
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="maps-map-container">
          <BrowserOnly fallback={
            <div style={{ height: '100%', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '16px', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', border: '4px solid #e2e8f0', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <span>Загрузка карты...</span>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          }>
            {() => (
              <MapContent
                filterText={searchTerm}
                activeTab={activeTab}
                selectedId={selectedItemId}
                selectedDistrict={selectedDistrict}
                enabledGroups={enabledGroups}
                data={data}
              />
            )}
          </BrowserOnly>

          <button onClick={toggleFullscreen} className="maps-fullscreen-btn">
            {isFullscreen ? '⊡ Свернуть' : '⊞ На весь экран'}
          </button>

          <div className="map-layers-overlay">
            <LayersControl
              enabledGroups={enabledGroups}
              onToggle={handleToggleGroup}
              peasantData={data?.peasantSettlements}
            />
          </div>
        </div>

        <style>{`
  .maps-page-wrapper { 
    display: grid !important; 
    grid-template-columns: 380px 1fr !important; 
    grid-template-rows: 600px !important; 
    width: 100% !important; 
    height: 600px !important; 
    border-radius: 16px !important; 
    overflow: hidden !important; 
    box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important; 
    border: 1px solid #e5e7eb !important; 
    background: #ffffff !important; 
    position: relative !important;
  }
  .maps-fullscreen { 
    position: fixed !important; 
    top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; 
    width: 100vw !important; height: 100vh !important; 
    z-index: 9999 !important; 
    grid-template-rows: 100vh !important; 
    border-radius: 0 !important; 
  }
  .maps-sidebar { 
    display: flex !important; 
    flex-direction: column !important; 
    background: #ffffff !important; 
    border-right: 1px solid #e5e7eb !important; 
    overflow: hidden !important; 
    height: 100% !important; 
    min-height: 600px !important;
  }
  .maps-tabs { 
    display: flex !important; 
    border-bottom: 1px solid #e5e7eb !important; 
    background: #f9fafb !important; 
    flex-shrink: 0 !important;
  }
  .maps-tab { 
    flex: 1 !important; 
    padding: 16px !important; 
    border: none !important; 
    background: transparent !important; 
    border-bottom: 3px solid transparent !important;
    cursor: pointer !important; 
    font-weight: 400 !important;
    font-size: 14px !important; 
    color: #6b7280 !important; 
    transition: all 0.2s !important; 
    font-family: inherit !important;
  }
  .maps-tab.active { 
    background: #ffffff !important; 
    border-bottom-color: #3b82f6 !important; 
    font-weight: 600 !important; 
    color: #111827 !important; 
  }
  .maps-tab:nth-child(2).active { border-bottom-color: #10b981 !important; }
  .maps-search { 
    padding: 16px !important; 
    border-bottom: 1px solid #e5e7eb !important; 
    flex-shrink: 0 !important;
  }
  .maps-search-input-row { 
    display: flex !important; 
    gap: 8px !important; 
    margin-bottom: 12px !important; 
  }
  .maps-input { 
    flex: 1 !important; 
    padding: 10px 12px !important; 
    font-size: 14px !important; 
    border-radius: 8px !important; 
    border: 1px solid #d1d5db !important; 
    outline: none !important; 
    transition: border-color 0.2s !important; 
    font-family: inherit !important;
  }
  .maps-input:focus { border-color: #3b82f6 !important; }
  .maps-clear-btn { 
    width: 40px !important; height: 40px !important; 
    min-width: 40px !important; padding: 0 !important; 
    border: 1px solid #d1d5db !important; 
    background: #ffffff !important; 
    cursor: pointer !important; 
    border-radius: 8px !important; 
    font-size: 18px !important; 
    line-height: 1 !important; 
    color: #6b7280 !important; 
    transition: all 0.2s !important; 
    font-family: inherit !important; 
    display: flex !important; 
    align-items: center !important; 
    justify-content: center !important; 
    flex-shrink: 0 !important;
  }
  .maps-clear-btn:hover { background: #f3f4f6 !important; color: #374151 !important; }
  .maps-select { 
    width: 100% !important; 
    padding: 10px 12px !important; 
    font-size: 14px !important; 
    border-radius: 8px !important; 
    border: 1px solid #d1d5db !important; 
    background: #ffffff !important; 
    cursor: pointer !important; 
    outline: none !important; 
    font-family: inherit !important;
  }
  .maps-results { 
    flex: 1 !important; 
    overflow-y: auto !important; 
    background: #ffffff !important; 
  }
  .maps-empty { 
    color: #9ca3af !important; 
    text-align: center !important; 
    padding: 40px 20px !important; 
    font-size: 14px !important; 
  }
  .maps-result-item { 
    padding: 16px !important; 
    border-bottom: 1px solid #f3f4f6 !important; 
    cursor: pointer !important; 
    transition: background 0.15s !important; 
  }
  .maps-result-item:hover { background: #f9fafb !important; }
  .maps-result-name { 
    font-size: 15px !important; 
    margin-bottom: 4px !important; 
    font-weight: 500 !important; 
  }
  .maps-result-desc { 
    font-size: 13px !important; 
    color: #6b7280 !important; 
    margin-bottom: 8px !important; 
    line-height: 1.4 !important; 
  }
  .maps-map-container { 
    position: relative !important; 
    background: #f3f4f6 !important; 
    height: 100% !important; 
    min-height: 600px !important; 
    overflow: hidden !important; 
  }
  .map-leaflet-container { 
    height: 100% !important; 
    width: 100% !important; 
    min-height: 600px !important; 
    z-index: 1 !important; 
  }
  .maps-fullscreen-btn { 
    position: absolute !important; 
    top: 16px !important; right: 16px !important; 
    padding: 10px 16px !important; 
    background: #ffffff !important; 
    border: 1px solid #e5e7eb !important; 
    border-radius: 8px !important; 
    cursor: pointer !important; 
    z-index: 1000 !important; 
    font-size: 14px !important; 
    font-weight: 500 !important; 
    color: #374151 !important; 
    box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important; 
    transition: all 0.2s !important; 
    font-family: inherit !important;
  }
  .maps-fullscreen-btn:hover { background: #f9fafb !important; }
  .layers-control-panel {
    background: #f9fafb !important;
    border-radius: 8px !important;
    padding: 12px !important;
    border: 1px solid #e5e7eb !important;
  }
  .layers-control-header {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    color: #374151 !important;
    margin-bottom: 10px !important;
  }
  .layers-control-icon { font-size: 16px !important; }
  .layers-control-list {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
  }
  .layer-toggle {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    cursor: pointer !important;
    font-size: 12px !important;
    color: #4b5563 !important;
    transition: all 0.2s !important;
  }
  .layer-toggle:hover { color: #111827 !important; }
  .layer-toggle input[type="checkbox"] {
    width: 14px !important; height: 14px !important;
    cursor: pointer !important;
    accent-color: #3b82f6 !important;
  }
  .layer-color-indicator {
    width: 12px !important; height: 12px !important;
    border-radius: 3px !important;
    flex-shrink: 0 !important;
  }
  .layer-name { flex: 1 !important; line-height: 1.3 !important; }
  .custom-map-marker { background: transparent !important; border: none !important; }
  .custom-map-marker .leaflet-marker-shadow { display: none !important; }
  .peasant-settlement-layer { transition: all 0.3s; }
  .leaflet-popup-content-wrapper { 
    border-radius: 16px !important; 
    box-shadow: 0 10px 40px rgba(0,0,0,0.15) !important; 
    border: none !important; 
    padding: 0 !important; 
    overflow: visible !important; 
    position: relative !important; 
  }
  .leaflet-popup-content { margin: 0 !important; }
  .leaflet-popup-tip-container { display: none !important; }
  .leaflet-popup-close-button { 
    position: absolute !important; 
    top: 8px !important; right: 8px !important; 
    width: 28px !important; height: 28px !important; 
    padding: 0 !important; margin: 0 !important; 
    font-size: 20px !important; 
    font-weight: 300 !important; 
    line-height: 28px !important; 
    text-align: center !important; 
    color: #9ca3af !important; 
    background: #ffffff !important; 
    border-radius: 50% !important; 
    z-index: 1001 !important; 
    transition: all 0.2s !important; 
    display: flex !important; 
    align-items: center !important; 
    justify-content: center !important; 
  }
  .leaflet-popup-close-button:hover { 
    color: #374151 !important; 
    background: #f3f4f6 !important; 
  }
  .leaflet-control-zoom { 
    border: none !important; 
    box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important; 
    border-radius: 8px !important; 
    overflow: hidden; 
    background: #ffffff !important; 
  }
  .leaflet-control-zoom a { 
    border: none !important; 
    border-bottom: 1px solid #e5e7eb !important; 
    color: #374151 !important; 
    background: #ffffff !important; 
    width: 36px !important; height: 36px !important; 
    line-height: 36px !important; 
    font-size: 18px !important; 
    font-weight: 600 !important; 
    display: flex !important; 
    align-items: center !important; 
    justify-content: center !important; 
    transition: all 0.2s !important; 
  }
  .leaflet-control-zoom a:hover { 
    background: #f3f4f6 !important; 
    color: #111827 !important; 
  }
  .leaflet-control-zoom a:last-child { border-bottom: none !important; }
  
  /* Иртышская казачья линия — анимация */
  .irtish-line {
    stroke-dasharray: 10, 10;
    animation: irtish-dash 30s linear infinite;
  }
  
  @keyframes irtish-dash {
    to {
      stroke-dashoffset: -1000;
    }
  }
  
  /* Панель слоёв поверх карты */
  .map-layers-overlay {
    position: absolute !important;
    bottom: 20px !important;
    left: 20px !important;
    z-index: 1000 !important;
    background: #ffffff !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
    border: 1px solid #e5e7eb !important;
    max-height: 250px !important;
    overflow-y: auto !important;
  }
  
  .map-layers-overlay .layers-control-panel {
    background: transparent !important;
    border: none !important;
    padding: 10px !important;
    margin: 0 !important;
  }
  
  .map-layers-overlay .layers-control-header {
    font-size: 12px !important;
    margin-bottom: 6px !important;
  }
  
  .map-layers-overlay .layer-toggle {
    font-size: 11px !important;
    margin-bottom: 4px !important;
  }
  
  @media (max-width: 768px) { 
    .maps-page-wrapper { 
      grid-template-columns: 1fr !important; 
      grid-template-rows: auto 400px !important; 
      height: auto !important; 
      min-height: auto !important; 
    } 
    .maps-sidebar { max-height: 400px !important; min-height: auto !important; } 
    .maps-map-container { height: 400px !important; min-height: 400px !important; } 
    .leaflet-popup-content-wrapper { max-width: calc(100vw - 40px) !important; }
    .leaflet-control-zoom a {
      width: 40px !important; height: 40px !important;
      line-height: 40px !important; font-size: 20px !important;
    }
    .map-layers-overlay {
      bottom: 10px !important;
      left: 10px !important;
      max-height: 180px !important;
    }
    .map-layers-overlay .layer-toggle {
      font-size: 10px !important;
    }
  }
`}</style>
      </div>
    );
  }

  return (
    <div ref={mapContainerRef} className="modern-map-vertical" style={{ position: 'relative', padding: isFullscreen ? '20px' : '0', background: isFullscreen ? '#ffffff' : 'transparent' }}>
      {showHeader && (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '28px', fontWeight: '600' }}>Карта населенных пунктов ВКО</h2>
          <p style={{ textAlign: 'center', marginBottom: '30px', color: '#6b7280', fontSize: '16px' }}>Найдите свою деревню на карте и узнайте историю её заселения</p>
        </>
      )}

      <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '2px solid #e5e7eb' }}>
        <button onClick={() => handleTabChange('settlements')} style={{ padding: '12px 24px', border: 'none', background: activeTab === 'settlements' ? '#ffffff' : 'transparent', borderBottom: activeTab === 'settlements' ? '3px solid #3b82f6' : 'none', cursor: 'pointer', fontWeight: activeTab === 'settlements' ? '600' : '400', fontSize: '15px', color: activeTab === 'settlements' ? '#111827' : '#6b7280', transition: 'all 0.2s', marginBottom: '-2px' }}>
          Населённые пункты
        </button>
        <button onClick={() => handleTabChange('churches')} style={{ padding: '12px 24px', border: 'none', background: activeTab === 'churches' ? '#ffffff' : 'transparent', borderBottom: activeTab === 'churches' ? '3px solid #10b981' : 'none', cursor: 'pointer', fontWeight: activeTab === 'churches' ? '600' : '400', fontSize: '15px', color: activeTab === 'churches' ? '#111827' : '#6b7280', transition: 'all 0.2s', marginBottom: '-2px' }}>
          Приходы
        </button>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'stretch' }}>
        <input
          type="text"
          placeholder={searchTerm.length < 3 ? 'Минимум 3 буквы для поиска...' : 'Поиск...'}
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setSelectedItemId(null); }}
          style={{ flex: '1 1 300px', minWidth: '200px', padding: '12px 16px', fontSize: '15px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s' }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
        <select
          value={selectedDistrict}
          onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedItemId(null); }}
          style={{ flex: '0 0 220px', padding: '12px 16px', fontSize: '15px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#ffffff', cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }}
        >
          <option value="">Все районы</option>
          {districts.map(district => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        {searchTerm && (
          <button onClick={() => { setSearchTerm(''); setSelectedItemId(null); }} style={{ padding: '12px 20px', fontSize: '15px', borderRadius: '8px', border: '1px solid #d1d5db', background: '#ffffff', cursor: 'pointer', color: '#6b7280', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.background = '#f3f4f6'} onMouseLeave={(e) => e.target.style.background = '#ffffff'}>
            Сбросить
          </button>
        )}
        <button onClick={toggleFullscreen} style={{ padding: '12px 20px', fontSize: '15px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#ffffff', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: '500', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)' }} onMouseEnter={(e) => e.target.style.background = '#2563eb'} onMouseLeave={(e) => e.target.style.background = '#3b82f6'}>
          {isFullscreen ? '⊡ Свернуть' : '⊞ На весь экран'}
        </button>
      </div>

      <div style={{ marginBottom: '20px', padding: '12px 16px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe', fontSize: '14px', color: '#1e40af', fontWeight: '500' }}>
        {selectedDistrict
          ? `Район: ${selectedDistrict} • ${filteredResults.length} ${activeTab === 'settlements' ? 'насел. пунктов' : 'приходов'}`
          : `Всего на карте: ${allData.length} ${activeTab === 'settlements' ? 'населенных пунктов' : 'приходов'}`}
      </div>

      <div style={{ height, borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', position: 'relative' }}>
        <BrowserOnly fallback={
          <div style={{ height: '100%', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '16px', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', border: '4px solid #e2e8f0', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <span>Загрузка карты...</span>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        }>
          {() => (
            <MapContent
              filterText={searchTerm}
              activeTab={activeTab}
              selectedId={selectedItemId}
              selectedDistrict={selectedDistrict}
              enabledGroups={enabledGroups}
              data={data}
            />
          )}
        </BrowserOnly>

        <div className="map-layers-overlay">
          <LayersControl
            enabledGroups={enabledGroups}
            onToggle={handleToggleGroup}
            peasantData={data?.peasantSettlements}
          />
        </div>
      </div>

      {(searchTerm.length >= 3 || selectedDistrict) && filteredResults.length > 0 && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#f9fafb', borderRadius: '12px', maxHeight: '300px', overflowY: 'auto', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
            {selectedDistrict && searchTerm.length < 3
              ? `Все в районе «${selectedDistrict}»: ${filteredResults.length}`
              : `Найдено: ${filteredResults.length}`}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filteredResults.map(item => {
              const isDead = item.status === 'не существует';
              return (
                <li key={item.id} style={{
                  padding: '12px 0',
                  borderBottom: '1px solid #e5e7eb',
                  background: selectedItemId === item.id ? '#eff6ff' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  opacity: isDead ? 0.85 : 1
                }} onClick={() => setSelectedItemId(item.id)} onMouseEnter={(e) => { if (selectedItemId !== item.id) e.currentTarget.style.background = '#f9fafb'; }} onMouseLeave={(e) => { if (selectedItemId !== item.id) e.currentTarget.style.background = 'transparent'; }}>
                  <strong style={{ fontSize: '15px', color: isDead ? '#6b7280' : '#111827' }}>
                    {item.name}
                    {isDead && (
                      <span style={{ fontSize: '11px', color: '#991b1b', marginLeft: '6px', fontWeight: '400' }}>
                        (исчезла)
                      </span>
                    )}
                  </strong>
                  <span style={{ color: '#6b7280', fontSize: '14px' }}> — {item.district}</span>
                  <br />
                  <small style={{ color: '#9ca3af', fontSize: '13px' }}>
                    {Array.isArray(item.historical_names) && item.historical_names.length > 0
                      ? item.historical_names.join(', ')
                      : (item.full_name || '')}
                  </small>
                  <br />
                  <a href={item.doc_url} style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }} onClick={(e) => e.stopPropagation()}>Перейти к документам →</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <style>{`
  .map-layers-overlay {
    position: absolute !important;
    bottom: 20px !important;
    left: 20px !important;
    z-index: 1000 !important;
    background: #ffffff !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
    border: 1px solid #e5e7eb !important;
    max-height: 250px !important;
    overflow-y: auto !important;
  }
  
  .map-layers-overlay .layers-control-panel {
    background: transparent !important;
    border: none !important;
    padding: 10px !important;
    margin: 0 !important;
  }
  
  .map-layers-overlay .layers-control-header {
    font-size: 12px !important;
    margin-bottom: 6px !important;
  }
  
  .map-layers-overlay .layer-toggle {
    font-size: 11px !important;
    margin-bottom: 4px !important;
  }
  
  /* Анимация красных флажков алтайских каменщиков */
  .bukhtarmin-flag {
    animation: flag-sway 2s ease-in-out infinite;
    transform-origin: 5px 22px;
  }

  @keyframes flag-sway {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-6deg); }
    75% { transform: rotate(6deg); }
  }
  
  /* Иртышская казачья линия — анимация */
  .irtish-line {
    stroke-dasharray: 10, 10;
    animation: irtish-dash 30s linear infinite;
  }
  
  @keyframes irtish-dash {
    to {
      stroke-dashoffset: -1000;
    }
  }
  
  @media (max-width: 768px) {
    .map-layers-overlay {
      bottom: 10px !important;
      left: 10px !important;
      max-height: 180px !important;
    }
    .map-layers-overlay .layer-toggle {
      font-size: 10px !important;
    }
  }
`}</style>
    </div>
  );
}