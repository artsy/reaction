import React from "react"
import styled from "styled-components"
import { Author } from "./Author"

interface AuthorsProps {
  authors: Array<object>
}

export const Authors: React.SFC<AuthorsProps> = props => {
  const { authors } = props
  return <AuthorsContainer>{authors.map((author, i) => <Author author={author} key={i} />)}</AuthorsContainer>
}
const AuthorsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
