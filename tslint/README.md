## Steps to adding a custom TSLint rule

1.  Make a new file, the name is important, it must be camel-case and not a `.ts` file (the `@ts-check` declaration at the top of each file uses JSDoc to check types while developing rules – [read here](https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files) for more info).
1.  You will need to convert your camelCase name to kebab-case and add it to the [`tslint.json`](../tslint.json)

    E.g. `noDoingAnythingRule.js` -> `no-doing-anything` and:

    ```diff
    {
      "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
      "rules": {
        "no-import-un-mocked": true,
    +    "no-doing-anything": true,
        "curly": false,
        ...
    ```

1.  You want to export a class called `Rule` that lints your file, this is what it used on the file.
1.  Ideally you can do simple string matching like in [`noImportUnMockedRule.js`](./noImportUnMockedRule.js) - but if not, study how to make an [AST walker here](https://palantir.github.io/tslint/develop/custom-rules/)
