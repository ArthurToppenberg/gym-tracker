import path from "path";
import { fileURLToPath } from "url";
import createJiti from "jiti";

// Get the current file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = path.dirname(__filename);

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
createJiti(__filename)("../../packages/env/src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
};

export default config;
