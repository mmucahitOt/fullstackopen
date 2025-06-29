import Text from '../../../components/Text'
import CommentCreateForm from './CommentCreateForm'

const BlogComment = ({ blog }) => {
  if (!blog.comments || blog.comments.length === 0) {
    return (
      <div>
        <Text as="h3" style={{ margin: '0' }} text="Comments" />
        <p>No comments yet</p>
      </div>
    )
  }

  return (
    <div>
      <Text as="h3" style={{ margin: '0' }} text="Comments" />
      <CommentCreateForm blog={blog} />
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment._id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogComment
