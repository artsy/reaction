import { existsSync } from "fs"
import { GIT_PROJECT_PATH } from "../git"

describe("git", () => {
  it("should exist in the configured path", () => {
    expect(existsSync(GIT_PROJECT_PATH)).toBeTruthy()
  })
})
