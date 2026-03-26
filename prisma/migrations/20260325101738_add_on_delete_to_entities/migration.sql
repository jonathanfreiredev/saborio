-- DropForeignKey
ALTER TABLE "ingredient" DROP CONSTRAINT "ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "recipe_like" DROP CONSTRAINT "recipe_like_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "recipe_like" DROP CONSTRAINT "recipe_like_userId_fkey";

-- DropForeignKey
ALTER TABLE "step" DROP CONSTRAINT "step_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "ingredient" ADD CONSTRAINT "ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step" ADD CONSTRAINT "step_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_like" ADD CONSTRAINT "recipe_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_like" ADD CONSTRAINT "recipe_like_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
