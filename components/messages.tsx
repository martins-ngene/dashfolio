"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Messages({ messages }: any) {
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
          return (
            <div
              key={message.message_id}
              className="border-[0.5px] border-[#aaa] w-full my-[1rem] rounded p-2"
            >
              <div>
                {/* <h2 className="my-1 font-bold text-[1rem]">
                  {`@` + `${user.email}`}
                </h2> */}
                <strong>{message.created_at}</strong>
              </div>
              <p>{message.message}</p>
            </div>
          );
        })}
    </>
  );
}
