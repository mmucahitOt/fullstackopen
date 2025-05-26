import { useState, useEffect } from "react";
import { getAll } from "../../services/blog.service";
import Blog from "./components/Blog";
import Text from "../../components/Text";
import LogoutForm from "../login/components/LogoutForm";
import BlogCreate from "./components/BlogCreate";

export const Blogs = ({user, handleLogout}) => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  const fetchBlogs = async () => {
    try {
      const blogs = await getAll(user.token);
      setBlogs(blogs);
    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
    }
  };

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <h3>blogs</h3>
      <Text style={{ marginBottom: "10px" }} text={user.username + " logged in"} />
      <LogoutForm handleLogout={handleLogout} />
      <BlogCreate user={user} refetchBlogs={fetchBlogs} />
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};