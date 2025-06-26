import { createSlice } from '@reduxjs/toolkit';
import {
  getAll,
  deleteBlog as deleteBlogService,
  likeBlog as likeBlogService,
  createBlog as createBlogService,
} from '../services/blogService';
import { setNotification } from './uiSlice';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBlogs } = blogSlice.actions;

export const selectBlogs = (state) => state.blog;
export const selectBlogsSortedByLikes = (state) => {
  return [...state.blog].sort((a, b) => b.likes - a.likes);
};

export const fetchBlogs = (token) => {
  return async (dispatch) => {
    try {
      const data = await getAll(token);
      dispatch(setBlogs(data));
    } catch (error) {
      dispatch(setNotification({ message: error.response.data.error, type: 'error' }));
    }
  };
};

export const createBlog = (blog, emptyForm, token) => {
  return async (dispatch) => {
    try {
      const response = await createBlogService({
        token,
        title: blog.title,
        author: blog.author,
        url: blog.url,
      });
      emptyForm();
      dispatch(fetchBlogs(token));
      dispatch(
        setNotification({
          message: 'Blog created successfully',
          type: 'success',
        })
      );
    } catch (error) {
      dispatch(setNotification({ message: error.response.data.error, type: 'error' }));
    }
  };
};

export const likeBlog = (blog, token) => {
  return async (dispatch) => {
    try {
      const response = await likeBlogService({ token, id: blog.id });
      dispatch(fetchBlogs(token));
      dispatch(setNotification({ message: 'Blog liked successfully', type: 'success' }));
    } catch (error) {
      dispatch(setNotification({ message: error.response.data.error, type: 'error' }));
    }
  };
};

export const deleteBlog = (blog, token) => {
  return async (dispatch) => {
    try {
      const response = await deleteBlogService({ token, id: blog.id });
      dispatch(fetchBlogs(token));
      dispatch(
        setNotification({
          message: 'Blog deleted successfully',
          type: 'success',
        })
      );
    } catch (error) {
      dispatch(setNotification({ message: error.response.data.error, type: 'error' }));
    }
  };
};
export default blogSlice.reducer;
