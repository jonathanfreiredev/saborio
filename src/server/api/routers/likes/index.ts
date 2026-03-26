import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const likesRouter = createTRPCRouter({
  isLikedByUser: protectedProcedure
    .input(z.object({ recipeId: z.string() }))
    .query(async ({ ctx, input }) => {
      const [likeByUser, likesCount] = await ctx.db.$transaction([
        ctx.db.recipeLike.findUnique({
          where: {
            userId_recipeId: {
              userId: ctx.session.user.id,
              recipeId: input.recipeId,
            },
          },
        }),
        ctx.db.recipe.findUnique({
          where: { id: input.recipeId },
          select: { likesCount: true },
        }),
      ]);

      return { isLiked: !!likeByUser, likesCount: likesCount?.likesCount || 0 };
    }),

  toggleLike: protectedProcedure
    .input(z.object({ recipeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingLike = await ctx.db.recipeLike.findUnique({
        where: {
          userId_recipeId: {
            userId: ctx.session.user.id,
            recipeId: input.recipeId,
          },
        },
      });

      if (existingLike) {
        await ctx.db.$transaction(async (prisma) => {
          await prisma.recipeLike.delete({
            where: {
              userId_recipeId: {
                userId: ctx.session.user.id,
                recipeId: input.recipeId,
              },
            },
          });
          await prisma.recipe.update({
            where: { id: input.recipeId },
            data: {
              likesCount: {
                decrement: 1,
              },
            },
          });
        });

        return { liked: false };
      } else {
        await ctx.db.$transaction(async (prisma) => {
          await prisma.recipeLike.create({
            data: {
              userId: ctx.session.user.id,
              recipeId: input.recipeId,
            },
          });
          await prisma.recipe.update({
            where: { id: input.recipeId },
            data: {
              likesCount: {
                increment: 1,
              },
            },
          });
        });

        return { liked: true };
      }
    }),
});
