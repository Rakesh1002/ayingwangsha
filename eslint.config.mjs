import coreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".open-next/**",
      ".wrangler/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "cloudflare-env.d.ts",
    ],
  },
  ...coreWebVitals,
];

export default eslintConfig;
