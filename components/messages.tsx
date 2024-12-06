"use client";

import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Messages({ user, messages }: any) {
  const [data, setData] = useState(messages);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          // console.log({ payload });
          setData([...data, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, data, setData]);

  return (
    <>
      {data &&
        data.map((message: any) => {
          const formattedDate = dayjs(message.created_at).format("MM-DD-YYYY");
          const time = dayjs(message.created_at).format("h:mm A");
          return (
            <div
              key={message.message_id}
              className="border-[0.5px] border-[#aaa] w-full my-[0.5rem] rounded p-2"
            >
              <div className="w-full flex items-center justify-between">
                <h2 className="my-1 font-bold text-[1rem]">
                  {`@` + `${message.username}`}
                </h2>
                <strong>
                  {time} {formattedDate}
                </strong>
              </div>
              <p>{message.message}</p>
            </div>
          );
        })}
    </>
  );
}
