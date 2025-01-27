import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Articles from "@/components/articles";
import AddForm from "@/components/add-form";

export default async function UserDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: articles } = await supabase.from("articles").select("*");

  return (
  
      <div className="min-h-full w-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Your content */}
            <div className="w-full flex justify-between">
              <div className="w-[25%]">
                <AddForm />
              </div>
              <div className="w-full sm:w-[70%] rounded border border-zinc-400 grid grid-cols-1 sm:grid-cols-2 gap-6 p-8">
                <Articles articles={articles} />
              </div>
            </div>
          </div>
        </main>
      </div>
    
  );
}
