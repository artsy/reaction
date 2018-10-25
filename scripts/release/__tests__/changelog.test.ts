import { existsSync } from "fs"
import {
  Changelog,
  CHANGELOG_PATH,
  formatChangelog,
  updateChangelogWithRelease,
} from "../changelog"

const MockChangelog: Changelog = {
  title: "Changelog",
  description: "An example changelog",
  versions: [
    {
      title: "master",
      body: "- Some unreleased changes here",
      version: null,
    },
    {
      title: "v1.1.0",
      body: "- Did some things",
      version: "1.1.0",
    },
  ],
}

describe("changelog", () => {
  it("should exist in the configured path", () => {
    expect(existsSync(CHANGELOG_PATH)).toBeTruthy()
  })

  describe("formatChangelog", () => {
    it("should return a markdown version of the changelog object", () => {
      // Clean up the string so we don't have to worry about whitespace
      const result = formatChangelog(MockChangelog)

      expect(result).toMatchInlineSnapshot(`
"# Changelog

An example changelog

## master

- Some unreleased changes here

## v1.1.0

- Did some things"
`)
    })
  })

  describe("updateChangelogWithRelease", () => {
    it("should update the changelog to have the given release", () => {
      const result = updateChangelogWithRelease(MockChangelog, "1.2.0")

      expect(result).toMatchInlineSnapshot(`
"# Changelog

An example changelog

## master

## v1.2.0

- Some unreleased changes here

## v1.1.0

- Did some things"
`)
    })
  })
})
