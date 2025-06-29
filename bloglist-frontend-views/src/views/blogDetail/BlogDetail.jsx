import { useState, useContext } from 'react'
import Text from '../../components/Text'
import { BlogContext } from '../../providers/BlogContextProvider'
import { AuthContext } from '../../providers/AuthContextProvider'
import { useParams, useNavigate } from 'react-router-dom'
import BlogComment from './components/BlogComment'

const BlogDetail = () => {
  const navigate = useNavigate()
  const { likeBlog, deleteBlog, getBlog } = useContext(BlogContext)
  const { id } = useParams()
  const blog = getBlog(id)
  console.log(blog)
  const { user } = useContext(AuthContext)

  if (!blog) {
    return null
  }

  const handleLike = () => {
    likeBlog(blog)
  }

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(blog)
      navigate('/blogs')
    }
  }

  const deleteButtonVisible = user && blog.user && user.id === blog.user.id

  return (
    <div
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        marginBottom: 5,
      }}
    >
      <div style={{ display: 'flex' }}>
        <Text as="h3" style={{ margin: '0' }} text={`${blog.title} ${blog.author}`} />
      </div>

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
      <BlogComment blog={blog} />
    </div>
  )
}

export default BlogDetail
