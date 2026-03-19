"use client";
import { useTheme } from "next-themes";
import Image from "next/image";

export const Logo = () => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? "/logo-light.png" : "/logo-dark.png"}
      alt="Logo"
      className="h-auto object-cover"
      fill
    />
  );
};
