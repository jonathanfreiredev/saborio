-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MAIN_COURSE', 'DESSERT', 'DRINK', 'SIDE_DISH');

-- AlterTable
ALTER TABLE "recipe" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'MAIN_COURSE',
ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'EASY';
