import { useState } from 'react'
import Text from '../../../components/Text'
import { updateBlog, deleteBlog } from '../../../services/blogService'


const BlogDetail = ({ blog, refetchBlogs, handleNotification, user }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleLike = async () => {
    try {
      await updateBlog({ token: user.token, id: blog.id, updateOptions: { likes: blog.likes + 1 } })
      handleNotification({ message: 'Blog liked successfully', type: 'success' })
      await refetchBlogs()
    } catch (error) {
      console.log('error', error)
      handleNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  const handleRemove = async () => {
    try {
      const verifyRemove = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      if (!verifyRemove) {
        return
      }
      await deleteBlog({ token: user.token, id: blog.id })
      handleNotification({ message: 'Blog deleted successfully', type: 'success' })
      await refetchBlogs()
    } catch (error) {
      console.log('error', error)
      handleNotification({ message: error.response.data.error, type: 'error' })
    }
  }

  return (
    <div style={{ paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text as='p' style={{ margin: '0' }} text={`${blog.title} ${blog.author}`} />
        <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'hide' : 'view'}</button>
      </div>
      {isExpanded && <div>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text as='p' style={{ margin: '0' }} text={blog.likes} />
          <button onClick={() => handleLike()}>like</button>
        </div>
        <Text as='p' style={{ margin: '0' }} text={blog.user.name} />
        <button onClick={() => handleRemove()}>delete</button>
      </div>}
    </div>
  )
}

export default BlogDetail