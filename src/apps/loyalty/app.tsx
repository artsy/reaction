import * as React from "react"
import * as ReactDOM from "react-dom"

import Login from "./containers/login"

class App extends React.Component<any, any> {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

export default App
