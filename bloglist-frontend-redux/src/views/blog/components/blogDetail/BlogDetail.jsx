import { useState } from 'react';
import Text from '../../../../components/Text';
import { likeBlog, deleteBlog } from '../../../../services/blogService';

const BlogDetail = ({ blog, refetchBlogs, handleNotification, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If blog is null, don't render anything
  if (!blog) {
    return null;
  }

  const handleLike = async () => {
    try {
      await likeBlog({ token: user.token, id: blog.id });
      await refetchBlogs();
    } catch (error) {
      console.log('error', error);
      handleNotification({ message: error.response.data.error, type: 'error' });
    }
  };

  const handleRemove = async () => {
    try {
      const verifyRemove = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}?`
      );
      if (!verifyRemove) {
        return;
      }
      await deleteBlog({ token: user.token, id: blog.id });
      handleNotification({
        message: 'Blog deleted successfully',
        type: 'success',
      });
      await refetchBlogs();
    } catch (error) {
      console.log('error', error);
      handleNotification({ message: error.response.data.error, type: 'error' });
    }
  };

  const deleteButtonVisible = user && blog.user && user.id === blog.user.id;

  return (
    <div
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
      }}
    >
      <div style={{ display: 'flex' }}>
        <Text
          as='p'
          style={{ margin: '0' }}
          text={`${blog.title} ${blog.author}`}
        />
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'hide' : 'view'}
        </button>
      </div>
      {isExpanded && (
        <div>
          <a href={blog.url} target='_blank' rel='noopener noreferrer'>
            {blog.url}
          </a>
          <div style={{ display: 'flex' }}>
            <Text as='p' style={{ margin: '0' }} text={blog.likes} />
            <button onClick={() => handleLike()}>like</button>
          </div>
          <Text as='p' style={{ margin: '0' }} text={blog.user.name} />
          {deleteButtonVisible && (
            <button onClick={() => handleRemove()}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
