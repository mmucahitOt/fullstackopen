import { useState, useEffect, useRef } from "react";
import { getAll } from "../../services/blogService";
import BlogCreate from "./components/BlogCreate";
import Blogs from "./components/Blogs";
import Togglable from "../../components/Togglable";

const BlogView = ({ user, handleTitleChange, handleNotification }) => {
  const blogCreateRef = useRef();
  const blogListRef = useRef();
  const [mode, setMode] = useState("list");

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    handleTitleChange("blogs");
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  useEffect(() => {
    if (mode === "create") {
      blogCreateRef.current.handleVisibility(true);
      blogListRef.current.handleVisibility(false);
    } else {
      blogCreateRef.current.handleVisibility(false);
      blogListRef.current.handleVisibility(true);
    }
  }, [mode]);

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
      <Togglable ref={blogCreateRef} otherRefOfTogglable={blogListRef} labelWhenVisible="cancel" labelWhenHidden="new blog">
        <BlogCreate user={user} refetchBlogs={fetchBlogs} handleNotification={handleNotification} />
      </Togglable>
      <Togglable ref={blogListRef} hasButton={false}>
        <Blogs refetchBlogs={fetchBlogs} blogs={blogs} handleNotification={handleNotification} user={user}/>
      </Togglable>
    </div>
  );
};

export default BlogView;