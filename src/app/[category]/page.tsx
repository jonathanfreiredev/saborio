import { CategoryHero } from "~/components/category-hero";
import { CategoriesNavbar } from "~/components/home/categories-navbar";

interface MainsPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: MainsPageProps) {
  const { category } = await params;

  return (
    <main className="">
      <CategoriesNavbar currentCategory={category} />
      <CategoryHero currentCategory={category} />
    </main>
  );
}
