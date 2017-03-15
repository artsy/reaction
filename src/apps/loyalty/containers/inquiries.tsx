import * as React from "react"

import Button from "../../../components/buttons/inverted"
import Nav from "../../../components/nav"
import NavItem from "../../../components/nav_item"
import TextArea from "../../../components/text_area"
import Title from "../../../components/title"

class Inquiries extends React.Component<any, any> {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <Nav>
          <NavItem href="https://www.artsy.net">Back To Artsy</NavItem>
        </Nav>
        <Title>Please select all works your purchased</Title>
        <footer style={{maxWidth: 500, margin: "10px auto"}}>
          <Title titleSize="small">If you purchased any works not listed above, please list them.</Title>
          <TextArea block placeholder="Artwork, Artist, Gallery" />
          <Button block>Submit purchases</Button>
        </footer>
      </div>
    )
  }
}

export default Inquiries
