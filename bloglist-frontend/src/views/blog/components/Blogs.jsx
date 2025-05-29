import BlogDetail from "./BlogDetail";

const Blogs = ({blogs, handleNotification, refetchBlogs, user}) => {

  return (
    <div>
      {blogs.map((blog) => <BlogDetail key={blog.id} blog={blog} handleNotification={handleNotification} refetchBlogs={refetchBlogs} user={user}/>)}
    </div>
  );
};

export default Blogs;