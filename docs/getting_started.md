# How do I work in Reaction?

We're going to take a component, and make it fit inside Reaction. This doc is based
on [this PR](https://github.com/artsy/reaction-force/pull/176).

## Running Reaction inside Force

Instructions for running Reaction within Force are in [the Force repo](https://github.com/artsy/force/blob/master/CONTRIBUTING.md#real-time-development-with-reaction).

## Simple

```jsx
import React, { Component } from "react"

class IconImageSet extends Component {
  render() {
    return (
      <svg
        id="imageset"
        data-name="imageset"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 44 44"
      >
        <path
          d="M6760.67,551.72h-32v-32h32v32Zm-30-2h28v-28h-28v28Z"
          transform="translate(-6728.67 -507.72)"
        />
        <polygon points="38 37 36 37 36 8 7 8 7 6 38 6 38 37" />
        <polygon points="44 31 42 31 42 2 13 2 13 0 44 0 44 31" />
      </svg>
    )
  }
}
export default IconImageSet
```

This is a component which returns an SVG. To move this into Reaction force, you'll need to find a place to put it.

It should go somewhere inside `src/components/` - but it will need to be a `.tsx` file. So for now, let's imagine it is
in `src/components/icon/image_set.tsx`. Make the file and paste the contents in.

Doing this will cause a compiler error. Welcome to TypeScript-land.

```sh
class IconImageSet extends Component {
                              ~~~~~~~~~

src/components/icon/image_set.tsx(3,28): error TS2314: Generic type 'Component<P, S>' requires 2 type argument(s).
```

So, this is the major difference between TypeScript React, and JavaScript React. What this error tells you is that a
React Component is a [generic class](https://www.typescriptlang.org/docs/handbook/generics.html) in TypeScript. Simply put,
to create a component you _need_ to define the props and state for it in the declaration [via interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html).

An interface is a way of defining the shape of a JavaScript object. If you want to skip on this today, you can just
change the code to be this: `class IconImageSet extends Component<any, any> {`. Which says `any` props, and `any` state.

If you do care about adding some of the types, we do this for better tooling and improved safety, this is a contrived
example of defining your props and state:

```ts
interface Props {
  width: number
  height: number
  color: string
}

interface State {
  appliedColors: boolean
}

class IconImageSet extends Component<Props, State> {
```

If you don't have state at all, write `null` instead in the second argument: `Component<Props, null>`. That's your
compiler errors sorted, so your component is working. Next, you want to preview it in Force by using `yarn link`.

#### Testing with Jest

We write our tests in Jest, we also co-locate tests in the same folder structure as your code. Tests live inside a `__tests__`
folder, and need to have `.test.ts` inside the name. So in this case, the test file would be `src/components/icon/__tests__`
and `icon_image_set.test.tsx`.

There are two main ways to write tests for your code in Reaction Force:

- [Jest Snapshots](https://facebook.github.io/jest/docs/snapshot-testing.html) as a way of ensuring any changes to
  our component trees are explicit. It provides a really easy way to "lock" a snapshot of a JSON object (like a rendered
  react tree) into the file-system. These snapshots are included in the git repo, and CI will compare that the same process
  makes the same JSON object.

  Any individual component is probably worth converting into a jest snapshot.

  ```js
  import React from "react"
  import renderer from "react-test-renderer"

  import IconImageSet from "../icon/image_set"

  it("renders properly", () => {
    const icon = renderer.create(<IconImageSet />).toJSON()
    expect(icon).toMatchSnapshot()
  })
  ```

- Behavior Testing, which are common unit tests. A react Component tends to be a class, so you can instantiate the class
  and run expectations against that object. I'm going to include some tests from Emission as an example:

  ```tsx
  import Artist from "../artist"

  const emptyProps = { navigator: {} as any, route: {} as any }

  describe("callbacks", () => {
    it("calls pop when done is tapped", () => {
      const navigator: any = { pop: jest.fn() }
      const artist = new Artist({ navigator, route: {} })
      artist.doneTapped()
      expect(navigator.pop).toHaveBeenCalled()
    })

    it("calls nav.pop & updateWithResult when a result is tapped", () => {
      const navigator: any = { pop: jest.fn() }
      const updateWithResult = jest.fn()
      const artist = new Artist({ navigator, route: {}, updateWithResult })

      artist.artistSelected({} as any)

      expect(navigator.pop).toHaveBeenCalled()
      expect(updateWithResult).toHaveBeenCalled()
    })
  })

  describe("state", () => {
    it("is set up with empty state", () => {
      const artist = new Artist(emptyProps)
      expect(artist.state).toEqual({
        query: null,
        searching: false,
        results: null,
      })
    })

    it("sets new state when text is changed", () => {
      const artist = new Artist(emptyProps)
      artist.setState = jest.fn()
      artist.searchForQuery = jest.fn()

      artist.textChanged("Blu")

      expect(artist.setState).toHaveBeenCalledWith({
        query: "Blu",
        searching: true,
      })
      expect(artist.searchForQuery).toHaveBeenCalledWith("Blu")
    })
  })
  ```

  There are a lot of techniques being used here:

  - Telling TypeScript you don't care about the types for an object by using `as any` and `: any`.
  - Using `jest.fn()` to create a mock function, then checking what calls it via `toHaveBeenCalledWith` or `toHaveBeenCalled`.

You can run tests via `yarn jest`, jest has an awesome watcher mode via `yarn jest -- --watch` which will run all tests
when you press save.

# Relay?

Optional. If you want to re-use component which use Relay internally, you'll see that the files export both the `Relay.Container` and
and normal React component. You can re-use the component by using `import { ComponentName } from "./component"` instead of
the default return which is a Relay'd version. This only works for the leaf node in a Relay component tree though.

# Additional reading

- https://www.typescriptlang.org
- https://github.com/basarat/typescript-book
