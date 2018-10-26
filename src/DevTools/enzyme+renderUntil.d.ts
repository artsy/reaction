import { ReactWrapper } from "enzyme"
import * as React from "react"

declare module "enzyme" {
  export type RenderUntilCallback<P = {}, S = {}, C = React.Component> = (
    wrapper: ReactWrapper<P, S, C>
  ) => boolean

  export interface ReactWrapper<P = {}, S = {}, C = React.Component> {
    /**
     * Continuously checks an asynchronously rendered tree until it is considered
     * done, as per the provided callback.
     * 
     * @param until
     * A callback that is used to test wether rendering should be considered
     * finished. This is a regular enzyme wrapper.
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
        const wrapper = await mount(<Component />).renderUntil(
          n => n.find("div").text() !== "Loading"
        )
        expect(wrapper.find("div").text()).toEqual("ohai")
      })
      ```
    *
    */
    renderUntil(
      until: RenderUntilCallback<P, S, C>
    ): Promise<ReactWrapper<P, S, C>>
  }
}
