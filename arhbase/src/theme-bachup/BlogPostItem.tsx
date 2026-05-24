import React from 'react';

export default function BlogPostItems({ items }) {
  console.log('BlogPostItems items:', items);

  return (
    <div>
      {items.map((item) => (
        <div key={item.content.metadata.permalink}>
          <h2>{item.content.metadata.title}</h2>
          <p>{item.content.metadata.description}</p>
        </div>
      ))}
    </div>
  );
}