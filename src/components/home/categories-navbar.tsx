"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const categories = [
  { name: "explore", href: "/" },
  { name: "mains", href: "/?category=mains" },
  { name: "desserts", href: "/?category=desserts" },
  { name: "drinks", href: "/?category=drinks" },
  { name: "sides", href: "/?category=sides" },
  { name: "everything", href: "/?category=everything" },
];

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export function CategoriesNavbar() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "explore";

  return (
    <div className="h-12 border-b bg-zinc-100 sm:h-20">
      <div className="no-scrollbar flex h-full overflow-x-auto px-2">
        {categories.map((cat) => {
          const isActive = currentCategory === cat.name;

          return (
            <Link
              key={cat.name}
              href={cat.href}
              className={`flex h-full items-center px-4 text-sm whitespace-nowrap sm:text-base ${
                isActive
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              <p className="text-center">{capitalize(cat.name)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
