import path from "path";
import type { PrismaConfig } from "prisma";

import { env as _env } from "@gym/env";

export default {
  /**
   * Whether features with an unstable API are enabled.
   */
  earlyAccess: true,

  /**
   * The path to the Prisma schema file.
   */
  schema: path.join("prisma"),
} satisfies PrismaConfig;