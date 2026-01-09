import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useBlogs } from "../context/BlogContext";

const CreateEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createBlog, updateBlog, fetchBlogById, loading } = useBlogs();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      fetchBlogById(id).then((data) => {
        setTitle(data.title);
        setContent(data.content);
      });
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (id) {
      await updateBlog(id, { title, content });
    } else {
      await createBlog({ title, content });
    }

    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Blog" : "Create Blog"}
      </h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <ReactQuill value={content} onChange={setContent} />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          {loading ? "Saving..." : id ? "Update" : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default CreateEditBlog;
