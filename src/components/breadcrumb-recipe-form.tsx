import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

interface BreadcrumbRecipeFormProps {
  recipeSlug: string;
  step: "details" | "ingredients" | "steps";
}

export function BreadcrumbRecipeForm({
  recipeSlug,
  step,
}: BreadcrumbRecipeFormProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            asChild
            className={step === "details" ? "font-bold" : ""}
          >
            <Link href={`/recipes/${recipeSlug}/update`}>Details</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {(step === "ingredients" || step === "steps") && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className={step === "ingredients" ? "font-bold" : ""}
              >
                <Link href={`/recipes/${recipeSlug}/update/ingredients`}>
                  Ingredients
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}

        {step === "steps" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className={step === "steps" ? "font-bold" : ""}
              >
                <Link href={`/recipes/${recipeSlug}/update/steps`}>Steps</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
