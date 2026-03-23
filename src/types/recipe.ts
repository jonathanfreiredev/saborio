import type { Ingredient, Recipe, Step, Tag } from "generated/prisma/client";
import type { DecimalToString } from "./decimal-to-string";

export type RecipeDto = Recipe & {
  steps: Step[];
  ingredients: DecimalToString<Ingredient>[];
  tags: {
    tag: Tag;
  }[];
};
