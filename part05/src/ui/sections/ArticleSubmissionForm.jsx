import { useState } from "react";

const ArticleSubmissionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const success = await onSubmit(formData);
    if (success) setFormData({ title: "", author: "", url: "" });
  };

  return (
    <>
      <h2>create new</h2>
      <form id="article-form" onSubmit={handleFormSubmission}>
        <div>
          title:
          <input
            id="article-title"
            type="text"
            value={formData.title}
            name="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          author:
          <input
            id="article-author"
            type="text"
            value={formData.author}
            name="author"
            onChange={handleInputChange}
          />
        </div>
        <div>
          url:
          <input
            id="article-url"
            type="text"
            value={formData.url}
            name="url"
            onChange={handleInputChange}
          />
        </div>
        <button id="submit-article" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default ArticleSubmissionForm;
