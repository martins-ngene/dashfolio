"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const SendMessage = ({ user }: any) => {
  const [newMessage, setNewMessage] = useState("");

  const email = user.email;
  const trimmedEmail = email.split("@")[0];

  // console.log(trimmedEmail);

  const supabase = createClient();

  const handleInput = (e: any) => {
    setNewMessage(e.target.value);
  };

  const addNewMessage = async (e: any, message: string, username: string) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("messages")
      .insert([{ message: message, username: username }]);

    if (error) {
      console.error("Error inserting data:", error);
      return;
    }

    // console.log("Data inserted:", data);

    setNewMessage("");
  };

  // console.log(newMessage);

  return (
    <form
      onSubmit={(e) => addNewMessage(e, newMessage, trimmedEmail)}
      className="h-10 w-full flex items-center justify-between"
    >
      <input
        id="name"
        name="name"
        type="text"
        value={newMessage}
        onChange={(e) => handleInput(e)}
        placeholder="Enter a message"
        className="block w-[80%] rounded bg-white px-4 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
      <button
        type="submit"
        className="mr-2 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Send
        <CheckCircleIcon aria-hidden="true" className="-mr-0.5 size-5" />
      </button>
    </form>
  );
};

export default SendMessage;
