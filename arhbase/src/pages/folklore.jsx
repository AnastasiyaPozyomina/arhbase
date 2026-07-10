import React, { useState, useRef, useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { albums } from '../data/folkloreData';

const styles = `
  .folklore-mode-toggle {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .folklore-mode-btn {
    padding: 0.5rem 1.25rem;
    border: 1px solid var(--ifm-color-emphasis-300);
    background: var(--ifm-background-color);
    color: var(--ifm-font-color-base);
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 500;
  }
  .folklore-mode-btn.active {
    background: var(--ifm-color-primary);
    color: white;
    border-color: var(--ifm-color-primary);
  }
  .folklore-album-card {
    background: var(--ifm-card-background-color);
    border: 1px solid var(--ifm-color-emphasis-200);
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    cursor: pointer;
    transition: box-shadow 0.2s;
  }
  .folklore-album-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .folklore-cover-large {
    width: 80px;
    height: 80px;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, #8B4513, #D2691E);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  .folklore-track {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    background: var(--ifm-card-background-color);
    border: 1px solid var(--ifm-color-emphasis-200);
  }
  .folklore-track:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .folklore-play-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--ifm-color-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
    font-size: 14px;
  }
  .folklore-text-expanded {
    padding: 1.25rem;
    background: var(--ifm-color-emphasis-100);
    border-radius: 0.5rem;
    margin: 0.5rem 0 1.5rem;
    white-space: pre-line;
    font-family: monospace;
    font-size: 0.95rem;
    line-height: 1.6;
  }
  .folklore-hero {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .folklore-hero h1 {
    font-size: 2.25rem;
    margin-bottom: 0.75rem;
  }
  .folklore-hero p {
    font-size: 1.125rem;
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.6;
    color: var(--ifm-color-emphasis-700);
  }
  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--ifm-color-primary);
    font-weight: bold;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }
`;

export default function FolklorePage() {
  const [viewMode, setViewMode] = useState('albums'); // 'albums' | 'all' | 'single'
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [trackDurations, setTrackDurations] = useState({});
  const audioRefs = useRef({});

  useEffect(() => {
    setSearchTerm('');
    setExpandedId(null);
    Object.values(audioRefs.current).forEach(audio => {
      if (audio && !audio.paused) audio.pause();
    });
    setCurrentlyPlaying(null);
    setTrackDurations({});
  }, [viewMode, selectedAlbum]);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity || seconds <= 0) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = (id) => {
    if (currentlyPlaying === id) {
      audioRefs.current[id]?.pause();
      setCurrentlyPlaying(null);
    } else {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio && !audio.paused) audio.pause();
      });
      const audio = audioRefs.current[id];
      if (audio) {
        audio.play().catch(e => console.warn("Автовоспроизведение заблокировано:", e));
        setCurrentlyPlaying(id);
      }
    }
  };

  const toggleGlobalPlayback = () => {
    let tracks = [];
    if (viewMode === 'all') {
      tracks = albums.flatMap(a => a.tracks);
    } else if (viewMode === 'single' && selectedAlbum) {
      tracks = selectedAlbum.tracks;
    }

    if (currentlyPlaying) {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio && !audio.paused) audio.pause();
      });
      setCurrentlyPlaying(null);
    } else {
      const firstTrack = tracks[0];
      if (firstTrack) togglePlay(firstTrack.id);
    }
  };

  // === Режим: Сборники ===
  if (viewMode === 'albums') {
    const filteredAlbums = albums.filter(album =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.year.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Layout title="Фольклор Иртышской линии" description="Свадебные, хороводные, лирические песни и духовные стихи (XVIII–XX вв.)">
        <Head><style>{styles}</style></Head>
        <div className="container padding-vert--lg">
          <div className="folklore-hero">
            <h1>Фольклор Иртышской линии</h1>
            <p>Аудиозаписи народных песен из деревень Выдринской, Глубокой, Урыль и других</p>
          </div>

          <div className="folklore-mode-toggle">
            <button
              className={`folklore-mode-btn ${viewMode === 'albums' ? 'active' : ''}`}
              onClick={() => setViewMode('albums')}
            >
              Сборники
            </button>
            <button
              className={`folklore-mode-btn ${viewMode === 'all' ? 'active' : ''}`}
              onClick={() => setViewMode('all')}
            >
              Все песни
            </button>
          </div>

          {/* Поиск по сборникам — ИСПРАВЛЕНО: лупа по центру */}
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <div
              style={{
                position: 'absolute',
                left: '1rem',
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
                color: 'var(--ifm-color-emphasis-500)'
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Поиск сборника по названию или году..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--ifm-color-emphasis-300)',
                background: 'var(--ifm-background-color)',
                color: 'var(--ifm-font-color-base)',
                fontSize: '1rem'
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredAlbums.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Сборники не найдены.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '800px', margin: '2rem auto 0' }}>
              {filteredAlbums.map(album => (
                <div
                  key={album.id}
                  className="folklore-album-card"
                  onClick={() => {
                    setSelectedAlbum(album);
                    setViewMode('single');
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setSelectedAlbum(album);
                      setViewMode('single');
                    }
                  }}
                >
                  <div className="folklore-cover-large">{album.coverLetter}</div>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{album.title}</h2>
                    <p style={{ color: 'var(--ifm-color-emphasis-600)', margin: '0.25rem 0 0' }}>{album.year}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // === Режим: Все песни ===
  if (viewMode === 'all') {
    const allTracks = albums.flatMap(album =>
      album.tracks.map(track => ({ ...track, albumTitle: album.title }))
    );

    const filteredTracks = allTracks.filter(track =>
      track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.albumTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Layout title="Фольклор: Все песни" description="Полный архив фольклорных записей">
        <Head><style>{styles}</style></Head>
        <div className="container padding-vert--lg">
          <div className="folklore-hero">
            <h1>Все песни</h1>
            <p>Полный список аудиозаписей из всех сборников</p>
          </div>

          <div className="folklore-mode-toggle">
            <button
              className={`folklore-mode-btn ${viewMode === 'albums' ? 'active' : ''}`}
              onClick={() => setViewMode('albums')}
            >
              Сборники
            </button>
            <button
              className={`folklore-mode-btn ${viewMode === 'all' ? 'active' : ''}`}
              onClick={() => setViewMode('all')}
            >
              Все песни
            </button>
          </div>

          {/* Поиск по всем песням — ИСПРАВЛЕНО */}
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <div
              style={{
                position: 'absolute',
                left: '1rem',
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
                color: 'var(--ifm-color-emphasis-500)'
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Поиск по названию, тексту или сборнику..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--ifm-color-emphasis-300)',
                background: 'var(--ifm-background-color)',
                color: 'var(--ifm-font-color-base)',
                fontSize: '1rem'
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button
              onClick={toggleGlobalPlayback}
              disabled={filteredTracks.length === 0}
              style={{
                padding: '0.75rem 2rem',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: currentlyPlaying ? '#dc2626' : '#059669',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: filteredTracks.length === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                margin: '0 auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                opacity: filteredTracks.length === 0 ? 0.6 : 1
              }}
            >
              {currentlyPlaying ? '⏸ Пауза' : '▶ Слушать'}
            </button>
          </div>

          {filteredTracks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}><p>Песни не найдены.</p></div>
          ) : (
            <div>
              {filteredTracks.map((track, index) => (
                <React.Fragment key={track.id}>
                  <div className="folklore-track">
                    <span style={{ width: '28px', textAlign: 'center', fontWeight: 'bold', color: 'var(--ifm-color-emphasis-600)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <button onClick={() => togglePlay(track.id)} className="folklore-play-btn">
                      {currentlyPlaying === track.id ? '⏸' : '▶'}
                    </button>
                    <audio
                      ref={el => audioRefs.current[track.id] = el}
                      src={track.audioUrl}
                      onLoadedMetadata={(e) => {
                        const duration = e.target.duration;
                        if (!isNaN(duration) && duration > 0) {
                          setTrackDurations(prev => ({ ...prev, [track.id]: duration }));
                        }
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0, marginLeft: '1rem' }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{track.title}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-600)', position: 'relative' }}>
                        {track.albumTitle} — {track.description}
                        {trackDurations[track.id] !== undefined && (
                          <span style={{ position: 'absolute', right: 0, top: 0 }}>{formatTime(trackDurations[track.id])}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedId(expandedId === track.id ? null : track.id)}
                      style={{
                        padding: '0.375rem 0.875rem',
                        fontSize: '0.875rem',
                        color: 'var(--ifm-color-primary)',
                        background: 'transparent',
                        border: '1px solid var(--ifm-color-primary)',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {expandedId === track.id ? 'Скрыть' : 'Текст'}
                    </button>
                  </div>
                  {expandedId === track.id && (
                    <div className="folklore-text-expanded">{track.text}</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </Layout>
    );
  }

  // === Режим: Один альбом ===
  const filteredTracks = selectedAlbum.tracks.filter(track =>
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title={`Фольклор: ${selectedAlbum.title}`} description={selectedAlbum.title}>
      <Head><style>{styles}</style></Head>
      <div className="container padding-vert--lg">
        <div
          className="back-button"
          onClick={() => {
            setSelectedAlbum(null);
            setViewMode('albums');
          }}
          role="button"
          tabIndex={0}
        >
          ← Назад к сборникам
        </div>

        <div className="folklore-hero">
          <h1>{selectedAlbum.title}</h1>
          <p>{selectedAlbum.year}</p>
        </div>

        {/* Поиск внутри альбома — ИСПРАВЛЕНО */}
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          <div
            style={{
              position: 'absolute',
              left: '1rem',
              top: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              color: 'var(--ifm-color-emphasis-500)'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Поиск по названию или тексту песни..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--ifm-color-emphasis-300)',
              background: 'var(--ifm-background-color)',
              color: 'var(--ifm-font-color-base)',
              fontSize: '1rem'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            onClick={toggleGlobalPlayback}
            disabled={filteredTracks.length === 0}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: currentlyPlaying ? '#dc2626' : '#059669',
              border: 'none',
              borderRadius: '0.75rem',
              cursor: filteredTracks.length === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              opacity: filteredTracks.length === 0 ? 0.6 : 1
            }}
          >
            {currentlyPlaying ? '⏸ Пауза' : '▶ Слушать'}
          </button>
        </div>

        {filteredTracks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}><p>Песни не найдены.</p></div>
        ) : (
          <div>
            {filteredTracks.map((track, index) => (
              <React.Fragment key={track.id}>
                <div className="folklore-track">
                  <span style={{ width: '28px', textAlign: 'center', fontWeight: 'bold', color: 'var(--ifm-color-emphasis-600)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <button onClick={() => togglePlay(track.id)} className="folklore-play-btn">
                    {currentlyPlaying === track.id ? '⏸' : '▶'}
                  </button>
                  <audio
                    ref={el => audioRefs.current[track.id] = el}
                    src={track.audioUrl}
                    onLoadedMetadata={(e) => {
                      const duration = e.target.duration;
                      if (!isNaN(duration) && duration > 0) {
                        setTrackDurations(prev => ({ ...prev, [track.id]: duration }));
                      }
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0, marginLeft: '1rem' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{track.title}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--ifm-color-emphasis-600)', position: 'relative' }}>
                      {track.description}
                      {trackDurations[track.id] !== undefined && (
                        <span style={{ position: 'absolute', right: 0, top: 0 }}>{formatTime(trackDurations[track.id])}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedId(expandedId === track.id ? null : track.id)}
                    style={{
                      padding: '0.375rem 0.875rem',
                      fontSize: '0.875rem',
                      color: 'var(--ifm-color-primary)',
                      background: 'transparent',
                      border: '1px solid var(--ifm-color-primary)',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {expandedId === track.id ? 'Скрыть' : 'Текст'}
                  </button>
                </div>
                {expandedId === track.id && (
                  <div className="folklore-text-expanded">{track.text}</div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}