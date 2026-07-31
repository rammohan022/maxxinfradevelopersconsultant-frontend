import BlogForm from "../components/BlogForm";

export default function BlogCreatePage() {
  return (
    <div>
      <div className="mb-3">
        <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
          Create New Blog Post
        </h1>
        <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-3xl">Write and publish a new blog post or article</p>
      </div>

      <BlogForm />
    </div>
  );
}
