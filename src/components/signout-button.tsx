"use client";

import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "~/server/better-auth/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignOutButton = ({
  variant = "destructive",
  size = "lg",
}: VariantProps<typeof buttonVariants>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={async () => {
        setIsSubmitting(true);
        await signOut();
        router.refresh();
        setIsSubmitting(false);
      }}
      disabled={isSubmitting}
    >
      Sign Out
    </Button>
  );
};
