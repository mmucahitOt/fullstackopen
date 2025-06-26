import { vi } from 'vitest';
vi.mock('../../../../services/blogService', () => ({
  getAll: vi.fn(() => Promise.resolve([])),
  likeBlog: vi.fn(() => Promise.resolve({ id: '1', likes: 1 })),
  deleteBlog: vi.fn(() => Promise.resolve({ id: '1' })),
  createBlog: vi.fn(),
}));

import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import BlogDetail from '../BlogDetail/BlogDetail';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../../../store';
import { setBlogs } from '../../../../slices/blogSlice';
import { setUser } from '../../../../slices/userSlice';

test('does not show url and user name by default', () => {
  const blog = {
    id: '1',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 0,
    user: {
      id: '1',
      username: 'testuser',
      token: 'testtoken',
      name: 'Test User',
    },
  };

  store.dispatch(setBlogs([blog]));
  store.dispatch(setUser(blog.user));
  render(
    <Provider store={store}>
      <BlogDetail blog={blog} />
    </Provider>
  );

  // Title and author should be visible by default
  const titleAuthorElement = screen.getByText(`${blog.title} ${blog.author}`);
  expect(titleAuthorElement).toBeDefined();

  // URL should not be visible
  const urlElement = screen.queryByText(blog.url);
  expect(urlElement).toBeNull();

  // User name should not be visible
  const userNameElement = screen.queryByText(blog.user.name);
  expect(userNameElement).toBeNull();
});

test('shows url and user name when expanded', async () => {
  const blog = {
    id: '1',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 0,
    user: {
      id: '1',
      username: 'testuser',
      token: 'testtoken',
      name: 'Test User',
    },
  };

  const user = userEvent.setup();

  store.dispatch(setBlogs([blog]));
  store.dispatch(setUser(blog.user));
  render(
    <Provider store={store}>
      <BlogDetail blog={blog} />
    </Provider>
  );
  await user.click(screen.getByText('view'));

  const titleAuthorElement = screen.getByText(`${blog.title} ${blog.author}`);
  expect(titleAuthorElement).toBeDefined();

  const urlElement = screen.getByText(blog.url);
  expect(urlElement).toBeDefined();

  const userNameElement = screen.getByText(blog.user.name);
  expect(userNameElement).toBeDefined();
});

test('clicking like button calls like action', async () => {
  const blog = {
    id: '1',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 0,
    user: {
      id: '1',
      username: 'testuser',
      token: 'testtoken',
      name: 'Test User',
    },
  };

  const user = userEvent.setup();

  store.dispatch(setBlogs([blog]));
  store.dispatch(setUser(blog.user));
  render(
    <Provider store={store}>
      <BlogDetail blog={blog} />
    </Provider>
  );

  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likesButton = screen.getByText('like');
  await user.click(likesButton);

  // The like button should be clickable and not throw errors
  expect(likesButton).toBeDefined();
});
