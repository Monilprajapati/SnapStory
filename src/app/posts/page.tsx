import PostList from "@/components/posts/post-list";

async function extractAllBlogs() {
  const res = await fetch(`${process.env.URL}/api/posts/get-all-posts`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json();

  if (data.success) return data.data;
}

export default async function Blogs() {
  const PostsList = await extractAllBlogs();

  return <PostList lists={PostsList} />;
}
