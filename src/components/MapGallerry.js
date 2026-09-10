import React, { useState } from 'react';
import { SlideshowLightbox } from 'lightbox.js-react';

const MapGallery = () => {
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const imagesPerPage = 3; // Количество изображений на странице

  // Массив изображений (оставляем ваш код без изменений)
  const images = [
    'https://sun9-35.userapi.com/impg/qN_Mk7jxhVVIcSFJEOfzaOpTLfRYALa8u8dtZA/XycTWkQa9qg.jpg?size=1695x2160&quality=95&sign=db1656c1e1035a17c0b7f1469ec44817&type=album',
    'https://sun9-35.userapi.com/impg/qN_Mk7jxhVVIcSFJEOfzaOpTLfRYALa8u8dtZA/XycTWkQa9qg.jpg?size=1695x2160&quality=95&sign=db1656c1e1035a17c0b7f1469ec44817&type=album',
    'https://sun9-35.userapi.com/impg/qN_Mk7jxhVVIcSFJEOfzaOpTLfRYALa8u8dtZA/XycTWkQa9qg.jpg?size=1695x2160&quality=95&sign=db1656c1e1035a17c0b7f1469ec44817&type=album',
    'https://sun9-35.userapi.com/impg/qN_Mk7jxhVVIcSFJEOfzaOpTLfRYALa8u8dtZA/XycTWkQa9qg.jpg?size=1695x2160&quality=95&sign=db1656c1e1035a17c0b7f1469ec44817&type=album',
    'https://sun9-35.userapi.com/impg/qN_Mk7jxhVVIcSFJEOfzaOpTLfRYALa8u8dtZA/XycTWkQa9qg.jpg?size=1695x2160&quality=95&sign=db1656c1e1035a17c0b7f1469ec44817&type=album',
    'https://sun9-35.userapi.com/impg/qN_Mk7jxhVVIcSFJEOfzaOpTLfRYALa8u8dtZA/XycTWkQa9qg.jpg?size=1695x2160&quality=95&sign=db1656c1e1035a17c0b7f1469ec44817&type=album',
  ];

  // Вычисляем индексы изображений для текущей страницы
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Общее количество страниц
  const totalPages = Math.ceil(images.length / imagesPerPage);

  return (
    <section className="map-gallery-container">
      <div className="map-gallery-section">
        <h1 className="map-gallery-title">Исторические карты</h1>

        {/* Сетка миниатюр */}
        <SlideshowLightbox className="container map-gallery-grid" showThumbnails={true}>
          {currentImages.map((src, index) => (
            <img
              key={index}
              className="w-full rounded"
              src={src}
              alt={`Карта ${indexOfFirstImage + index + 1}`}
            />
          ))}
        </SlideshowLightbox>

        {/* Пагинация */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Предыдущая
          </button>
          <span>
            Страница {currentPage} из {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Следующая
          </button>
        </div>
      </div>
    </section>
  );
};

export default MapGallery;