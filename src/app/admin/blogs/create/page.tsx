import BlogForm from "../components/BlogForm";

export default function BlogCreatePage() {
  return (
    <div>
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-[rgb(13_33_55)]">
          Create New Blog Post
        </h1>
        <p className="text-gray-500 text-sm">Write and publish a new blog post or article</p>
      </div>

      <BlogForm />
    </div>
  );
}
