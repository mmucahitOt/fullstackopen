import { useState, useContext } from 'react'
import Text from '../../../../components/Text'
import { BlogContext } from '../../../../providers/BlogContextProvider'
import { UserContext } from '../../../../providers/UserContextProvider'

const BlogDetail = ({ blog }) => {
  const { likeBlog, deleteBlog } = useContext(BlogContext)
  const [isExpanded, setIsExpanded] = useState(false)

  const { user } = useContext(UserContext)
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
  )
}

export default BlogDetail
