// src/components/ImageWithLightbox.jsx
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  FaSearchPlus,
  FaSearchMinus,
  FaUndo,
  FaExpand,
  FaCompress
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

export default function ImageWithLightbox({ src, alt = "Карта", caption = "", ...props }) {
  if (!src) {
    console.warn("ImageWithLightbox: prop 'src' is required");
    return null;
  }

  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef(null); // 👈 Создаем ref для контейнера

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  }, [src]);

  const calculateMinScale = (containerWidth, containerHeight, imgWidth, imgHeight) => {
    if (!imgWidth || !imgHeight) return 0.1;
    const scaleWidth = containerWidth / imgWidth;
    const scaleHeight = containerHeight / imgHeight;
    return Math.min(scaleWidth, scaleHeight, 1);
  };

  // Функция для переключения полноэкранного режима
  const toggleFullScreen = () => {
    // 👇 ИСПРАВЛЕНИЕ: Используем containerRef, а не transformWrapperRef
    if (!containerRef.current) {
      console.error("Контейнер для полноэкранного режима не найден.");
      return;
    }

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        alert(`Ошибка при попытке включить полноэкранный режим: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch(err => {
        alert(`Ошибка при попытке выйти из полноэкранного режима: ${err.message}`);
      });
    }
  };

  // Слушатель для отслеживания изменений полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // 👇 ФУНКЦИЯ ДЛЯ БЛОКИРОВКИ СКРОЛЛА СТРАНИЦЫ
  const blockBodyScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  // 👇 ФУНКЦИЯ ДЛЯ РАЗБЛОКИРОВКИ СКРОЛЛА СТРАНИЦЫ
  const unblockBodyScroll = () => {
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  };

  return (
    <div style={{ margin: '24px auto', maxWidth: '100%', textAlign: 'center', position: 'relative' }}>
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.1}
        maxScale={5}
        wheel={{ step: 0.2 }}
        panning={{
          activationKeys: [], // Панорамирование всегда активно
        }}
        // 👇 БЛОКИРУЕМ СКРОЛЛ СТРАНИЦЫ ПРИ ВЗАИМОДЕЙСТВИИ С КАРТОЙ
        onPanningStart={blockBodyScroll}
        onPanningStop={unblockBodyScroll}
        onZoomStart={blockBodyScroll}
        onZoomStop={unblockBodyScroll}
        onZoom={(ref) => {
          if (ref.state.initialized) {
            const container = ref.wrapperComponentRef.current;
            if (container) {
              const minScale = calculateMinScale(
                container.clientWidth,
                container.clientHeight,
                imageDimensions.width,
                imageDimensions.height
              );
              ref.setMinScale(minScale);
              // 👇 ЦЕНТРИРУЕМ КАРТУ
              const newPos = {
                x: (container.clientWidth - imageDimensions.width * minScale) / 2,
                y: (container.clientHeight - imageDimensions.height * minScale) / 2,
              };
              ref.setTransform(newPos.x, newPos.y, minScale);
            }
          }
        }}
      >
        {({ zoomIn, zoomOut, resetTransform, instance, ...rest }) => (
          <>
            {/* Панель управления */}
            <div style={controlPanelStyle}>
              <button onClick={() => zoomIn()} style={controlButtonStyle} title="Увеличить">
                <FaSearchPlus size={18} />
              </button>
              <button onClick={() => zoomOut()} style={controlButtonStyle} title="Уменьшить">
                <FaSearchMinus size={18} />
              </button>
              <button onClick={() => resetTransform()} style={controlButtonStyle} title="Сбросить">
                <FaUndo size={18} />
              </button>
              <button onClick={toggleFullScreen} style={controlButtonStyle} title={isFullScreen ? "Выйти из полноэкранного режима" : "Полный экран"}>
                {isFullScreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
              </button>
            </div>

            {/* 👇 ПРИВЯЗЫВАЕМ ref К КОНТЕЙНЕРУ */}
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                maxWidth: '1000px',
                height: '700px',
                margin: '0 auto',
                overflow: 'hidden',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                cursor: 'grab',
                position: 'relative',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
              }}
              ref={containerRef} // 👈 ПРИВЯЗЫВАЕМ REF ЗДЕСЬ
            >
              <img
                src={src}
                alt={alt}
                style={{
                  display: 'block',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  cursor: 'grab',
                }}
                loading="lazy"
                draggable={false}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      {caption && (
        <p style={captionStyle}>
          {caption}
        </p>
      )}
    </div>
  );
}

const controlPanelStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  display: 'flex',
  gap: '8px',
  zIndex: 10,
};

const controlButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  background: 'rgba(255, 255, 255, 0.8)',
  border: '1px solid rgba(0, 0, 0, 0.2)',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const captionStyle = {
  marginTop: '16px',
  fontSize: '0.875rem',
  color: '#666',
  textAlign: 'center',
};