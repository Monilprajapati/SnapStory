"use client";

import { Post } from "@/utils/types";
import PostCard from "../post-card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Linewave from "@/components/Spinner/Linewave";

const PostList = ({
  lists,
  setPostsList,
}: {
  lists: Post[];
  setPostsList: React.Dispatch<React.SetStateAction<Post[]>>;
}) => {
  const router = useRouter();

  useEffect(() => {
    let interval = setInterval(() => {
      router.refresh();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(lists);
  // Delete post API call
  async function handleDelete(id: number): Promise<void> {
    try {
      console.log(id);

      const res = await fetch(`/api/posts/delete-post?id=${id}`, {
        method: "DELETE",
        cache: "no-store",
      });

      if (!res.ok) {
        toast.error("Failed to delete the post");
      }

      const data: { success: boolean; message?: string } = await res.json();

      if (data && data.success) {
        toast.success("Post deleted successfully");
        setPostsList((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } else {
        toast.error(data.message || "Failed to delete the post");
      }
    } catch (error) {
      toast.error("Failed to delete the post");
    }
  }

  return (
    <section className="pt-[120px] pb-[120px]">
      <div className="container">
        {lists && lists.length ? (
          <div className="flex flex-wrap gap-5 items-center gap-y-7 w-full">
            {lists.map((listItem: Post) => (
              <PostCard
                handleDelete={handleDelete}
                postItem={listItem}
                key={listItem.id}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <Linewave />
          </div>
        )}
      </div>
    </section>
  );
};

export default PostList;
