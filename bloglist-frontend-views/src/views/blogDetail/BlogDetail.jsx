import { useState, useContext } from 'react'
import Text from '../../components/Text'
import { BlogContext } from '../../providers/BlogContextProvider'
import { AuthContext } from '../../providers/AuthContextProvider'
import { useParams } from 'react-router-dom'

const BlogDetail = () => {
  const { likeBlog, deleteBlog, getBlog } = useContext(BlogContext)
  const { id } = useParams()
  const blog = getBlog(id)

  const { user } = useContext(AuthContext)
  // If blog is null, don't render anything
  if (!blog) {
    return null
  }

  const handleLike = () => {
    likeBlog(blog)
  }

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(blog)
    }
  }

  const deleteButtonVisible = user && blog.user && user.id === blog.user.id

  return (
    <div
      style={{ paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }}
    >
      <div style={{ display: 'flex' }}>
        <Text as="p" style={{ margin: '0' }} text={`${blog.title} ${blog.author}`} />
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
    </div>
  )
}

export default BlogDetail
