import { useState } from 'react';
import Text from '../../../../components/Text';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, deleteBlog } from '../../../../slices/blogSlice';
import { selectUser } from '../../../../slices/userSlice';

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const user = useSelector(selectUser);
  const { token } = user;
  // If blog is null, don't render anything
  if (!blog) {
    return null;
  }

  const handleLike = () => {
    dispatch(likeBlog(blog, token));
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(blog, token));
    }
  };

  const deleteButtonVisible = user && blog.user && user.id === blog.user.id;

  return (
    <div
      style={{ paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }}
    >
      <div style={{ display: 'flex' }}>
        <Text as="p" style={{ margin: '0' }} text={`${blog.title} ${blog.author}`} />
        <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'hide' : 'view'}</button>
      </div>
      {isExpanded && (
        <div>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
          <div style={{ display: 'flex' }}>
            <Text as="p" style={{ margin: '0' }} text={blog.likes} />
            <button onClick={() => handleLike()}>like</button>
          </div>
          <Text as="p" style={{ margin: '0' }} text={blog.user.name} />
          {deleteButtonVisible && <button onClick={() => handleRemove()}>delete</button>}
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
