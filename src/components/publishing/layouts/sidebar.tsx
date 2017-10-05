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
  margin: -63px 0 0 60px;
  min-width: 300px;
  ${pMedia.md`
    display: none;
  `}
`

export default Sidebar
