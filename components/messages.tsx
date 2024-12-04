import { createClient } from "@/utils/supabase/server";

export default async function Messages({ user }: any) {
  const supabase = await createClient();
  const { data: messages } = await supabase.from("messages").select("*");

  console.log(messages);

  return (
    <>
      {messages &&
        messages.map((message) => {
          return (
            <div
              key={message.message_id}
              className="border-[0.5px] border-[#aaa] w-[40%] my-[1rem] rounded p-2"
            >
              <div>
                <h2 className="my-1 font-bold text-[1rem]">
                  {`@` + `${user.email}`}
                </h2>
                <strong>{message.created_at}</strong>
              </div>
              <p>{message.message}</p>
            </div>
          );
        })}
    </>
  );
}
