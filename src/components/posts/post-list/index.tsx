"use client";

import { Post } from "@/utils/types";
import PostCard from "../post-card";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const PostList = (
  { lists }: { lists: Post[] }
) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

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
        <div className="-mx-4 grid grid-cols-3 gap-2">
          {lists && lists.length
            ? lists.map((listItem: Post) => (
                <div className="px-4" key={listItem.id}>
                  <PostCard handleDelete={handleDelete} postItem={listItem} />
                </div>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}

export default PostList