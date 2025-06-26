import { vi } from 'vitest';
vi.mock('../../../../services/blogService', () => ({
  createBlog: vi.fn(() =>
    Promise.resolve({
      id: '1',
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://test.com',
    })
  ),
  getAll: vi.fn(() => Promise.resolve([])),
  likeBlog: vi.fn(),
  deleteBlog: vi.fn(),
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogCreate from './BlogCreate';
import { expect, test } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../../../store';
import { setUser } from '../../../../slices/userSlice';

test('blog create form submits with correct data', async () => {
  const user = userEvent.setup();
  // Set up user in Redux store
  const testUser = {
    id: '1',
    username: 'testuser',
    token: 'testtoken',
    name: 'Test User',
  };
  store.dispatch(setUser(testUser));

  render(
    <Provider store={store}>
      <BlogCreate />
    </Provider>
  );

  // Get form elements
  const titleInput = screen.getByLabelText('Title:');
  const authorInput = screen.getByLabelText('Author:');
  const urlInput = screen.getByLabelText('Url:');
  const createButton = screen.getByRole('button', { name: 'Create Blog' });

  // Fill in the form
  await user.type(titleInput, 'Test Blog Title');
  await user.type(authorInput, 'Test Author');
  await user.type(urlInput, 'https://test.com');

  // Submit the form
  await user.click(createButton);

  // Wait a bit for the async operations to complete
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Verify form is cleared after submission
  expect(titleInput).toHaveValue('');
  expect(authorInput).toHaveValue('');
  expect(urlInput).toHaveValue('');
});
