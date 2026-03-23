import { BreadcrumbRecipeForm } from "~/components/breadcrumb-recipe-form";
import { RecipeIngredientsForm } from "~/components/recipe-ingredients-form";
import { api } from "~/trpc/server";

export default async function UpdateRecipeIngredientsPage({
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
      <BreadcrumbRecipeForm step="ingredients" recipeSlug={recipeSlug} />
      <RecipeIngredientsForm recipe={recipe} />
    </div>
  );
}
