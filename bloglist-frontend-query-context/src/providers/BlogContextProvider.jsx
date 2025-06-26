import { createContext, useReducer, useContext, useMemo, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAll,
  createBlog as createBlogService,
  likeBlog as likeBlogService,
  deleteBlog as deleteBlogService,
} from '../services/blogService'
import { NotificationContext } from './NotificationContextProvider'

const BlogContext = createContext()

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    default:
      return state
  }
}

export const BlogContextProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const { token } = useSelector(selectUser)
  const { handleNotification } = useContext(NotificationContext)
  const [blogs, blogsDispatch] = useReducer(blogReducer, [])
  const isInitialLoad = useRef(true)

  const setBlogs = (blogs) => {
    blogsDispatch({ type: 'SET_BLOGS', payload: blogs })
  }

  const fetchBlogs = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const blogs = await getAll(token)
      return blogs
    },
    enabled: !!token,
    retry: false,
  })

  useEffect(() => {
    if (fetchBlogs.data && fetchBlogs.status === 'success') {
      setBlogs(fetchBlogs.data)
    }
  }, [fetchBlogs.data, fetchBlogs.status, handleNotification])

  useEffect(() => {
    if (fetchBlogs.error) {
      handleNotification({
        message: fetchBlogs.error.response?.data?.error || 'Failed to fetch blogs',
        type: 'error',
      })
    }
  }, [fetchBlogs.error, handleNotification])

  const createBlog = useMutation({
    mutationFn: async (blog) => {
      const newBlog = await createBlogService({ token, ...blog })
      return newBlog
    },
    onSuccess: () => {
      handleNotification({ message: 'Blog created successfully', type: 'success' })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      handleNotification({ message: error.response.data.error, type: 'error' })
    },
  })

  const likeBlog = useMutation({
    mutationFn: async (blog) => {
      const likedBlog = await likeBlogService({ token, id: blog.id })
      return likedBlog
    },
    onSuccess: (blog) => {
      handleNotification({ message: 'Blog named ' + blog.title + ' liked', type: 'success' })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      handleNotification({ message: error.response.data.error, type: 'error' })
    },
  })

  const deleteBlog = useMutation({
    mutationFn: async (blog) => {
      const deletedBlog = await deleteBlogService({ token, id: blog.id })
      return deletedBlog
    },
    onSuccess: (blog) => {
      handleNotification({ message: 'Blog named ' + blog.title + ' deleted', type: 'success' })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      handleNotification({ message: error.response.data.error, type: 'error' })
    },
  })

  const blogsSortedByLikes = useMemo(() => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }, [blogs])

  return (
    <BlogContext.Provider
      value={{
        blogs,
        blogsSortedByLikes,
        setBlogs,
        fetchBlogs: fetchBlogs.refetch,
        createBlog: createBlog.mutateAsync,
        likeBlog: likeBlog.mutateAsync,
        deleteBlog: deleteBlog.mutateAsync,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

BlogContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { BlogContext }
