import { Box, color } from "@artsy/palette"
import Input from "Components/Input"
import React from "react"
import styled from "styled-components"

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  border: none;
  margin-top: -14px;
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background: none;
  padding: 0;

  :focus {
    background: ${color("purple100")};
    border-radius: 50%;

    svg > path {
      fill: ${color("white100")};
    }
  }
`

export const SearchInputContainer: React.ExoticComponent<
  any
> = React.forwardRef((props, ref) => {
  return (
    <Box style={{ position: "relative" }}>
      <Input ref={ref} style={{ width: "100%" }} {...props} />
      <SearchButton>
        <svg
          width="18"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "relative", top: 3 }}
        >
          <title>search</title>
          <path
            d="M11.5 3a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0-1A4.5 4.5 0 1 0 16 6.5 4.49 4.49 0 0 0 11.5 2zM9.442 9.525l-.88-.88L2.06 15.06l.88.88 6.502-6.415z"
            fill="#000"
            fillRule="nonzero"
          />
        </svg>
      </SearchButton>
    </Box>
  )
})
