import { useEffect, useRef } from 'react';
import BlogCreate from './components/blogCreate/BlogCreate';
import Blogs from './components/Blogs';
import Togglable from '../../components/Togglable';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { setTitle } from '../../slices/uiSlice';
import { fetchBlogs } from '../../slices/blogSlice';

const BlogView = () => {
  const dispatch = useDispatch();

  const blogCreateRef = useRef();
  const blogListRef = useRef();

  const { token } = useSelector(selectUser);

  useEffect(() => {
    dispatch(setTitle('blogs'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBlogs(token));
  }, [dispatch, token]);

  useEffect(() => {
    blogCreateRef.current.handleVisibility(false);
    blogListRef.current.handleVisibility(true);
  }, []);

  return (
    <div>
      <Togglable
        ref={blogCreateRef}
        otherRefOfTogglable={blogListRef}
        labelWhenVisible="cancel"
        labelWhenHidden="new blog"
      >
        <BlogCreate />
      </Togglable>
      <Togglable ref={blogListRef} hasButton={false}>
        <Blogs />
      </Togglable>
    </div>
  );
};

export default BlogView;
