import BlogDetail from './blogDetail/BlogDetail'
import { useContext } from 'react'
import { BlogContext } from '../../../providers/BlogContextProvider'

const Blogs = () => {
  const { blogs } = useContext(BlogContext)
  console.log('Blogs', blogs)
  if (!blogs || blogs.length === 0) {
    return <div>No blogs found</div>
  }
  return (
    <div>
      {blogs.map((blog) => (
        <BlogDetail key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
