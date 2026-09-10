import React from 'react';
import Link from '@docusaurus/Link';
import { useBlogPosts } from '@docusaurus/plugin-content-blog/client';

const RecentBlogPosts = () => {
  const { posts } = useBlogPosts(); // Получаем все посты блога

  // Сортируем посты по дате (новые первыми)
  const sortedPosts = posts.sort((a, b) =>
    new Date(b.metadata.date) - new Date(a.metadata.date)
  ).slice(0, 8); // Оставляем последние 5 постов

  return (
    <div className="recent-blog-posts">
      <h2>Последние новости  блога</h2>
      <ul>
        {sortedPosts.map((post) => (
          <li key={post.metadata.permalink}>
            <Link to={post.metadata.permalink}>
              <h3>{post.metadata.title}</h3>
              <p>{post.metadata.date.toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentBlogPosts;