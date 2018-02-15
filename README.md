          :::::::::  ::::::::::     :::      :::::::: ::::::::::: ::::::::::: ::::::::  ::::    :::
         :+:    :+: :+:          :+: :+:   :+:    :+:    :+:         :+:    :+:    :+: :+:+:   :+:
        +:+    +:+ +:+         +:+   +:+  +:+           +:+         +:+    +:+    +:+ :+:+:+  +:+
       +#++:++#:  +#++:++#   +#++:++#++: +#+           +#+         +#+    +#+    +:+ +#+ +:+ +#+
      +#+    +#+ +#+        +#+     +#+ +#+           +#+         +#+    +#+    +#+ +#+  +#+#+#
     #+#    #+# #+#        #+#     #+# #+#    #+#    #+#         #+#    #+#    #+# #+#   #+#+#
    ###    ### ########## ###     ###  ########     ###     ########### ########  ###    ####

## Meta

-   **State:** development
-   **Demo:** <https://artsy.github.io/reaction>
-   **CI:** [![CircleCI](https://circleci.com/gh/artsy/reaction.svg?style=shield)](https://circleci.com/gh/artsy/reaction)
-   **Point People:** [@alloy](https://github.com/alloy) & [@l2succes](https://github.com/l2succes)

## Installation

    $ git clone --recursive https://github.com/artsy/reaction.git
    $ cd reaction
    $ npm install -g yarn
    $ yarn install
    $ cp .env.oss .env

## Instructions

-   Development of components happen in [storybooks](https://getstorybook.io):

          $ yarn start
          $ open http://localhost:9001/

-   Run the tests:

          $ yarn test

-   Run the tests continuously (or use `vscode-jest`):

          $ yarn test -- --watch

-   In vscode, run the `TypeScript: Run type-checker` task and open the `PROBLEMS` view to see continuous type-checker
    results.

-   After updating components, be sure to deploy a new demo (sharing is caring!):

          $ yarn deploy-storybook

-   When using new changes in metaphysics’ schema, be sure to update the local schema copy:

          $ yarn sync-schema


-   There are some suggested VSCode extensions in `.vscode/extensions.json` and additional docs at [docs/vscode.md](docs/vscode.md).

## Commits and Deployments

Circle CI is set up to publish releases to NPM automatically via [semantic-release](https://github.com/semantic-release/semantic-release) following every successful merge to master.

Release versions (Major, minor, patch) are determined [based on commit messages](https://github.com/semantic-release/semantic-release#commit-message-format), which must adhere to [Angular conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits). All commits must include a header, which consists of a type, scope and subject.  Optionally a body and footer can be included.  Breaking changes AKA major releases must include a line starting with the text `BREAKING CHANGE: ` followed by a description of changes.

##### Example Patch Release
```
style(onboarding): increase plus-button size
```

##### Example Minor (Feature) Release
```
feat(auctions): relay-based slider component
<BLANK LINE>
adds slider of artwork lots to replace existing backbone rails
```


##### Example Major (Breaking) Release
```
refactor(publishing): editable image captions
<BLANK LINE>
change images to accept editable components as props and not children
<BLANK LINE>
BREAKING CHANGE: removes support for children in image caption. Use props to add editable captions instead.
```
