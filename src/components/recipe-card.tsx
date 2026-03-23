"use client";

import type { Recipe } from "generated/prisma/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const router = useRouter();
  return (
    <div key={recipe.id} className="rounded-lg bg-white p-4 shadow">
      <h2 className="text-xl font-semibold">{recipe.title}</h2>
      <p className="text-sm text-gray-600">{recipe.description}</p>
      <p className="mt-2 text-sm text-gray-500">
        Servings: {recipe.defaultServings}
      </p>
      <Button
        className="mt-4 w-full"
        onClick={() => {
          router.replace(`/recipes/${recipe.slug}/update`);
        }}
      >
        Update
      </Button>
    </div>
  );
}
