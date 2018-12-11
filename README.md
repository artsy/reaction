          :::::::::  ::::::::::     :::      :::::::: ::::::::::: ::::::::::: ::::::::  ::::    :::
         :+:    :+: :+:          :+: :+:   :+:    :+:    :+:         :+:    :+:    :+: :+:+:   :+:
        +:+    +:+ +:+         +:+   +:+  +:+           +:+         +:+    +:+    +:+ :+:+:+  +:+
       +#++:++#:  +#++:++#   +#++:++#++: +#+           +#+         +#+    +#+    +:+ +#+ +:+ +#+
      +#+    +#+ +#+        +#+     +#+ +#+           +#+         +#+    +#+    +#+ +#+  +#+#+#
     #+#    #+# #+#        #+#     #+# #+#    #+#    #+#         #+#    #+#    #+# #+#   #+#+#
    ###    ### ########## ###     ###  ########     ###     ########### ########  ###    ####

## Meta

- **State:** development
- **Demo:** <https://artsy.github.io/reaction>
- **CI:** [![CircleCI](https://circleci.com/gh/artsy/reaction.svg?style=shield)](https://circleci.com/gh/artsy/reaction)
- **NPM:** [![npm version](https://badge.fury.io/js/%40artsy%2Freaction.svg)](https://www.npmjs.com/package/@artsy/reaction)
- **Point People:** [@alloy](https://github.com/alloy), [@l2succes](https://github.com/l2succes) & [@damassi](https://github.com/damassi)

## Installation

    $ git clone --recursive https://github.com/artsy/reaction.git
    $ cd reaction
    $ npm install -g yarn
    $ yarn install
    $ brew install watchman (If you don't already have Homebrew, go here for installation instructions: https://brew.sh/)
    $ cp .env.oss .env

## Instructions

- Development of components happen in [storybooks](https://getstorybook.io):

        $ yarn start
        $ open http://localhost:9001/

- Run the tests:

        $ yarn test

- Run the tests continuously (or use `vscode-jest`):

        $ yarn test -- --watch

- In vscode, run the `TypeScript: Run type-checker` task and open the `PROBLEMS` view to see continuous type-checker
  results.

- After updating components, be sure to deploy a new demo (sharing is caring!):

        $ yarn deploy-storybook

- When using new changes in metaphysics’ schema, be sure to update the local schema copy:

        $ yarn sync-schema

* There are some suggested VSCode extensions in `.vscode/extensions.json` and additional docs at [docs/vscode.md](docs/vscode.md).

## Linking and Unlinking with Force

To _link_ your local reaction with your local force, run:

        $ yarn link && yarn watch
        (wait until you see a message that X files have been successfully compiled before moving on)

        $ cd ../force && yarn link @artsy/reaction && yarn start

To _unlink_ your local reaction from your local force, run (in **Force**):

        $ yarn unlink @artsy/reaction
        $ yarn add @artsy/reaction
        $ yarn start

## Commits and Deployments

Circle CI is set up to publish releases to NPM automatically via [semantic-release](https://github.com/semantic-release/semantic-release) following every successful merge to master.

Release versions (major, minor, patch) are triggered [by commit messages](https://github.com/semantic-release/semantic-release#commit-message-format), when they adhere to [Ember conventions](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-ember/README.md):

```
[TAG context] commit message
```

[Valid tags](https://github.com/artsy/reaction/blob/master/package.json#L175) for release include PATCH, DOC, FIX (patch), FEATURE (minor), and BREAKING (major). A context is also required (note that this should be one word). Commits that do not adhere to this convention will not trigger an NPM release.

##### Example Patch Release

```
[FIX onboarding] Modal does not open
[PATCH tooling] Bump version
```

##### Example Minor (Feature) Release

```
[FEATURE auctions] Add relay-based slider component
```

##### Example Major (Breaking) Release

```
[BREAKING publishing] Replace children with props for caption editing
```

### Troubleshooting Semantic Release

> npm ERR! You cannot publish over the previously published versions

This race condition can happen when multiple PRs are published at the same time, leading to a discrepency between the tag representing the latest release and the version that's currently published to NPM. There are two possible ways to fix this:

1) Update `package.json` with the next patch version, save, and then run `yarn publish --access public` from the command line. Return to CircleCI and rerun failing build. 
1) Create a [new release](https://github.com/artsy/reaction/releases/new) and ensure the `Tag version` is incremented one patch version higher than the previous release. Then navigate to CircleCI and rerun the failing build. 

## Emitting types

We recently started shipping Reaction builds with declaration files (`.d.ts`) so consumers have access to the interfaces and types we add to our components. Because of that, you will notice errors resembling the following:

```typescript
src/Components/Forms/OrderForm/App.tsx:63:14 - error TS4023: Exported variable 'StyledTitle' has or is using name 'TitleProps' from external module "/Users/lucsucces/Projects/reaction/src/Components/Title" but cannot be named.

63 export const StyledTitle = styled(Title)`
                ~~~~~~~~~~~
```

What that error essentially means because you are exporting `StyledTitle`, the interface `TitleProps` also needs to be exported. You can learn more about declarations files [here](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

##### Exporting interfaces

This also affects a bit how we declare our interfaces. Instead using a private `Props` interface as we've been doing

```typescript
interface Props {
  ...
}

export class Icon extends Component<Props> {
  ...
}
```

you should write that instead

```typescript
export interface IconProps {
  ...
}

export class Icon extends Component<IconProps> {
  ...
}
```

The more descriptive interface name (`IconProps`) will get more useful error messages from the compiler when something goes wrong,
and it's clearer which interface is being referred to in type defintion files.
