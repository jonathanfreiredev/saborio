"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "~/lib/utils";
import { recipeSchema } from "~/server/api/routers/recipes/validation";
import { api } from "~/trpc/react";
import type { RecipeDto } from "~/types/recipe";
import { RecipeForm } from "./recipe-form";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field } from "./ui/field";

interface UpdateRecipeFormProps {
  recipe: RecipeDto;
}

export const UpdateRecipeForm = ({
  recipe,
  className,
  ...props
}: React.ComponentProps<"div"> & UpdateRecipeFormProps) => {
  const router = useRouter();

  const updateRecipeMutation = api.recipes.update.useMutation();

  const form = useForm<z.infer<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: recipe.title,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      defaultServings: recipe.defaultServings,
      preparationTime: recipe.preparationTime,
      cookingTime: recipe.cookingTime,
      restingTime: recipe.restingTime,
      calories: recipe.calories,
      carbohydrates: recipe.carbohydrates,
      protein: recipe.protein,
      fat: recipe.fat,
      tags: recipe.tags.map((recipeTag) => recipeTag.tag.name),
    },
  });

  async function onSubmit(data: z.infer<typeof recipeSchema>) {
    const updatedRecipe = await updateRecipeMutation.mutateAsync({
      id: recipe.id,
      recipe: data,
    });

    if (updatedRecipe) {
      router.push(`/recipes/${updatedRecipe.slug}/update/ingredients`);
    }
  }

  return (
    <div
      className={cn("flex w-full max-w-125 flex-col gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Update Recipe</CardTitle>
          <CardDescription>
            Fill out the form below to update your recipe details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-create-recipe" onSubmit={form.handleSubmit(onSubmit)}>
            <RecipeForm control={form.control} />

            <Field>
              <Button
                type="submit"
                form="form-create-recipe"
                disabled={form.formState.isSubmitting}
              >
                Update Recipe
              </Button>
            </Field>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
