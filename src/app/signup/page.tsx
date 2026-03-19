import { headers } from "next/headers";
import { SignupForm } from "~/components/signup-form";
import { auth } from "~/server/better-auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  const isLoggedIn = !!session?.session;

  if (isLoggedIn) {
    redirect("/");
  }

  return (
    <main className="">
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <SignupForm />
      </div>
    </main>
  );
}
