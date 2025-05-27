import { useState, useEffect } from "react";
import { getAll } from "../../services/blog.service";
import BlogCreate from "./components/BlogCreate";
import Blogs from "./components/Blogs";

const BlogView = ({user, handleTitleChange, handleNotification}) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    handleTitleChange("blogs");
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  const fetchBlogs = async () => {
    try {
      const blogs = await getAll(user.token);
      setBlogs(blogs);
    } catch (error) {
      console.error(error);
      handleNotification({message: error.response.data.error, type: "error"});
    }
  };

  return (
    <div>
      <BlogCreate user={user} refetchBlogs={fetchBlogs} handleNotification={handleNotification} />
      <Blogs blogs={blogs} />
    </div>
  );
};

export default BlogView;