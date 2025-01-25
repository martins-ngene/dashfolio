import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Articles from "@/components/articles";
import AddForm from "@/components/add-form";
import Tabs from "@/components/tabs";

export default async function ProtectedPage() {
  const tabs = [
    { name: "Articles", href: "#", current: true },
    { name: "Resources", href: "#", current: false },
    { name: "Speaking", href: "#", current: false },
  ];

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: articles } = await supabase.from("articles").select("*");

  return (
    <div className="w-[90%] flex flex-col items-center mx-auto">
      <div className="w-[80%]">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="w-[40%] my-8">
        <Tabs tabs={tabs} />
      </div>
      <div className="w-full flex justify-between">
        <div className="w-[25%]">
          <AddForm />
        </div>
        <div className="w-[70%] rounded border border-zinc-400 grid grid-cols-2 gap-6 p-8">
          <Articles articles={articles} />
        </div>
      </div>
    </div>
  );
}
