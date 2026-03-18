import Image from "next/image";
import { CarouselMainCategory } from "~/components/home/carousel-main-category";
import { CategoriesNavbar } from "~/components/home/categories-navbar";
import { Button } from "~/components/ui/button";

interface HomeProps {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <main className="">
      <CategoriesNavbar />
      <div className="flex flex-col gap-5">
        <div className="relative flex h-[calc(100vh-12rem)] w-full items-center justify-center gap-4 px-10 py-16">
          <Image
            src="/images/lime-and-green-leaves.webp"
            alt="Lime and green leaves"
            fill
            className="absolute -z-10 object-cover"
          />

          <div className="flex h-full w-full flex-col text-gray-800 lg:flex-row">
            <div className="flex flex-1 flex-col gap-4 px-2">
              <h2 className="text-center text-5xl sm:text-7xl lg:text-left">
                Mains
              </h2>
              <p className="text-center lg:text-left">
                It begins with Greek Yogurt. Triple strained to be thick and
                creamy. Made the old-world way, locally sourced and
                authentically crafted. Perfect for small-spoon eating or
                big-spoon cooking.
              </p>

              <div>
                <Button
                  variant="default"
                  size="lg"
                  className="hover:opacity-80"
                >
                  View recipes
                </Button>
              </div>
            </div>

            <div className="flex h-full flex-1 justify-center lg:flex-2 lg:justify-end">
              <CarouselMainCategory />
            </div>
          </div>
        </div>

        <div className="relative flex h-[calc(100vh-12rem)] w-full flex-col gap-5 lg:flex-row">
          <div className="relative flex-1">
            <Image
              src="/images/aperol-drink.webp"
              alt="Aperol drink"
              fill
              className="absolute -z-10 object-cover"
            />

            <div className="flex flex-col gap-5 p-5 text-white sm:p-15">
              <h2 className="text-center text-5xl sm:text-7xl lg:text-left">
                Drinks
              </h2>
              <p className="text-center lg:text-left">
                It begins with Greek Yogurt. Triple strained to be thick and
                creamy. Made the old-world way, locally sourced and
                authentically crafted. Perfect for small-spoon eating or
                big-spoon cooking.
              </p>

              <div>
                <Button variant="secondary" size="lg">
                  View recipes
                </Button>
              </div>
            </div>
          </div>
          <div className="relative flex flex-1">
            <Image
              src="/images/macarons.webp"
              alt="Macarons"
              fill
              className="absolute -z-10 object-cover"
            />

            <div className="flex flex-col gap-5 p-5 text-white sm:p-15">
              <h2 className="text-center text-5xl sm:text-7xl lg:text-left">
                Desserts
              </h2>
              <p className="text-center lg:text-left">
                It begins with Greek Yogurt. Triple strained to be thick and
                creamy. Made the old-world way, locally sourced and
                authentically crafted. Perfect for small-spoon eating or
                big-spoon cooking.
              </p>

              <div>
                <Button variant="secondary" size="lg">
                  View recipes
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[calc(100vh-12rem)] w-full">
          <Image
            src="/images/aperol-drink.webp"
            alt="Aperol drink"
            fill
            className="absolute -z-10 object-cover"
          />

          <div className="flex flex-col gap-5 p-5 text-gray-800 sm:p-15 lg:w-[40%]">
            <h2 className="text-center text-5xl sm:text-7xl lg:text-left">
              Sides
            </h2>
            <p className="text-center lg:text-left">
              It begins with Greek Yogurt. Triple strained to be thick and
              creamy. Made the old-world way, locally sourced and authentically
              crafted. Perfect for small-spoon eating or big-spoon cooking.
            </p>

            <div>
              <Button variant="default" size="lg" className="hover:opacity-80">
                View recipes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
