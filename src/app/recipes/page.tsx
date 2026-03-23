import { RecipeCard } from "~/components/recipe-card";
import { api } from "~/trpc/server";

export default async function RecipesPage() {
  const recipes = await api.recipes.getAllByAuthor();

  return (
    <>
      <h1 className="text-3xl font-bold">Recipes</h1>
      <div className="grid grid-cols-2 gap-5 p-10 md:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
