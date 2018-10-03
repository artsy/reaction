import { mount, ReactWrapper } from "enzyme"
import * as React from "react"

class ErrorBoundary extends React.Component<{ onError: (error) => void }> {
  state = {
    errorOccurred: false,
  }

  componentDidCatch(error, info) {
    this.setState({ errorOccurred: true }, () => {
      this.props.onError(error)
    })
  }

  render() {
    if (this.state.errorOccurred) {
      return null
    }
    return this.props.children
  }
}

export type RenderUntilCallback<
  P = {},
  S = {},
  C extends React.Component = React.Component
> = (wrapper: ReactWrapper<P, S, C>) => boolean

/**
 * Continuously checks an asynchronously rendered tree until it is considered
 * done, as per the provided callback.
 * 
 * @param until
 * A callback that is used to test wether rendering should be considered
 * finished. This is a regular enzyme wrapper.
 *
 * @param element
 * The tree to render.
 *
 * @returns
 * A promise that will resolve with an enzyme wrapper containing the rendered
 * tree.
 *
 * @example
 *
   ```tsx
   class Component extends React.Component {
     state = {
       data: "Loading",
     }
  
     // After mounting and the initial render, trigger another render with data.
     componentDidMount() {
       setImmediate(() => {
         this.setState({ data: "ohai" })
       })
     }
  
     render() {
       return <div>{this.state.data}</div>
     }
   }
   
   it("resolves the promise with an enzyme wrapper with the final state", async () => {
     const tree = await renderUntil(
       wrapper => wrapper.find("div").text() !== "Loading",
       <Component />
     )
     expect(tree.find("div").text()).toEqual("ohai")
   })
   ```
 *
 */
export function renderUntil<
  P = {},
  S = {},
  C extends React.Component = React.Component
>(until: RenderUntilCallback<P, S, C>, element: React.ReactElement<P>) {
  return new Promise<ReactWrapper<P, S, C>>((resolve, reject) => {
    /**
     * In case of an uncaught error, be sure to reject the promise ASAP and
     * with a helpful error.
     */
    const tree = mount<C, P, S>(
      <ErrorBoundary onError={reject}>{element}</ErrorBoundary>
    )
    /**
     * Continuously lets JS/React continue doing its async work and then check
     * if the sentinel selector matches any elements, in which case the tree
     * is ready to be recorded.
     */
    const wait = () => {
      if (until(tree)) {
        resolve(tree)
      } else {
        setImmediate(() => {
          /**
           * Except for after the initial render, we need to make sure the
           * tree gets re-rendered to reflect any changes caused by props or
           * state changes.
           */
          tree.update()
          wait()
        })
      }
    }
    /**
     * Start recursive waiting process.
     */
    wait()
  })
}
