import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { fetchBlogById, deleteBlog, loading, error } = useBlogs();

  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchBlogById(id).then(setPost);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return null;

  const isOwner = user?._id === post.author._id;

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
      <p className="text-gray-500 mb-6">By {post.author.name}</p>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {isOwner && (
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={async () => {
              await deleteBlog(id);
              navigate("/");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
};

export default BlogDetail;
