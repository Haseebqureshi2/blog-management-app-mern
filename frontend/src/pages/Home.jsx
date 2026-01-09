import { Link } from "react-router-dom";
import { useBlogs } from "../context/BlogContext";

const Home = () => {
  const { blogs, loading, error } = useBlogs();

  if (loading) return <p className="text-center">Loading blogs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <div
            key={post._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              <Link
                to={`/posts/${post._id}`}
                className="hover:text-blue-600"
              >
                {post.title}
              </Link>
            </h3>

            <p className="text-sm text-gray-500 mb-3">
              By {post.author.name}
            </p>

            <Link
              to={`/posts/${post._id}`}
              className="text-blue-600 text-sm font-medium"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
