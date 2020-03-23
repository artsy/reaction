import { artistConsignmentFixture } from "Apps/__tests__/Fixtures/Artist/Routes/ConsignRouteFixture"
import { getConsignmentData } from "../getConsignmentData"

describe("getConsignmentData", () => {
  it("returns undefined if artist pathname does not exist in CSV", () => {
    expect(getConsignmentData("/artist/not-found")).toEqual(undefined)
  })

  it("converts CSVtoJSON data into expected format", () => {
    expect(getConsignmentData("/artist/alex-katz")).toEqual(
      artistConsignmentFixture
    )
  })
})
