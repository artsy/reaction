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

          $ yarn storybook
          $ open http://localhost:9001/

-   To run the node server and browse available apps:

          $ yarn start
          $ open http://localhost:3000/

-   Run the tests:

          $ yarn test

-   Run the tests continuously (or use `vscode-jest`):

          $ yarn test -- --watch

-   In vscode, run the `TypeScript: Run type-checker` task and open the `PROBLEMS` view to see continuous type-checker
    results.

-   After updating components, be sure to deploy a new demo (sharing is caring!):

          $ yarn deploy-storybook

-   After updating a Relay query fragment, be sure to update the typings for it:

          $ yarn relay2ts

-   When using new changes in metaphysics’ schema, be sure to update the local schema copy:

          $ yarn sync-schema


-   There are some suggested VSCode extensions in `.vscode/extensions.json` and additional docs at [docs/vscode.md](docs/vscode.md).

## Deployments

Circle CI is set up to publish reaction-force in a consistent and reliable way. To update the package version and deploy it on NPM.

    $ npm version <new_version>
    $ git push --follow-tags

The package.json file will be updated and a commit staged. When a tag is pushed to `master`, Circle CI will publish to NPM. See [circle.yml](https://circleci.com/docs/1.0/npm-continuous-deployment/) and the [npm docs](https://docs.npmjs.com/getting-started/publishing-npm-packages).
