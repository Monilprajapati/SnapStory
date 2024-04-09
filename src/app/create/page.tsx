'use client'

import Button from "@/components/Button";
import Linewave from "@/components/Spinner/Linewave";
import GlobalProvider from "@/contexts";
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
  
  return (
    <section className="overflow-hidden font-plusSans py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="mb-12 rounded-md bg-gray-200 py-10 pt-8 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] px-5">
              <h2 className="mb-3 text-2xl font-bold text-black font-montserrat  sm:text-3xl lg:text-2xl xl:text-3xl">
                Create Your Own Blog Post
              </h2>
              <div>
                <div className="flex flex-col gap-3">
                  <div className="mt-3 flex gap-3">
                    <div className={`${imageLoading ? "w-1/2" : "w-full"}`}>
                      <label className="mb-3 text-base block font-medium text-black">
                        Upload Blog Image
                      </label>
                      <input
                        id="fileinput"
                        accept="image/*"
                        max={1000000}
                        // onChange={handleBlogImageChange}
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
                    {formControls.map((control) => (
                      <div className="w-full px-4">
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
                            value={formData[control.id as keyof BlogFormData]}
                            className="w-full mb-6 rounded-md border border-transparent py-3 px-4 text-base text-black placeholder-gray-400 shadow-one outline-none focus:border-primary focus-visible:shadow-none"
                          />
                        ) : control.component === "select" ? (
                          <select
                            name={control.id}
                            placeholder={control.placeholder}
                            onChange={(
                              event: React.ChangeEvent<HTMLSelectElement>
                            ) => {
                              setFormData({
                                ...formData,
                                [control.id]: event.target.value,
                              });
                            }}
                            value={formData[control.id as keyof PostFormData]}
                            className="w-full mb-6 rounded-md border border-transparent py-3 px-4 text-base text-black placeholder-gray-400 shadow-one outline-none focus:border-primary focus-visible:shadow-none"
                          >
                            <option value={""} id="">
                              Select
                            </option>
                            {control.options.map((optionItem) => (
                              <option
                                id={optionItem.value}
                                value={optionItem.value}
                              >
                                {optionItem.label}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    ))}
                    <div className="w-full px-4 mt-1">
                      <Button
                        text="Create Post"
                        onClick={() => {
                          console.log(formData);
                        }}
                     />
                    </div>
                  </div>
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
