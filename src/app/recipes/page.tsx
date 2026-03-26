import Link from "next/link";
import { redirect } from "next/navigation";
import { Recipes } from "~/components/recipes";
import { Button } from "~/components/ui/button";
import { getSession } from "~/server/better-auth/server";
import { api, HydrateClient } from "~/trpc/server";

export default async function RecipesPage() {
  const session = await getSession();

  const isLoggedIn = !!session?.session;

  if (!isLoggedIn) {
    redirect("/");
  }

  void api.recipes.getAll.prefetch({
    authorId: session.user.id,
    orderBy: "createdAt",
    skip: 0,
  });

  return (
    <HydrateClient>
      <div className="flex h-full w-full flex-col items-center py-6 md:py-10">
        <h1 className="text-3xl font-bold">My recipes</h1>

        <Button variant="default" className="mt-6">
          <Link href="/recipes/new">Create new recipe</Link>
        </Button>

        <Recipes authorId={session.user.id} isEditable />
      </div>
    </HydrateClient>
  );
}
