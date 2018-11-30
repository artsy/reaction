// Configuration for the vscode-apollo extension.
module.exports = {
  client: {
    service: {
      name: "local",
      localSchemaFile: "data/schema.graphql",
    },
    includes: ["src/**/*.{ts,tsx,graphql}"],
    excludes: ["**/node_modules", "**/__tests__"],
    tagName: "graphql",
  },
}
