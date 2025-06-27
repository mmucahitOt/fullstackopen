import { createContext, useReducer, useContext, useMemo, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getAll,
  createBlog as createBlogService,
  likeBlog as likeBlogService,
  deleteBlog as deleteBlogService,
} from '../services/blogService'
import { NotificationContext } from './NotificationContextProvider'
import { AuthContext } from './AuthContextProvider'

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
  const { user } = useContext(AuthContext)
  console.log('user', user)
  const { handleNotification } = useContext(NotificationContext)
  const [blogs, blogsDispatch] = useReducer(blogReducer, [])

  const setBlogs = (blogs) => {
    blogsDispatch({ type: 'SET_BLOGS', payload: blogs })
  }

  const getBlog = useCallback(
    (id) => {
      return blogs.find((blog) => blog.id === id)
    },
    [blogs]
  )

  const fetchBlogs = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const blogs = await getAll(user.token)
      return blogs
    },
    enabled: !!user?.token,
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
      const newBlog = await createBlogService({ token: user.token, ...blog })
      return newBlog
    },
    onSuccess: (blog) => {
      handleNotification({ message: 'Blog named ' + blog.title + ' created', type: 'success' })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      handleNotification({ message: error.response.data.error, type: 'error' })
    },
  })

  const likeBlog = useMutation({
    mutationFn: async (blog) => {
      const likedBlog = await likeBlogService({ token: user.token, id: blog.id })
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
      const deletedBlog = await deleteBlogService({ token: user.token, id: blog.id })
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
        getBlog,
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
