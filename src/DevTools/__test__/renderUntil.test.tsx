import * as React from "react"
import { renderUntil } from "../renderUntil"

class Component extends React.Component {
  state = {
    data: "Loading",
  }

  componentDidMount() {
    setImmediate(() => {
      this.setState({ data: "ohai" })
    })
  }

  render() {
    return <div>{this.state.data}</div>
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
