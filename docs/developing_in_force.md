# Developing in force

Often in development you'll want to link the development version of reaction into force.
Traditionally one would use `yarn link` in reaction and `yarn link @artsy/reaction` in a service like force
to achieve this. Unfortunately, this mechanism is prone to a lot of issues. Below is a guide for a smoother
linking experience.

## Setup

If you haven't already, install the dependencies for reaction.

```
yarn --check-files
```

## Development

Use yarn to kick off the force development process.

```
yarn integrate force
```

This command will build and compile reaction, publish it locally so it can be used
in other places, link it into force for you, and then start reaction and force in watch mode.

This _assumes_ force is a sibling directory of reaction. If it's not you can use the following
setup instead.

```
PROJECT_PATH=path/to/force yarn integrate
```

If you need to attach force to a debugger, use the `ENABLE_DEBUGGER` command as follows

```
ENABLE_DEBUGGER=true yarn integrate force
```
