"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "~/server/better-auth/client";
import { Button, buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const LoginButton = ({
  variant = "outline",
  size = "lg",
}: VariantProps<typeof buttonVariants>) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    await signIn.email({
      ...data,
      rememberMe: true,
      fetchOptions: {
        onSuccess() {
          toast.success("Logged in successfully!", {
            description: "Welcome back to Saborio.",
            position: "bottom-right",
          });
          form.reset();
          setOpen(false);

          router.replace("/");
          router.refresh();
        },
        onError(error) {
          toast.error("Failed to log in!", {
            description: error.error.message,
            position: "bottom-right",
          });
        },
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className="tracking-wide">
          Sign in
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>
            Enter your email and password to sign in to your account.
          </DialogDescription>
        </DialogHeader>
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet className="mb-5 w-full">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="jonathan@example.com"
                      required
                    />
                    <FieldDescription>
                      Choose a unique email for your account.
                    </FieldDescription>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="off"
                      required
                    />
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <DialogFooter>
            <Field>
              <div className="mb-4 flex gap-4">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => form.reset()}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  form="form-login"
                  className="flex-1"
                  disabled={form.formState.isSubmitting}
                >
                  Save changes
                </Button>
              </div>

              {!pathname.includes("/signup") && (
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">
                    <Button
                      variant="link"
                      onClick={() => {
                        setOpen(false);
                        form.reset();
                      }}
                      disabled={form.formState.isSubmitting}
                    >
                      Sign up
                    </Button>
                  </Link>
                </FieldDescription>
              )}
            </Field>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
