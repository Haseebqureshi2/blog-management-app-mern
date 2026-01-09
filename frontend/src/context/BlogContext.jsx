import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/posts");
      setBlogs(data);
      setError(null);
    } catch (err) {
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  // Fetch single blog
  const fetchBlogById = async (id) => {
    try {
      setLoading(true);
      const { data } = await API.get(`/posts/${id}`);
      setError(null);
      return data;
    } catch (err) {
      setError("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  // Create blog
  const createBlog = async (blogData) => {
    try {
      setLoading(true);
      const { data } = await API.post("/posts", blogData);
      setBlogs((prev) => [data, ...prev]); // optimistic update
      setError(null);
    } catch (err) {
      setError("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  // Update blog
  const updateBlog = async (id, blogData) => {
    try {
      setLoading(true);
      const { data } = await API.put(`/posts/${id}`, blogData);
      setBlogs((prev) =>
        prev.map((b) => (b._id === id ? data : b))
      );
      setError(null);
    } catch (err) {
      setError("Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  // Delete blog
  const deleteBlog = async (id) => {
    try {
      setLoading(true);
      await API.delete(`/posts/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        error,
        fetchBlogs,
        fetchBlogById,
        createBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => useContext(BlogContext);
