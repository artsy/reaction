import * as React from "react"
import styled from "styled-components"

interface SidebarProps {
  article?: any
}

const Sidebar: React.SFC<SidebarProps> = props => {
  return <SidebarContainer />
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 360px;
  width: 100%;
`
export default Sidebar
