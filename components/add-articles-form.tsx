"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const AddForm = () => {
  const initialState = {
    title: "",
    description: "",
    link_to_article: "",
  };

  const [newArticle, setNewArticle] = useState(initialState);

  const supabase = createClient();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Update the specific field in the form state
    setNewArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // console.log(newArticle);
  };

  const addNewArticle = async (
    e: React.FormEvent<HTMLFormElement>,
    title: string,
    description: string,
    link_to_article: string
  ) => {
    e.preventDefault();

    // console.log(link_to_article);

    const { data, error } = await supabase.from("articles").insert([
      {
        title: title,
        description: description,
        link_to_article: link_to_article,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
      return;
    }

    console.log("Data inserted:", data);
    setNewArticle(initialState);
  };

  return (
    <form
      onSubmit={(e) =>
        addNewArticle(
          e,
          newArticle.title,
          newArticle.description,
          newArticle.link_to_article
        )
      }
      className="w-full flex flex-col"
    >
      {/* Title */}
      <div className="w-full mb-4">
        <Label
          htmlFor="title"
          className="block font-semibold text-sm/6 text-gray-900"
        >
          Title
        </Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={newArticle.title}
          onChange={handleInput}
          placeholder="Enter post title"
        />
      </div>

      {/* Description */}
      <div className="w-full mb-4">
        <Label
          htmlFor="description"
          className="block text-sm/6 font-semibold text-gray-900"
        >
          Description
        </Label>
        <div className="mt-2">
          <Textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Write a description..."
            value={newArticle.description}
            onChange={handleInput}
          />
        </div>
      </div>

      {/* Post Link */}
      <div className="w-full mb-4">
        <Label
          htmlFor="link_to_article"
          className="block text-sm/6 font-semibold text-gray-900"
        >
          Link To Article
        </Label>
        <Input    id="link_to_article"
          name="link_to_article"
          type="text"
          value={newArticle.link_to_article}
          onChange={handleInput}
          placeholder="Enter link to article"/>
      </div>

      {/* Submit Button */}
      <div className="mt-4 w-full">
        <button
          type="submit"
          className="w-full h-12 mr-2 inline-flex items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Post
          <CheckCircleIcon aria-hidden="true" className="-mr-0.5 size-5" />
        </button>
      </div>
    </form>
  );
};

export default AddForm;
