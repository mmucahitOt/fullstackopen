import { useState, useContext } from 'react'
import BlogForm from './components/BlogForm'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../../../slices/userSlice'
import { createBlog } from '../../../../slices/blogSlice'
import { NotificationContext } from '../../../../providers/NotificationContextProvider'

const BlogCreate = () => {
  const { handleNotification } = useContext(NotificationContext)
  const dispatch = useDispatch()
  const { token } = useSelector(selectUser)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    dispatch(
      createBlog(
        { title, author, url },
        () => {
          setTitle('')
          setAuthor('')
          setUrl('')
        },
        token,
        handleNotification
      )
    )
  }

  return (
    <BlogForm
      formTitle="Create Blog"
      formProps={{ onSubmit: handleCreateBlog }}
      buttonText="Create Blog"
      buttonProps={{ type: 'submit' }}
      title={title}
      author={author}
      url={url}
      setTitle={setTitle}
      setAuthor={setAuthor}
      setUrl={setUrl}
    />
  )
}

export default BlogCreate
