import { useContext } from 'react'
import { BlogContext } from '../../../providers/BlogContextProvider'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const { blogs } = useContext(BlogContext)
  console.log('Blogs', blogs)
  if (!blogs || blogs.length === 0) {
    return <div>No blogs found</div>
  }
  return (
    <div>
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id}>
          <div>
            {blog.title} {blog.author}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Blogs
