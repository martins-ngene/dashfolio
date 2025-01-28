import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Articles from "@/components/articles";
import AddForm from "@/components/add-form";
import { Container } from "@/components/container";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: articles } = await supabase.from("articles").select("*");

  return (
      <Container>
        <Container.Header>Dashboard</Container.Header>
        <Container.Main>
          <Container.Grid>
            <Container.ColLeft>
              <AddForm />
            </Container.ColLeft>
            <Container.ColRight>
              <Articles articles={articles} />
            </Container.ColRight>
          </Container.Grid>
        </Container.Main>
      </Container>
  );
}
