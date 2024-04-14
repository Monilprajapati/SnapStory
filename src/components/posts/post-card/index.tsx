"use client";

import { Post } from "@/utils/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

const PostCard = ({
  postItem,
  handleDelete,
}: {
  postItem: Post;
  handleDelete: (id: number) => {};
}) => {
  const { image, category, title, description, userimage, userid, id } =
    postItem;
  const { data: session } = useSession();

  console.log(session, userid);

  console.log(postItem, "postItem");

  return (
    <Link href={`/posts/${id}`}>
      <div className="relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark">
        <div className="block h-[250px] w-full">
          <Image src={image} alt="Blog Post" fill />
        </div>
      </div>
      <div className="">
        <h3>
          <div className="">
            {title}
          </div>
        </h3>
        <p className="">
          {description}
        </p>
        <div className="">
          <div className="">
            <div className="">
              <div className="h-10 relative w-10 overflow-hidden rounded-full">
                <Image alt="Author" fill src={userimage} />
              </div>
            </div>
            <div className="">
              <p className="">By</p>
              <p className="">
                {userid.split("_")[0].toUpperCase()}
              </p>
            </div>
            <div>
              {session !== null && session?.user?.name === userid ? (
                <FaTrash
                  onClick={() => handleDelete(id)}
                  size={20}
                  className="cursor-pointer"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
