import BlogDetail from './blogDetail/BlogDetail';
import { useSelector } from 'react-redux';
import { selectBlogsSortedByLikes } from '../../../slices/blogSlice';

const Blogs = () => {
  const blogs = useSelector(selectBlogsSortedByLikes);

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found</div>;
  }
  return (
    <div>
      {blogs.map((blog) => (
        <BlogDetail key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
