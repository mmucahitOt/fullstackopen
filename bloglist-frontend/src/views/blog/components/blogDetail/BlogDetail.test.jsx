import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import BlogDetail from '../BlogDetail/BlogDetail'

test('does not show url and user name by default', () => {
  const blog = {
    id: '1',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://test.com',
    likes: 0,
    user: {
      name: 'Test User'
    }
  }

  render(<BlogDetail blog={blog} />)

  // Title and author should be visible by default
  const titleAuthorElement = screen.getByText(`${blog.title} ${blog.author}`)
  expect(titleAuthorElement).toBeDefined()

  // URL should not be visible
  const urlElement = screen.queryByText(blog.url)
  expect(urlElement).toBeNull()

  // User name should not be visible
  const userNameElement = screen.queryByText(blog.user.name)
  expect(userNameElement).toBeNull()
})