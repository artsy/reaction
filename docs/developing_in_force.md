# Developing in force

Often in development you'll to link the development version of reaction into force.
Traditionally one would use `yarn link` in reaction and `yarn link @artsy/reaction` in a service like force
to acheive this. Unfortunately, this mechanism is prone to a lot of issues. Below is a guide for a smoother
linking experience.

## Setup

If you haven't already, install the dependencies for reaction.

```
yarn --check-files
```

## Development

Use yarn to kick off the force development process.

```
yarn dev-force
```

This command will build and compile reaction, publish it locally so it can be used
in other places, link it into force for you, and then start reaction in watch mode.

_Note:_ for this process to work force _must_ be in a sibling directory of reaction and
be named `force`.
