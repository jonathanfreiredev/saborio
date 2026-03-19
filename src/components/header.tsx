import { auth } from "~/server/better-auth";
import { LoginButton } from "./login-button";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toogle";
import { headers } from "next/headers";
import Link from "next/link";
import { SignOutButton } from "./signout-button";

export async function Header() {
  const session = await auth.api.getSession({ headers: await headers() });

  const isLoggedIn = !!session?.session;

  return (
    <header className="h-24 px-4">
      <div className="flex h-full w-full items-center justify-between">
        <Link href="/" passHref className="h-full">
          <h1 className="relative h-full w-40">
            <Logo />
          </h1>
        </Link>

        <div className="flex items-end gap-2">
          {isLoggedIn && (
            <div className="flex flex-col items-end">
              <p className="text-sm font-medium">{session.user.name}</p>
              <p className="text-xs text-gray-500">{session.user.email}</p>
            </div>
          )}
          <ModeToggle size="icon-lg" />
          {!isLoggedIn ? <LoginButton /> : <SignOutButton />}
        </div>
      </div>
    </header>
  );
}
