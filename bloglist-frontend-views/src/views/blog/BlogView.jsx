import { useEffect, useRef, useContext } from 'react'
import BlogCreate from './components/blogCreate/BlogCreate'
import Blogs from './components/Blogs'
import Togglable from '../../components/Togglable'
import { TitleContext } from '../../providers/TitleContextProvider'

const BlogView = () => {
  const { handleTitle } = useContext(TitleContext)
  const blogCreateRef = useRef()
  const blogListRef = useRef()

  useEffect(() => {
    handleTitle('blogs')
  }, [])

  useEffect(() => {
    blogCreateRef.current.handleVisibility(false)
    blogListRef.current.handleVisibility(true)
  }, [])

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
  )
}

export default BlogView
