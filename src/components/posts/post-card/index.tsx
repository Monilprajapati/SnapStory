"use client";

import { Post } from "@/utils/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import Linewave from "@/components/Spinner/Linewave";
import noImg from "/public/noImg.png";
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

  return (
    // <Link href={`/posts/${id}`}>
    //   <div className="flex flex-col items-center">
    //     <div className="relative w-20">
    //       <Image src={image} alt="Blog Post" fill />
    //     </div>
    //   </div>
    //   <div className="">
    //     <h3>
    //       <div className="">
    //         {title}
    //       </div>
    //     </h3>
    //     <p className="">
    //       {description}
    //     </p>
    //     <div className="">
    //       <div className="">
    //         <div className="">
    //           <div className="h-10 relative w-10 overflow-hidden rounded-full">
    //             <Image alt="Author" fill src={userimage} />
    //           </div>
    //         </div>
    //         <div className="">
    //           <p className="">By</p>
    //           <p className="">
    //             {userid.split("_")[0].toUpperCase()}
    //           </p>
    //         </div>
    //         <div>
    //           {session !== null && session?.user?.name === userid ? (
    //             <FaTrash
    //               onClick={() => handleDelete(id)}
    //               size={20}
    //               className="cursor-pointer"
    //             />
    //           ) : null}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
    // <Link
    //   href={`/posts/${id}`}
    //   className="flex flex-col justify-between gap-5 h-fit
    // bg-gray-200 rounded-xl border-2 border-black/30 hover:border-black shadow-custom px-4 py-4 pt-5"
    // >
    //   <div>
    //     <div className="flex justify-center">
    //       <Image
    //         src={image}
    //         width={420}
    //         height={300}
    //         alt="blog-banner"
    //         className="rounded-xl"
    //       />
    //     </div>

    //     <div className="flex justify-start mt-5">
    //       <h1 className="text-sm font-bold bg-white rounded-lg p-2 text-center">
    //         {category.toUpperCase()}
    //       </h1>
    //     </div>

    //     <div className="mt-2 flex flex-col items-start">
    //       <div className="text-xl font-bold">{title}</div>
    //       <p className="text-sm">{description}</p>
    //     </div>
    //   </div>
    //   <div className="flex items-center gap-2">
    //     <Image
    //       src={userimage}
    //       width={40}
    //       height={40}
    //       alt="avatar"
    //       className="rounded-full"
    //     />
    //     <span className="font-bold mt-1">{userid.split("_")[0]}</span>
    //   </div>
    // </Link>
    <div className="md:w-[350px] lg:w-[420px] py-7 pb-5 px-5 xl:px-6 rounded-lg h-[450px] shadow-shadowOne text-black flex flex-col justify-between bg-gray-200">
      <Link href={`/posts/${id}`}>
        <div className="w-full rounded-md">
          {!image ? (
            <Image
              alt="no image"
              src={noImg}
              width={400}
              height={200}
              className="h-[200px] object-cover rounded-md"
            />
          ) : (
            <Image
              className="h-[200px] object-cover rounded-md"
              src={image}
              width={400}
              height={200}
              alt="src"
            />
          )}
        </div>
      </Link>
      <div className="flex flex-col w-full items-start mb-4 h-full justify-between">
        <h1 className="text-sm font-bold mt-4 mb-2 bg-white rounded-2xl px-4 py-1.5">
          {category.toUpperCase()}
        </h1>
        <h3 className="text-xl font-lato font-semibold line-clamp-1 mt-1">
          {title}
        </h3>
        <p className="text-sm tracking-wider line-clamp-2 mt-2">
          {description}
        </p>
      </div>
      <div className="flex items-center w-full justify-between h-full">
        <div className="flex items-center gap-2 w-full h-full">
          <Image
            src={userimage}
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full"
          />
          <span className="font-bold mt-1">{userid.split("_")[0]}</span>
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
  );
};

export default PostCard;
