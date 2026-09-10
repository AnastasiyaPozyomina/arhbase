import React from 'react';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogPostItems from '@theme/BlogPostItems';
import Skeleton from '@mui/material/Skeleton';


export default function BlogListPage({ items, metadata }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return loading ? (
    <Skeleton variant="rectangular" height={200} />
  ) : (
    <div>
    <h1>Все новости из блога</h1>
    <BlogPostItems items={items} />
    <BlogListPaginator metadata={metadata} />
  </div>
  );
};
