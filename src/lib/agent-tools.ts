import { tool } from "ai";
import z from "zod";

export const createRecipe = tool({
  description: `
Creates and stores a finalized cooking recipe after the user has explicitly approved it.

IMPORTANT:
- Only call this tool when the user has clearly confirmed they want to create/save the recipe.
- Do NOT call this tool during brainstorming or suggestion phases.
- The recipe must already be fully defined and agreed upon.

The recipe should include a clear title, ingredients list, and step-by-step instructions.
  `,
  inputSchema: z.object({
    title: z.string().describe("The name of the recipe"),
    description: z.string().describe("Short description of the dish"),
    ingredients: z.array(
      z.object({
        name: z.string(),
        quantity: z.string(),
      }),
    ),
    steps: z.array(z.string()),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string(),
    recipe: z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  }),
  needsApproval: true,
  execute: async (recipe) => {
    const newRecept = {
      title: recipe.title,
      description: recipe.description,
      slug: recipe.title.toLowerCase().replace(/\s+/g, "-"),
    };

    console.log("Creating recipe:", newRecept);

    return {
      success: true,
      message: "Recipe created successfully",
      recipe: newRecept,
    };
  },
});
