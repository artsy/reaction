import { useContext } from "react"
import { NavbarContext } from "../NavBar"

export function useTracking() {
  const { tracking, Schema } = useContext(NavbarContext)

  return {
    tracking,
    Schema,
  }
}
