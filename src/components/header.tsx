import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toogle";
import { Logo } from "./logo";

export const Header = async () => {
  return (
    <header className="h-24 px-4">
      <div className="flex h-full w-full items-center justify-between">
        <Logo />

        <div className="flex items-center gap-2">
          <ModeToggle size="icon-lg" />
          <Button variant="outline" size="lg" className="tracking-wide">
            Sign in
          </Button>
        </div>
      </div>
    </header>
  );
};
