import React from 'react';
import Link from '@docusaurus/Link';
import { useDocs } from '@docusaurus/plugin-content-docs/client';

const RecentDocuments = () => {
  const docsMetadata = useDocs(); // Получаем метаданные документов
  const allDocs = docsMetadata.flatMap((version) => version.docs);

  // Сортируем документы по дате обновления (новые первыми)
  const sortedDocs = allDocs.sort((a, b) =>
    new Date(b.lastUpdatedAt) - new Date(a.lastUpdatedAt)
  ).slice(0, 5); // Оставляем последние 5 документов

  return (
    <div className="recent-documents">
      <h2>Последние обновления в документации</h2>
      <ul>
        {sortedDocs.map((doc) => (
          <li key={doc.id}>
            <Link to={doc.permalink}>
              <h3>{doc.title}</h3>
              <p>Обновлено: {new Date(doc.lastUpdatedAt).toLocaleDateString()}</p>
              <p>{doc.description || 'Нет описания'}</p>
              console.log('Docs metadata:', docsMetadata);
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentDocuments;