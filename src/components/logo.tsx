"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Logo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <h1 className="relative h-full w-40">
      {mounted && (
        <Image
          src={theme === "dark" ? "/logo-light.png" : "/logo-dark.png"}
          alt="Logo"
          className="h-auto object-cover"
          fill
        />
      )}
    </h1>
  );
};
