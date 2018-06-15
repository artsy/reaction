import React from "react"
import styled from "styled-components"
import { space, SpaceProps, themeGet } from "styled-system"

const HR = styled.div.attrs<SpaceProps>({})`
  ${space};
  border-top: 1px solid ${themeGet("colors.black10")};
  width: 100%;
`

export class Separator extends React.Component {
  render() {
    return <HR mb={2} />
  }
}
