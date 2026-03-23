import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  recipeIngredientsSchema,
  recipeSchema,
  recipeStepsSchema,
} from "./validation";
import slugify from "slugify";
import z from "zod";
import { Unit } from "generated/prisma/enums";
import type { RecipeDto } from "~/types/recipe";

export const recipesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(recipeSchema)
    .mutation(async ({ ctx, input }) => {
      const slug = slugify(input.title, {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
      });

      const newRecipe = await ctx.db.recipe.create({
        data: {
          title: input.title,
          description: input.description,
          slug,
          imageUrl: input.imageUrl,
          defaultServings: input.defaultServings,
          preparationTime: input.preparationTime,
          cookingTime: input.cookingTime,
          restingTime: input.restingTime,
          calories: input.calories,
          carbohydrates: input.carbohydrates,
          protein: input.protein,
          fat: input.fat,
          ingredients: {
            create: {
              name: "New ingredient",
              quantity: "0",
              unit: Unit.GRAM,
              order: 0,
            },
          },
          author: { connect: { id: ctx.session.user.id } },
        },
      });

      return newRecipe;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        recipe: recipeSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, recipe } = input;

      const slug = slugify(recipe.title, {
        replacement: "-",
        lower: true,
        strict: true,
        trim: true,
      });

      const updatedRecipe = await ctx.db.recipe.update({
        where: { id },
        data: {
          title: recipe.title,
          description: recipe.description,
          slug,
          imageUrl: recipe.imageUrl,
          defaultServings: recipe.defaultServings,
          preparationTime: recipe.preparationTime,
          cookingTime: recipe.cookingTime,
          restingTime: recipe.restingTime,
          calories: recipe.calories,
          carbohydrates: recipe.carbohydrates,
          protein: recipe.protein,
          fat: recipe.fat,
        },
      });

      return updatedRecipe;
    }),

  updateIngredients: protectedProcedure
    .input(
      z.object({
        recipeId: z.string(),
        ingredients: recipeIngredientsSchema.shape.ingredients,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { ingredients, recipeId } = input;

      // Delete existing ingredients for the recipe
      await ctx.db.ingredient.deleteMany({
        where: { recipeId },
      });

      // Create new ingredients
      await ctx.db.ingredient.createMany({
        data: ingredients.map((ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          order: ingredient.order,
          recipeId,
        })),
      });

      return { success: true };
    }),

  updateSteps: protectedProcedure
    .input(
      z.object({
        recipeId: z.string(),
        steps: recipeStepsSchema.shape.steps,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { steps, recipeId } = input;

      // Delete existing steps for the recipe
      await ctx.db.step.deleteMany({
        where: { recipeId },
      });

      // Create new steps
      await ctx.db.step.createMany({
        data: steps.map((step) => ({
          description: step.description,
          imageUrl: step.imageUrl,
          order: step.order,
          recipeId,
        })),
      });

      return { success: true };
    }),

  getAllByAuthor: protectedProcedure.query(async ({ ctx }) => {
    const recipes = await ctx.db.recipe.findMany({
      where: { authorId: ctx.session.user.id },
      include: {
        ingredients: {
          orderBy: { order: "asc" },
        },
        steps: {
          orderBy: { order: "asc" },
        },
        tags: true,
      },
    });

    const recipesWithStringQuantities = recipes.map((recipe) => ({
      ...recipe,
      ingredients: recipe.ingredients.map((ingredient) => ({
        ...ingredient,
        quantity: ingredient.quantity.toString(),
      })),
    }));

    return recipesWithStringQuantities;
  }),
  getBySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }): Promise<RecipeDto> => {
      const recipe = await ctx.db.recipe.findUnique({
        where: { slug: input.slug },
        include: {
          ingredients: {
            orderBy: { order: "asc" },
          },
          steps: {
            orderBy: { order: "asc" },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      if (!recipe) {
        throw new Error("Recipe not found");
      }

      return {
        ...recipe,
        ingredients: recipe.ingredients.map((ingredient) => ({
          ...ingredient,
          quantity: ingredient.quantity.toString(),
        })),
      };
    }),
});
