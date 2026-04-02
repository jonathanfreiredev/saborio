import Link from "next/link";
import { getSession } from "~/server/better-auth/server";
import { DropdownAvatarMenu } from "./dropdown-avatar-menu";
import { Logo } from "./logo";
import { SidebarDrawer } from "./sidebar-drawer";
import { SignInOrSignUpButton } from "./auth/sign-in-or-sign-up-button";
import AIAgentChat from "./ai-chat/ai-agent-chat";
import { api } from "~/trpc/server";

export async function Header() {
  const session = await getSession();

  const isLoggedIn = !!session?.session;

  let chatId = null;

  if (isLoggedIn) {
    const chat = await api.aiChat.getChatId();

    chatId = chat.chatId;
  }

  return (
    <header className="h-24 px-6">
      <div className="flex h-full w-full items-center justify-between">
        <Link href="/" passHref className="h-full">
          <h1 className="relative h-full w-40">
            <Logo />
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex">
            {isLoggedIn ? (
              <DropdownAvatarMenu user={{ name: session.user.name }} />
            ) : (
              <SignInOrSignUpButton />
            )}
          </div>

          <div className="flex sm:hidden">
            <SidebarDrawer isLoggedIn={isLoggedIn} />
          </div>

          {!!isLoggedIn && (
            <AIAgentChat userId={session.user.id} chatId={chatId} />
          )}
        </div>
      </div>
    </header>
  );
}
