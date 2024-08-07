"use client";

import Button from "@/components/Button";
import { Post } from "@/utils/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostDetails = ({ postData }: { postData: Post }) => {
  console.log(postData, "PostData");

  const [comment, setComment] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  async function handleCommentSave() {
    let extractComments = [...postData.comments];

    extractComments.push(`${comment}|${session?.user?.name}|${session?.user?.image}`);

    const response = await fetch(`/api/posts/update-post`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: postData?.id,
        comments: extractComments,
      }),
    });

    const data = await response.json();

    console.log(data, "comment123");

    if (data && data.success) {
      setComment("");
      router.refresh();
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      router.refresh();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!postData) return null;

  console.log(postData, "PostData");
  return (
    <>
      <section className="pt-20 pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-col gap-4 items-center justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black  sm:text-4xl">
                  {postData?.title}
                </h2>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mr-10 mb-5 flex items-center">
                      <div className="mr-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image src={postData?.userimage} alt="User" fill />
                        </div>
                      </div>
                      <div className="w-full">
                        <h4 className="mb-1 text-base font-medium text-body-color">
                          By
                          <span className="pl-2">
                            {postData?.userid.split("_")[0]}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <Link
                      className="inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold bg-slate-300 text-black"
                      href={`/category/${postData?.category}`}
                    >
                      {postData?.category}
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src={postData?.image || ""}
                        alt="Blog"
                        className="object-cover object-center"
                        fill
                      />
                    </div>
                  </div>
                  <p className="mb-8 leading-relaxed text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    {postData?.description}
                  </p>
                </div>
              </div>
            </div>
            <section className="flex flex-col items-center px-4 py-8 lg:py-10 w-full lg:w-8/12">
              <div className="w-full flex gap-4">
                {session !== null ? (
                  <>
                    <input
                      name="comment"
                      id="comment"
                      autoFocus
                      autoComplete="off"
                      placeholder="Add comment here"
                      value={comment}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setComment(event.target.value)
                      }
                      className="w-full rounded-full border border-transparent py-3 px-6 text-base text-black placeholder-gray-400 shadow-one outline-none focus:bg-white focus:border-2 focus:border-gray-600 focus-visible:shadow-none bg-gray-200"
                    />
                    <Button text="Add" onClick={handleCommentSave} />
                  </>
                ) : null}
              </div>
              <div className="">
                <div className="mb-6 mt-4">
                  <h2 className="text-lg lg:text-2xl font-bold text-black dark:text-black">
                    Discussion ({postData?.comments.length})
                  </h2>
                </div>
                <div className="flex flex-col gap-4 flex-wrap">
                  {postData && postData.comments && postData.comments.length > 0
                    ? postData.comments.map((comment) => (
                        <div className="p-6 text-base rounded-lg bg-gray-200">
                          <div className=" mb-2">
                            <div className="flex gap-2 items-center">
                              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                <Image
                                  src={
                                    comment.split("|")[2] || ""
                                  }
                                  alt="User"
                                  fill
                                />
                              </div>
                              <p className="inline-flex items-center mr-3 text-sm text-black dark:text-black font-semibold">
                                {comment.split("|")[1] === postData?.userid
                                  ? `${
                                      comment.split("|")[1].split("_")[0]
                                    } (Author)`
                                  : comment.split("|")[1].split("_")[0]}
                              </p>
                            </div>
                          </div>
                          <p className="text-black ml-2 mt-1">
                            {comment.split("|")[0]}
                          </p>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetails;
