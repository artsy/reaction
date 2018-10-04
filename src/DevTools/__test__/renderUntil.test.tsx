import * as React from "react"
import { Responsive } from "Utils/Responsive"
import { MockBoot } from "../MockBoot"
import { renderUntil } from "../renderUntil"

class Component extends React.Component {
  state = {
    data: "Loading",
  }

  componentDidMount() {
    this.setState(
      {
        data: "Loading",
      },
      () =>
        setImmediate(() => {
          this.setState({ data: "ohai" })
        })
    )
  }

  render() {
    return (
      <div>
        {this.state.data}
        {this.state.data !== "Loading" && this.props.children}
      </div>
    )
  }
}

describe("renderUntil", () => {
  it("yields an enzyme wrapper to the `until` block until it returns true", async () => {
    const states = []
    await renderUntil(wrapper => {
      const text = wrapper.find("div").text()
      states.push(text)
      return text !== "Loading"
    }, <Component />)
    expect(states).toEqual(["Loading", "ohai"])
  })

  it("resolves the promise with an enzyme wrapper with the final state", async () => {
    const tree = await renderUntil(
      wrapper => wrapper.find("div").text() !== "Loading",
      <Component />
    )
    expect(tree.find("div").text()).toEqual("ohai")
  })

  it("plays well with the Responsive component", async () => {
    const tree = await renderUntil(
      wrapper => wrapper.find(Component).text() !== "Loading",
      <MockBoot breakpoint="xs">
        <Component>
          <Responsive>
            {({ xs }) => xs && <span>Such response</span>}
          </Responsive>
        </Component>
      </MockBoot>
    )
    expect(tree.find("span").text()).toEqual("Such response")
  })

  // TODO: Whatever way I try to test this, it just doesn’t work as expected.
  // it("rejects the promise when a render error occurs", () => {
  //   return renderUntil(wrapper => {
  //     setImmediate(() => {
  //       wrapper
  //         .find(Component)
  //         .first()
  //         .simulateError(new Error("ohnoes"))
  //     })
  //     return false
  //   }, <Component />).then(wrapper => {
  //     expect(wrapper.find("div").text()).toEqual("ohai")
  //   })
  // })
})
