"use client";

import PostList from "@/components/posts/post-list";
import { useEffect, useState } from "react";
import { Post } from "@/utils/types";

// Use the Post interface you defined
async function extractAllBlogs(): Promise<Post[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/posts/get-all-posts`,
      {
        method: "GET",
        // cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data: { success: boolean; data: Post[] } = await res.json();

    if (data.success) {
      return data.data; // Assuming data.data contains the list of posts
    } else {
      throw new Error("API returned unsuccessful response");
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array or handle the error as needed
  }
}

export default function Blogs() {
  const [postsList, setPostsList] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchData() {
      const posts = await extractAllBlogs();
      setPostsList(posts);
    }

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once on mount

  return <PostList lists={postsList} setPostsList={setPostsList} />;
}
