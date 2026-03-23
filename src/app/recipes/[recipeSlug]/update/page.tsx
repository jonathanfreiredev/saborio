import { BreadcrumbRecipeForm } from "~/components/breadcrumb-recipe-form";
import { UpdateRecipeForm } from "~/components/update-recipe-form";
import { api } from "~/trpc/server";

export default async function UpdateRecipePage({
  params,
}: {
  params: Promise<{ recipeSlug: string }>;
}) {
  const { recipeSlug } = await params;

  const recipe = await api.recipes.getBySlug({
    slug: recipeSlug,
  });

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-4 p-6 md:p-10">
      <BreadcrumbRecipeForm step="details" recipeSlug={recipeSlug} />
      <UpdateRecipeForm recipe={recipe} />
    </div>
  );
}
