import React from 'react';
import { useLocation } from '@docusaurus/router';
import ChurchMap from './ChurchMap';
import churchesData from '../data/churches.json';

export default function ChurchPageTemplate() {
  const location = useLocation();
  
  const pathParts = location.pathname.split('/').filter(Boolean);
  const churchId = pathParts[2];
  
  const church = churchesData.find(c => c.id === churchId);
  
  if (!church) {
    return null;
  }

  // Определяем тип страницы
  // /docs/churches/bobrovskoe/ → категория (3 части)
  // /docs/churches/bobrovskoe/vedomost-o-tserkvi → документ (4 части)
  const isCategoryPage = pathParts.length === 3;
  
  // Текущий документ (если мы на странице документа)
  const currentDocSlug = pathParts[3];

  return (
    <div className="church-page-template">
      {/* Карта — показываем всегда */}
      <ChurchMap
        lat={church.lat}
        lng={church.lng}
        name={church.name}
        type={church.type}
        founded={church.founded}
      />

      {/* Информация о приходе */}
      <div style={{ 
        padding: '20px', 
        background: '#f9fafb', 
        borderRadius: '12px', 
        marginBottom: '20px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{church.name}</h3>
        {church.founded && (
          <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>
            📅 Основан: {church.founded} г.
          </p>
        )}
        <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>
          {church.type === 'edinovertsy' ? '✝️ Единоверческий приход' : '⛪ Православный приход'}
        </p>
        {church.description && (
          <p style={{ margin: '0', color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>
            {church.description}
          </p>
        )}
      </div>

      {/* Список документов — показываем только на страницах документов, не на категориях */}
      {!isCategoryPage && church.docs && church.docs.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '12px',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📄 Документы прихода
            <span style={{ 
              fontSize: '12px', 
              background: '#e5e7eb', 
              padding: '2px 8px', 
              borderRadius: '10px',
              color: '#6b7280',
              fontWeight: '500'
            }}>
              {church.docs.length}
            </span>
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '10px' 
          }}>
            {church.docs.map((doc, index) => {
              const isActive = doc.url.includes(currentDocSlug);
              return (
                <a
                  key={index}
                  href={doc.url}
                  style={{
                    display: 'block',
                    padding: '12px 14px',
                    background: isActive ? '#eff6ff' : '#ffffff',
                    border: isActive ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.background = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.background = '#ffffff';
                    }
                  }}
                >
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: isActive ? '600' : '500', 
                    color: isActive ? '#1e40af' : '#111827',
                    marginBottom: '4px' 
                  }}>
                    {isActive && '📖 '}{doc.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {doc.filename}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .church-page-template {
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
}