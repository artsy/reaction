import * as React from "react"
import * as ReactDOM from "react-dom"

class App extends React.Component<any, any> {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

export default App
