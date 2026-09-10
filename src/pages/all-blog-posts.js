import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

// Импортируем JSON-файл с данными блога
import recentPosts from '../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json';

export default function AllBlogPosts() {
  // Состояние для текущей страницы
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Количество постов на странице

  // Вычисляем посты для текущей страницы
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = recentPosts.items.slice(indexOfFirstPost, indexOfLastPost);

  // Функция для перехода на следующую или предыдущую страницу
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="container blog-container">
        {/* Контейнер для выравнивания карточек и пагинации */}
        <div className="blog-section">
          <h1 className="blog-title">Все новости из блога</h1>
          {recentPosts.items.length > 0 ? (
            <>
              <div className="blog-grid">
                {currentPosts.map((post, index) => (
                  <div key={index} className="blog-card">
                    <Link to={post.permalink} className="blog-link">
                      {/* Дата вверху */}
                      <p className="blog-card-date">
                        {new Date(post.date).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      {/* Заголовок */}
                      <h3 className="blog-card-title">{post.title}</h3>
                      {/* Кнопка "Читать далее" */}
                      <span className="blog-read-more">Читать далее →</span>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Пагинация */}
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  Назад
                </button>
                <span className="pagination-info">
                  Страница {currentPage} из {Math.ceil(recentPosts.items.length / postsPerPage)}
                </span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastPost >= recentPosts.items.length}
                  className="pagination-button"
                >
                  Вперёд
                </button>
              </div>
            </>
          ) : (
            <p className="blog-empty">Нет новостей в блоге.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}