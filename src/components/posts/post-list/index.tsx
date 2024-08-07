"use client";

import { Post } from "@/utils/types";
import PostCard from "../post-card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PostList = ({ lists }: { lists: Post[] }) => {
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
  async function handleDelete(id: number) {
    console.log(id);

    const res = await fetch(`/api/posts/delete-post?id=${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    const data = await res.json();

    if (data && data.success) router.refresh();
  }

  return (
    <section className="pt-[120px] pb-[120px]">
      <div className="container">
        <div className="flex flex-wrap gap-5 items-center gap-y-7 w-full">
          {lists && lists.length
            ? lists.map((listItem: Post) => (
                <PostCard
                  handleDelete={handleDelete}
                  postItem={listItem}
                  key={listItem.id}
                />
              ))
            : null}
        </div>
      </div>
    </section>
  );
};

export default PostList;
