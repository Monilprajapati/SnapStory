"use client";

import Button from "@/components/Button";
import Linewave from "@/components/Spinner/Linewave";
import { handleImageSaveToFireBase } from "@/config/firebase";
import { GlobalContext } from "@/contexts";
import { formControls, initialPostFormData } from "@/utils";
import { PostFormData } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

const Create = () => {
  const { formData, setFormData } = useContext(GlobalContext);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  async function handlePostImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!event.target.files) return;
    setImageLoading(true);
    const saveImageToFirebase: any = await handleImageSaveToFireBase(
      event.target.files[0]
    );

    if (saveImageToFirebase !== "") {
      setImageLoading(false);
      console.log(saveImageToFirebase, "saveImageToFirebase");
      setFormData({
        ...formData,
        image: saveImageToFirebase,
      });
    }
  }

  async function handleSaveBlogPost() {
    console.log(formData);

    const res = await fetch("/api/posts/add-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        userid: session?.user?.name,
        userimage: session?.user?.image,
        comments: [],
      }),
    });

    const data = await res.json();

    console.log(data, "data123");

    if (data && data.success) {
      setFormData(initialPostFormData);
      router.push("/posts");
    }
  }

  console.log(formData, "formData");

  return (
    <section className="overflow-hidden flex items-center justify-center font-plusSans lg:px-10 xl:px-20 py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="mb-12 rounded-md bg-gray-200 py-8 md:px-9 lg:mb-5 lg:px-8 xl:p-[55px] xl:pt-[50px] px-5">
          <h2 className="mb-5 text-2xl font-bold text-black font-montserrat lg:text-3xl">
            Create Your Own Blog Post
          </h2>
          <div>
            <div className="flex flex-col gap-3">
              <div className="mt-3 flex gap-3">
                <div className={`${imageLoading ? "w-1/2" : "w-full"}`}>
                  <label className="mb-3 text-base block font-medium text-black">
                    Upload Post Image
                  </label>
                  <input  
                    id="fileinput"
                    accept="image/*"
                    max={1000000}
                    onChange={handlePostImageChange}
                    type="file"
                    className="w-full mb-3 rounded-md border border-transparent py-3 px-6 text-base  bg-white text-black placeholder-black shadow-one outline-none focus-visible:shadow-none"
                  />
                </div>
                {imageLoading ? (
                  <div className="w-1/2">
                    <Linewave />
                  </div>
                ) : null}
              </div>

              <div className="-mx-4 flex flex-wrap">
                {formControls.map((control,index) => (
                  <div className="w-full px-4" key={index}>
                    <label className="mb-2 text-lg block font-medium text-black">
                      {control.label}
                    </label>
                    {control.component === "input" ? (
                      <input
                        type={control.type}
                        name={control.id}
                        placeholder={control.placeholder}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setFormData({
                            ...formData,
                            [control.id]: event.target.value,
                          });
                        }}
                        value={formData[control.id as keyof PostFormData]}
                        className="w-full mb-6 rounded-md border border-transparent py-3 px-4 text-base text-black placeholder-gray-400 shadow-one outline-none focus:border-primary focus-visible:shadow-none"
                      />
                    ) : control.component === "textarea" ? (
                      <textarea
                        placeholder={control.placeholder}
                        rows={5}
                        name={control.id}
                        onChange={(
                          event: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                          setFormData({
                            ...formData,
                            [control.id]: event.target.value,
                          });
                        }}
                        value={formData[control.id as keyof PostFormData]}
                        className="w-full mb-6 rounded-md border border-transparent py-3 px-4 text-base text-black placeholder-gray-400 shadow-one outline-none  focus-visible:shadow-none"
                      />
                    ) : control.component === "select" ? (
                      <select
                        name={control.id}
                        onChange={(
                          event: React.ChangeEvent<HTMLSelectElement>
                        ) => {
                          setFormData({
                            ...formData,
                            [control.id]: event.target.value,
                          });
                        }}
                        value={formData[control.id as keyof PostFormData]}
                        className="w-full mb-6 rounded-md border border-transparent py-3 px-4 text-base text-black placeholder-gray-400 bg-white shadow-one outline-none  focus-visible:shadow-none"
                      >
                        <option value={""} id="" disabled>
                        {control.placeholder || "Select an option"}
                        </option>
                        {control.options.map((optionItem, index) => (
                          <option
                            id={optionItem.value}
                            value={optionItem.value}
                            key={index}
                          >
                            {optionItem.label}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                ))}
                <div className="w-full px-4 mt-1">
                  <Button text="Create Post" onClick={handleSaveBlogPost} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
