import { useState, useEffect, useRef, useCallback } from 'react'
import { getAll } from '../../services/blogService'
import BlogCreate from './components/blogCreate/BlogCreate'
import Blogs from './components/Blogs'
import Togglable from '../../components/Togglable'

const BlogView = ({ user, handleTitleChange, handleNotification }) => {
  const blogCreateRef = useRef()
  const blogListRef = useRef()

  const [blogs, setBlogs] = useState([])

  const fetchBlogs = useCallback(async (sortByLikes = true) => {
    try {
      let blogs = await getAll(user.token)
      if (sortByLikes) {
        blogs = blogs.sort((a, b) => b.likes - a.likes)
      }
      setBlogs(blogs)
    } catch (error) {
      console.error(error)
      handleNotification({ message: error.response.data.error, type: 'error' })
    }
  }, [])

  useEffect(() => {
    handleTitleChange('blogs')
  }, [handleTitleChange])

  useEffect(() => {
    fetchBlogs()
  }, [user, fetchBlogs])

  useEffect(() => {
    blogCreateRef.current.handleVisibility(false)
    blogListRef.current.handleVisibility(true)
  }, [])

  return (
    <div>
      <Togglable ref={blogCreateRef} otherRefOfTogglable={blogListRef} labelWhenVisible='cancel' labelWhenHidden='new blog'>
        <BlogCreate user={user} refetchBlogs={fetchBlogs} handleNotification={handleNotification} />
      </Togglable>
      <Togglable ref={blogListRef} hasButton={false}>
        <Blogs refetchBlogs={fetchBlogs} blogs={blogs} handleNotification={handleNotification} user={user}/>
      </Togglable>
    </div>
  )
}

export default BlogView