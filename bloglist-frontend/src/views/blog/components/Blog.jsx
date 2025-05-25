import Text from "../../../components/Text";

const Blog = ({ blog }) => {
  return (
    <Text as="p" style={{ margin: "0" }} text={`${blog.title} ${blog.author}`} />
  );
};

export default Blog;