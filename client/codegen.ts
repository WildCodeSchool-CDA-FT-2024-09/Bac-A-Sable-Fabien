import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: import.meta.env.VITE_API_URL,
  documents: ["src/schema/*.ts"],
  generates: {
    "./src/generated/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "named-operations-object",
      ],
      config: {
        withHooks: true,
      },
    },
  },
  overwrite: true,
};

export default config;
