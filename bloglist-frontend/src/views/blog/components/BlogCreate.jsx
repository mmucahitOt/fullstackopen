import Form from "../../../components/common/form/Form";
import { useState } from "react";
import { createBlog } from "../../../services/blog.service";
import FormInput from "../../../components/common/form/FormInput";

const BlogCreate = ({ user, refetchBlogs, handleNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = async(event) => {
    event.preventDefault();
    try {
      const response = await createBlog({ token: user.token, title, author, url });
      console.log(response);
      await refetchBlogs();
      handleNotification({message: "Blog created successfully", type: "success"});
    } catch (error) {
      console.log(error);
      handleNotification({message: error.response.data.error, type: "error"});
    }
  };
  return (
    <div>
      <Form formTitle="Create Blog" formProps={{ onSubmit: handleCreateBlog }} buttonText="Create Blog" buttonProps={{ type: "submit" }}>
        <FormInput inputDivProps={{ className: "form-group" }} inputProps={{ label: "Title: ", type: "text", name: "title", value: title, onChange: ({ target }) => setTitle(target.value) }} />
        <FormInput inputDivProps={{ className: "form-group" }} inputProps={{ label: "Author: ", type: "text", name: "author", value: author, onChange: ({ target }) => setAuthor(target.value) }} />
        <FormInput inputDivProps={{ className: "form-group" }} inputProps={{ label: "Url: ", type: "text", name: "url", value: url, onChange: ({ target }) => setUrl(target.value) }} />
      </Form>
    </div>
  );
};

export default BlogCreate;