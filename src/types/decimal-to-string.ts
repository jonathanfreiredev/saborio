import type { Prisma } from "generated/prisma/client";

export type DecimalToString<T> = {
  [K in keyof T]: T[K] extends Prisma.Decimal
    ? string
    : T[K] extends object
      ? DecimalToString<T[K]>
      : T[K];
};
