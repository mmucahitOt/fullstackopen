import axios from 'axios'
import generateURL from './serviceConfig'

const BLOG_API_URL = generateURL('api', 'comments')

export const createComment = async ({ token, id, comment }) => {
  const response = await axios.put(
    BLOG_API_URL + '/comment/' + id,
    { comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

export const deleteComment = async ({ token, id, commentId }) => {
  const response = await axios.delete(BLOG_API_URL + '/' + id, {
    data: { commentId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
