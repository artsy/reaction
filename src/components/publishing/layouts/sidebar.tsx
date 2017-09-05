import React from "react"
import styled from "styled-components"
import { pMedia } from "../../helpers"

const Sidebar: React.SFC<React.HTMLProps<HTMLDivElement>> = props => {
  return (
    <SidebarContainer>
      {props.children}
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${pMedia.md`
    display: none;
  `}
`

export default Sidebar
