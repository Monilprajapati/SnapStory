import PostDetails from "@/components/posts/post-details";

interface Param {
  id: string;
}

async function extractBlogDetails(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/posts/post-details?postID=${id}`,
    {
      method: "GET",
      next : {
        revalidate : 0
      }
    }
  );

  const data = await res.json();

  if (data.success) return data.data;
}

export default async function BlogDetails({ params }: { params: Param }) {
  const { id } = params;

  const postData = await extractBlogDetails(id);

  return <PostDetails postData={postData} />;
}
